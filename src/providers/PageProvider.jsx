import { ScrollArea } from "@mantine/core"

export default ({ children }) => {
    return (
        <div className="mt-24 px-2 max-h-screen h-screen">
            <hr className="pt-2" />
           
            {children}
           
        </div>
    )
}