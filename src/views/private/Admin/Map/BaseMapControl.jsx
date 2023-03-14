import { Menu } from "@mantine/core"
import { IconMap } from "@tabler/icons"
import { mapStyle } from "./Map"
import { closeAllModals, openModal } from "@mantine/modals"

export default ({ modal = false }) => {

    const Styles = {
        Streets: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        Dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        Light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
    }

    if (modal) {
        return (
            <div className=" hover:scale-95 border-white border-solid items-center justify-center h-16 aspect-square w-16 flex border-2 transition-all cursor-pointer z-70  p-3 rounded-full shadow-lg text-[#0071b9] bg-white "
                onClick={() => {
                    openModal({
                        title: 'Map Style',
                        children: (
                            <div className="flex flex-col gap-2">
                                {
                                    Object.keys(Styles)?.map((key, index) => {
                                        return (
                                            <>
                                            <div className={`flex gap-2 items-center ${
                                                mapStyle.value === Styles[key] ? ' text-gray-600' : ' text-[#0071b9]'
                                            }`} key={index} onClick={() => {
                                                mapStyle.value = Styles[key]
                                                closeAllModals()
                                            }}>
                                                   <div className="text-lg">{key}</div>
                                            </div>
                                            <hr className={'my-2'}/>
                                            </>
                                        )
                                    }
                                    )
                                }
                            </div>
                        )

                    })
                }}
            >
                <IconMap size={30} />
            </div>

        )
    }

    return (

        <Menu position="left-end" withArrow>
            <Menu.Target>
                <div className=" hover:scale-95 border-white border-solid items-center justify-center h-16 aspect-square w-16 flex border-2 transition-all cursor-pointer z-70  p-3 rounded-full shadow-lg text-[#0071b9] bg-white ">

                    <IconMap size={30} />
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                {
                    Object.keys(Styles)?.map((key, index) => {
                        return (
                            <Menu.Item key={index}
                            color={
                                mapStyle.value === Styles[key] ? 'gray' : 'blue'
                            }
                             onClick={() => {
                                mapStyle.value = Styles[key]
                            }}>
                                {key}
                            </Menu.Item>
                        )
                    })
                }
            </Menu.Dropdown>
        </Menu>

    )
}