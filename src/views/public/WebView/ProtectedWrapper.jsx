import { LoadingOverlay } from "@mantine/core"
import { useLayoutEffect, useState } from "preact/hooks"
import api from "../../../api"

export default ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useLayoutEffect(() => {
        const queryParam = new URLSearchParams(window.location.search)
        const username = queryParam.get('username')
        const password = queryParam.get('password')
        const token = queryParam.get('token')
        if (username === 'hiwifi' && password === 'admin' && token) {
            setIsAuthenticated(true)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [])

    return (
        <>
            {isAuthenticated ? children : <div><LoadingOverlay visible/></div>}
        </>
    )
}