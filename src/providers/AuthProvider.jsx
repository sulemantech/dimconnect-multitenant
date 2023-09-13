
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { signal } from '@preact/signals'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconCross } from '@tabler/icons'
import { lazy } from 'preact/compat'

import PrivateRoutes from '../routes/PrivateRoutes'
// const PrivateRoutes = lazy(() => import('../routes/PrivateRoutes'))
import PublicRoutes from '../routes/PublicRoutes'
// const PublicRoutes = lazy(() => import('../routes/PublicRoutes'))

import api, { getAccessList, getCurrentUserPermissions, getRegionList, refreshAuth } from '../api'
import appConfig from '../config/appConfig'
import jwtDecode from 'jwt-decode'
import { permissible, regsionListSignal, userDataSignal, dropvalue } from '../signals'
import { Loader } from '@mantine/core'

const createAuthState = () => {
    const mounted = signal(false)
    const auth = signal(false)
    const setAuth = (value) => { auth.value = value }
    console.log(localStorage.getItem(appConfig.localStorageKey))
    localStorage.getItem(appConfig.localStorageKey) ? auth.value = true : auth.value = false
    if (!auth.value) {
        return { auth, setAuth }
    }

    api.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem(appConfig.localStorageKey)}`
    const jwt = (jwtDecode(localStorage.getItem(appConfig.localStorageKey)))
    
    
    userDataSignal.value = jwt?.data
    getRegionList().then(({ data }) => {
        regsionListSignal.value = data
        setTimeout(() => {
            const filtered = data.filter(item => (item.kreis !== null && item.bezeichnung !== 'Kreis'))
            if (dropvalue.value == 'NULL') {

                dropvalue.value = filtered[0].ags
            } else {
                const index = filtered.findIndex(a => a.ags === dropvalue.value)
                if (index !== -1) {
                    dropvalue.value = filtered[index].ags
                } else {
                    dropvalue.value = filtered[0].ags
                }
            }
            mounted.value = true
        }, 10)

    }).catch(err => {
        auth.value = false
        localStorage.removeItem(appConfig.localStorageKey)
    })
    getCurrentUserPermissions().then(({ data }) => {
        console.table(data.accessList)


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
        if (auth.value && localStorage.getItem(appConfig.localStorageKey)) {
            refreshAuth(localStorage.getItem(appConfig.localStorageRefreshKey)).then(res => {
                localStorage.setItem(appConfig.localStorageKey, res.data.token)
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
                        localStorage.removeItem(appConfig.localStorageRefreshKey)
                        localStorage.removeItem(appConfig.localStorageKey)
                        auth.value = false
                    }
                })
            })
        }
        timer()
    }, 1000 * 60 * 25)
    timer()
    return { auth, setAuth, mounted }
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
            auth.auth.value ? <> {auth.mounted.value ? <PrivateRoutes auth={auth} /> : <NoRegionList />} </> : <PublicRoutes auth={auth} />
        }
    </>
}

export default AuthProvider

const NoRegionList = () => {
    return <div className="flex justify-center items-center h-screen">
        <div className="text-center">
            <Loader variant='dots' />
        </div>
    </div>
}