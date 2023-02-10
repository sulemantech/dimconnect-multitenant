
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import PrivateRoutes from '../routes/PrivateRoutes'
import PublicRoutes from '../routes/PublicRoutes'
import {signal} from '@preact/signals'

const createAuthState = () => {
    const auth = signal(true)
    const setAuth = (value) => {auth.value = value}
    return {auth,setAuth}
}

export const AuthState = createContext()

export const AuthProvider = () => {

    return (
        <AuthState.Provider value={createAuthState()}>
            <AppRoutes />
        </AuthState.Provider>
    )
}

const AppRoutes = () => {
    const auth = useContext(AuthState)
   
    return <>
        {
            auth.auth.value ? <PrivateRoutes auth={auth} /> : <PublicRoutes auth={auth} />
        }
    </>
}
