import { Menu } from "@mantine/core"
import { IconMap } from "@tabler/icons"
import { mapStyle } from "./Map"

export default () => {
    return (

        <Menu position="left-end" withArrow>
            <Menu.Target>
                <div className=" hover:scale-95 border-white border-solid items-center justify-center h-16 aspect-square w-16 flex border-2 transition-all cursor-pointer z-70  p-3 rounded-full shadow-lg text-[#0071b9] bg-white ">

                    <IconMap size={30} />
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={()=>mapStyle.value = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'}>Streets</Menu.Item>
                <Menu.Item onClick={()=>mapStyle.value = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'}>Dark</Menu.Item>
                <Menu.Item onClick={()=>mapStyle.value = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'}>Light</Menu.Item>

            </Menu.Dropdown>
        </Menu>

    )
}