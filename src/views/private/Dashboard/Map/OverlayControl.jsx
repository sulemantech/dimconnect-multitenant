import { Menu } from "@mantine/core"
import { effect } from "@preact/signals"
import { IconStack2 } from "@tabler/icons"
import { useEffect } from "preact/hooks"
import { visibility } from "./DataTiles"

export default () => {
    useEffect(() => {
        console.log(visibility.value.data)
    }, [visibility.value])
    return (

        <Menu position="left-end" withArrow>
            <Menu.Target>
                <div id='overlaycontrol' className="right-2 hover:scale-95 border-white border-solid border-2 transition-all cursor-pointer bottom-24 mb-2 z-70 absolute p-3 rounded-full text-white bg-[#0071b9] shadow-lg">
                    <IconStack2 size={30} />
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                {
                    Object.keys(visibility.value.data).map((key, index) => {
                        return (
                            <Menu.Item key={index} onClick={() => {
                                let temp = visibility.value.data
                                temp[key] = !temp[key]
                              
                                visibility.value.data = temp
                            }}>{
                                visibility.value.data[key] ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                            } {key
                                .split('_')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')
                                
                                }</Menu.Item>
                        )
                    })
                }
            </Menu.Dropdown>
        </Menu>

    )
}