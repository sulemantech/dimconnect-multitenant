import { LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "preact/hooks"
import api from "../../../api"
import appConfig from "../../../config/appConfig"

export default ({children}) => {

    
    
    const queryParam = new URLSearchParams(window.location.search)
    const token = queryParam.get('token')
    if (token) {
        
        api.defaults.headers.common['authorization'] = `Bearer ${token}`
        sessionStorage.setItem(appConfig.sessionStorageKeyWebview, token)
    
    }
    
    const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false)
  

    return (
        <>
            {isAuthenticated ? children : <div><LoadingOverlay visible/></div>}
        </>
    )
}