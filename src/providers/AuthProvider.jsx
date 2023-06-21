
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { signal } from '@preact/signals'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconCross } from '@tabler/icons'
import { lazy } from 'preact/compat'

// import PrivateRoutes from '../routes/PrivateRoutes'
const PrivateRoutes = lazy(() => import('../routes/PrivateRoutes'))
import PublicRoutes from '../routes/PublicRoutes'
// const PublicRoutes = lazy(() => import('../routes/PublicRoutes'))

import api, { getAccessList, getCurrentUserPermissions, getRegionList, refreshAuth } from '../api'
import appConfig from '../config/appConfig'
import jwtDecode from 'jwt-decode'
import { permissible, regsionListSignal, userDataSignal } from '../signals'

const createAuthState = () => {
    const auth = signal(false)
    const setAuth = (value) => { auth.value = value }
    sessionStorage.getItem(appConfig.sessionStorageKey) ? auth.value = true : auth.value = false
    if (!auth.value) {
        return { auth, setAuth }
    }

    api.defaults.headers.common['authorization'] = `Bearer ${sessionStorage.getItem(appConfig.sessionStorageKey)}`
    const jwt = (jwtDecode(sessionStorage.getItem(appConfig.sessionStorageKey)))
    userDataSignal.value = jwt?.data
    getRegionList().then(({ data }) => {
        regsionListSignal.value = data
    }).catch(err => {
        console.log(`---->RegionList`, err)
    })
    getCurrentUserPermissions().then(({ data }) => {
        // permissible.value = permissible.value.concat(data.accessList)
        // update the activity key in permissible.value array with the activity key in the data.accessList array else keep the old value
        
        permissible.value = permissible.value.map(p => {
            const index = data.accessList.findIndex(a => a.activity === p.activity)
            if (index !== -1) {
                return data.accessList[index]
            }
            return p
        })
    }).catch(err => {
       
    })
    const timer = () => setTimeout(() => {
        if (auth.value && sessionStorage.getItem(appConfig.sessionStorageKey)) {
            refreshAuth(sessionStorage.getItem(appConfig.sessionStorageRefreshKey)).then(res => {
                sessionStorage.setItem(appConfig.sessionStorageKey, res.data.token)
                api.defaults.headers.common['authorization'] = `Bearer ${res.data.token}`
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
                        sessionStorage.removeItem(appConfig.sessionStorageRefreshKey)
                        sessionStorage.removeItem(appConfig.sessionStorageKey)
                        auth.value = false
                    }
                })
            })
        }
        timer()
    }, 1000 * 60 * 3)
    timer()
    return { auth, setAuth }
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

export default AuthProvider
