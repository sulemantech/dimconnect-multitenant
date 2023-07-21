import { LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "preact/hooks"
import api, { getCurrentUserPermissions } from "../../../api"
import appConfig from "../../../config/appConfig"
import { permissible } from "../../../signals"

export default ({ children }) => {


    const queryParam = new URLSearchParams(window.location.search)
    const token = queryParam.get('token')
    if (token) {

        api.defaults.headers.common['authorization'] = `Bearer ${token}`
        localStorage.setItem(appConfig.localStorageKeyWebview, token)

        getCurrentUserPermissions().then(({ data }) => {
            permissible.value = permissible.value.map(p => {
                const index = data.accessList.findIndex(a => a.activity === p.activity)
                if (index !== -1) {
                    return data.accessList[index]
                }
                return p
            })
        }).catch(err => {

        })

    }

    const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false)


    return (
        <>
            {isAuthenticated ? children : <div><LoadingOverlay visible /></div>}
        </>
    )
}