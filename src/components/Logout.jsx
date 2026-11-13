import { useLogin } from '../context/LoginContext'

export const Logout = async () => {
const { logout, user } = useLogin()
    const action = await logout({ username: String(username), password: String(password) })

    if(user===null)return <Navigate to="/" replace />

     return <Navigate to="/" replace />
}