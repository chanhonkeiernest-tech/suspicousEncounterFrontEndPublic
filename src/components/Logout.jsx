import { useLogin } from '../context/LoginContext'

const Logout = async () => {
const { logout, user } = useLogin()
    const action = await logout()

    if(user===null)return <Navigate to="/" replace />

    
     return <Navigate to="/" replace />
}
export default  Logout ;