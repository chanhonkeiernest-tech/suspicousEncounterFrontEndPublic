/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiUrl } from "../api";

const LoginContext = createContext(null);

const readResponse = async (response) => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

const errorMessage = (payload, status, fallback) => {
  if (payload && typeof payload === "object") {
    if (typeof payload.message === "string") return payload.message;
    if (typeof payload.error === "string") return payload.error;
  }
  if (typeof payload === "string" && payload) return payload;
  return `${fallback} (${status})`;
};

const getUser = (payload) => {
  if (!payload || typeof payload !== "object") return null;
  if ("user" in payload) return payload.user ?? null;
  if ("username" in payload || "id" in payload) return payload;
  return null;
};

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const restoreSession = async () => {
      try {
        const response = await fetch(apiUrl("/checksession"), {
          credentials: "include",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (response.status === 401 || response.status === 403) {
          setUser(null);
          return;
        }
        if (!response.ok) {
          const payload = await readResponse(response);
          throw new Error(errorMessage(payload, response.status, "Session check failed"));
        }

        const payload = await readResponse(response);
        setUser(getUser(payload));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setAuthError(error instanceof Error ? error.message : "Session check failed");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();
    return () => controller.abort();
  }, []);

  const login = useCallback(async ({ username, password }) => {
    setAuthError("");
    try {
      const response = await fetch(apiUrl("/login/user"), {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const payload = await readResponse(response);
      
      if (!response.ok) {
        throw new Error(errorMessage(payload, response.status, "Login failed"));
      }

      setUser(getUser(payload) ?? { username });
      return payload;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      setAuthError(message);
      throw new Error(message, { cause: error });
    }
  }, []);

  const register = useCallback(async (credentials) => {
    setAuthError("");
    try {
      const response = await fetch(apiUrl("/login/newuser"), {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const payload = await readResponse(response);
      if (!response.ok) {
        throw new Error(errorMessage(payload, response.status, "Registration failed"));
      }

      await login(credentials);
      return payload;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      setAuthError(message);
      throw new Error(message, { cause: error });
    }
  }, [login]);

  const logout = useCallback(async () => {
    setAuthError("");
    try {
      const response = await fetch(apiUrl("/login/nouser"), {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      const payload = await readResponse(response);
      if (!response.ok) {
        throw new Error(errorMessage(payload, response.status, "Logout failed"));
      }
      setUser(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Logout failed";
      setAuthError(message);
      throw new Error(message, { cause: error });
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        authError,
        login,
        register,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

export { LoginProvider, useLogin };
