import Header from "./Header"

export default ({ children }) => {
    return(
        <div className="flex flex-col flex-1 w-full">
            <Header />
            {children}
        </div>
    )
}