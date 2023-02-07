import { Menu } from "@mantine/core"
import { effect } from "@preact/signals"
import { IconStack2 } from "@tabler/icons"
import { useEffect,useState } from "preact/hooks"
import { visibility } from "./DataTiles"

export default () => {
    const [data, setData] = useState({})
    useEffect(() => {
        setData(JSON.parse(visibility.value) || {})
    }, [visibility.value])
    return (

        <Menu position="left-end" withArrow>
            <Menu.Target>
                <div id='overlaycontrol' className="right-2 hover:scale-95 border-white border-solid border-2 transition-all cursor-pointer bottom-24 mb-2 z-70 absolute p-3 rounded-full text-white bg-components shadow-lg">
                    <IconStack2 size={30} />
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                {
                    Object.keys(data).map((key, index) => {
                        return (
                            <Menu.Item key={index} onClick={() => {
                                let temp = data
                                temp[key] = {
                                    ...temp[key],
                                    visible: !temp[key].visible
                                }
                              
                                visibility.value = JSON.stringify(temp)
                            }}>{
                                data[key].visible ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
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