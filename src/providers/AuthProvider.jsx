
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import PrivateRoutes from '../routes/PrivateRoutes'
import PublicRoutes from '../routes/PublicRoutes'
import {signal} from '@preact/signals'
import api, { refreshAuth } from '../api'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconCross } from '@tabler/icons'

const createAuthState = () => {
    const auth = signal(false)
    sessionStorage.getItem('hf8f8fj3dj193jf913fj91f91jf9') ? auth.value = true : auth.value = false
    api.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('hf8f8fj3dj193jf913fj91f91jf9')}`
    const setAuth = (value) => {auth.value = value}
    const timer = () => setTimeout(() => {
        if(auth.value && sessionStorage.getItem('hf8f8fj3dj193jf913fj91f91jf9')) {
            refreshAuth(sessionStorage.getItem('hf8f8fj3dj193jf913fj91f91jf9_R')).then(res => {
               
                sessionStorage.setItem('hf8f8fj3dj193jf913fj91f91jf9', res.data.token)
                api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                showNotification({
                    title: 'Session refreshed',
                    message: 'Your session has been refreshed',
                    color: 'green',
                    icon: <IconCheck size={24} />,
                    timeout: 3000,
                })
            }).catch(err => {
                showNotification({
                    title: 'Session expired',
                    message: 'Please login again',
                    color: 'red',
                    icon: <IconCross size={24} />,
                    timeout: 5000,
                    onClose: () => {
                        sessionStorage.removeItem('hf8f8fj3dj193jf913fj91f91jf9_R')
                        sessionStorage.removeItem('hf8f8fj3dj193jf913fj91f91jf9')
                        auth.value = false
                    }
                })
            })
        }
        timer()
    }, 1000 * 60 * 30)
    timer()
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
