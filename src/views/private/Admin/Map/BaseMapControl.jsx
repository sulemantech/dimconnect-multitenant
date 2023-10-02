import { Menu } from "@mantine/core"
import { closeAllModals, openModal } from "@mantine/modals"
import { IconMap } from "@tabler/icons"
import { FabClass } from "../../../../layout"
import { mapStyle } from "../../../../signals"
import { useTranslation } from "react-i18next";


export default ({ modal = false }) => {
    const { t } = useTranslation();

    const Styles = {
        Streets: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        Dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        Light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
    }

    const Basemapbutton = <div
        className={` ${FabClass} text-[#0E76BB] bg-white `}
    ><IconMap className="scale-150" /> </div>

    if (modal) {
        return (
            <div
                onClick={() => {
                    openModal({
                        title: 'Map Style',
                        children: (
                            <div className="flex flex-col gap-2">
                                {
                                    Object.keys(Styles)?.map((key, index) => {
                                        return (
                                            <>
                                                <div className={`flex gap-2 items-center ${mapStyle.value === Styles[key] ? ' text-gray-600' : ' text-[#0E76BB]'
                                                    }`} key={index} onClick={() => {
                                                        mapStyle.value = Styles[key]
                                                        closeAllModals()
                                                    }}>
                                                    <div className="text-lg">
                                                        (key)
                                                        </div>
                                                </div>
                                                <hr className={'my-2'} />
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
                {Basemapbutton}
            </div>

        )
    }

    return (

        <Menu position="left-end" withArrow>
            <Menu.Target>
                {Basemapbutton}
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
                                {t(key)}
                            </Menu.Item>
                        )
                    })
                }
            </Menu.Dropdown>
        </Menu>

    )
}