import { Input } from "@mantine/core"
import { IconSearch } from "@tabler/icons"

export default () => {
    return (
        <>
         <div className="absolute flex left-2 top-24 ">
            <Input placeholder="Search" color="white" icon={<IconSearch color="white"/>} variant="unstyled" className="bg-[#0071b9] border-white border-solid border-2 rounded-full"  />
        </div>
        <div>
            
        </div>
        </>
       
    )
}