import { Menu } from "@mantine/core"
import { IconMap } from "@tabler/icons"
import { mapStyle } from "."

export default () => {
    return (

        <Menu position="left-end" withArrow>
            <Menu.Target>
                <div className="right-2 hover:scale-95 border-white border-solid border-2 transition-all cursor-pointer bottom-10 z-70 absolute p-3 rounded-full text-white bg-[#0071b9] ">

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