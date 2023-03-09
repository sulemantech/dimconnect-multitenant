import { useEffect, useState } from "preact/hooks"

export default ({children}) => {

    const queryParam = new URLSearchParams(window.location.search)
    const username = queryParam.get('username')
    const password = queryParam.get('password')

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
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