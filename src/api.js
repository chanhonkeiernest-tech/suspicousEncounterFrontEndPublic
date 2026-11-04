const apiBaseUrl = import.meta.env.VITE_API_URL;

export const apiUrl = (path) => {
  if (!apiBaseUrl) {
    throw new Error("Set VITE_API_URL in the frontend environment.");
  }

  return new URL(path, apiBaseUrl).toString();
};
