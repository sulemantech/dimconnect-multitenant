import { Loader, Menu } from "@mantine/core"
import { IconMap, IconPencil, IconPlus } from "@tabler/icons"
import { mapStyle } from "./Map"
import { closeAllModals, openModal } from "@mantine/modals"
import { useState } from "react"

import { useEffect } from "preact/hooks"
import { signal } from "@preact/signals"
import { addressPointsCRUDstate } from "./AddressPoints"
import { FabClass } from "../../../../layout"
export const editControlLoading = signal(false)

export default ({ modal = false }) => {

    const [activeOption, setActiveOption] = useState(null)

    const Options = {
        'Address Point': {
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

    const EditControlButton = <div className={`mt-2 ${FabClass}  ${activeOption ? 'bg-red-500 text-white' : 'bg-white text-[#0071b9]'}`}>

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
                                {key}
                            </Menu.Item>
                        )
                    })
                }
            </Menu.Dropdown>
        </Menu>

    )
}