import { useLayoutEffect, useState } from "preact/hooks"

export default ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(true)

    useLayoutEffect(() => {
        const queryParam = new URLSearchParams(window.location.search)
        const username = queryParam.get('username')
        const password = queryParam.get('password')
        if (username === 'hiwifi' && password === 'admin') {
            setIsAuthenticated(true)
        }
    }, [])

    return (
        <>
            {isAuthenticated ? children : <div>Not Authenticated</div>}
        </>
    )
}