import { Divider } from "@mantine/core"
import { IconMinus, IconPlus } from "@tabler/icons"
import { useMap } from "react-map-gl"

export default () => {
    const map = useMap()?.current
    return (
        <div className="right-2 hover:scale-95 border-white border-solid border-2 transition-all cursor-pointer top-24 mb-2 z-50 absolute p-1 rounded-full text-white bg-[#0071b9] shadow-lg">

            <div 
                onClick={() => map.easeTo({ zoom: map.getZoom() + 1 })}>
                <IconPlus size={24} />
            </div>
            <Divider className="my-2"/>
            <div 
                onClick={() => map.easeTo({ zoom: map.getZoom() - 1 })}>
                <IconMinus size={24} />
            </div>

        </div>
    )
}