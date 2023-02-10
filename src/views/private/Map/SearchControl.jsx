import { Input } from "@mantine/core"
import { IconSearch } from "@tabler/icons"

export default () => {
    return (
        <>
         <div className="absolute flex left-2 top-24 ">
            <Input placeholder="Search" color="white" icon={<IconSearch className=" text-[#0071b9] "/>} variant="unstyled" className="shadow-lg text-[#0071b9] bg-white  border-white border-solid border-2 rounded-lg"  />
        </div>
        <div>
            
        </div>
        </>
       
    )
}