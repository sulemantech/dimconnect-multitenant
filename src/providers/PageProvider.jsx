import { ScrollArea } from "@mantine/core"
import Footer from "../layout/Footer"

export default ({ children }) => {
    return (
        <>
            <ScrollArea className="h-screen flex-grow">
                <div className="mt-2  mb-10">

                    <div className="relative px-2 ">

                        <hr className="" />

                        {children}
                    </div>


                </div>
            </ScrollArea>
            <Footer />
        </>
    )
}