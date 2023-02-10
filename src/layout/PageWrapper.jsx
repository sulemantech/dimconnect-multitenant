import Header from "./Header"

export default ({ children }) => {
    return(
        <div className="relative flex flex-col flex-1 w-full">
            <Header />
            {children}
            
        </div>
    )
}