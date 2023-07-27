import Header from "./Header"

export default ({ children }) => {
    return (
        <div className="relative flex flex-col bg-slate-50 flex-1 w-full">
            <Header />
            {children}

        </div>
    )
}