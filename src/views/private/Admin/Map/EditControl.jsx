import { Loader, Menu } from "@mantine/core"
import { IconAddressBook, IconPencil } from "@tabler/icons"
import { useEffect } from "preact/hooks"
import { useState } from "react"
import { useTranslation } from "react-i18next";

import { FabClass } from "../../../../layout"
import { addressPointsCRUDstate, editControlLoading } from "../../../../signals"

export default ({ modal = false }) => {
    const { t } = useTranslation();

    const [activeOption, setActiveOption] = useState(null)

    const Options = {
        'Address Point': {
            icon: <IconAddressBook className="scale-110 text-[#0E76BB] " />,
            "method": () => {
                addressPointsCRUDstate.value = 'edit'
            },
            "antiMethod": () => {
                addressPointsCRUDstate.value = ''
            }
        },

    }

    useEffect(() => {
        addressPointsCRUDstate.subscribe(() => {
            if (addressPointsCRUDstate.value === 'edit') {
                setActiveOption('Address Point')
            } else {
                setActiveOption(null)
            }
        })
    }, [])

    const EditControlButton = <div className={`mt-2 ${FabClass}  ${activeOption ? 'bg-red-500 text-white' : 'bg-white text-[#0E76BB]'}`}>

        {editControlLoading.value ? <Loader color="white" className="scale-150" /> : <IconPencil className="scale-150" />}
    </div>

    if (activeOption) {
        return <div
            onClick={() => {
                setActiveOption(null)
                // call all anti methods
                Object.keys(Options)?.map((key, index) => {
                    Options[key].antiMethod()
                })
            }}
        >
            {EditControlButton}
        </div>
    }


    return (

        <Menu position="left-end" withArrow >
            <Menu.Target

            >
                {EditControlButton}
            </Menu.Target>
            <Menu.Dropdown>
                {
                    Object.keys(Options)?.map((key, index) => {
                        return (
                            <Menu.Item key={index}
                                onClick={() => {
                                    setActiveOption(key)
                                    Options[key].method()
                                }}
                            >
                                <div className="flex items-center gap-2 cursor-pointer">
                                    {Options[key].icon}
                                    <b className=" text-[#0E76BB] tracking-wide font-bold">
                                        {t(key)}
                                    </b>
                                </div>

                            </Menu.Item>
                        )
                    })
                }
            </Menu.Dropdown>
        </Menu>

    )
}