import { LoadingOverlay } from "@mantine/core"
import { useLayoutEffect, useState } from "preact/hooks"
import api from "../../../api"
import appConfig from "../../../config/appConfig"

export default ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useLayoutEffect(() => {
        const queryParam = new URLSearchParams(window.location.search)
        const token = queryParam.get('token')
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            sessionStorage.setItem(appConfig.sessionStorageKeyWebview, token)
            setIsAuthenticated(true)
        }
    }, [])

    return (
        <>
            {isAuthenticated ? children : <div><LoadingOverlay visible/></div>}
        </>
    )
}