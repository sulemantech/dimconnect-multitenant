import { Loader, Menu } from "@mantine/core"
import { IconMap, IconPencil, IconPlus } from "@tabler/icons"
import { mapStyle } from "./Map"
import { closeAllModals, openModal } from "@mantine/modals"
import { useState } from "react"
import { editAddressPoint } from "./AddressPoints"
import { useEffect } from "preact/hooks"
import { signal } from "@preact/signals"
export const throwEditControlAntiMethods = signal(0)
export const editControlLoading = signal(false)
export default ({ modal = false }) => {

    const [activeOption, setActiveOption] = useState(null)

    const Options = {
        'Address Point': {
            "method" : () => {
                editAddressPoint.value = true
            },
            "antiMethod" : () => {
                editAddressPoint.value = false
            }
        },
        
    }

    useEffect(() => {
        throwEditControlAntiMethods.subscribe(() => {
            setActiveOption(null)
            Object.keys(Options)?.map((key, index) => {
                Options[key].antiMethod()
            })
        })
    }, [])


    return (

        <Menu position="left-end" withArrow onOpen={() => {
            if (activeOption) {
                setActiveOption(null)
                // call all anti methods
                Object.keys(Options)?.map((key, index) => {
                    Options[key].antiMethod()
                })
            }
        }}>
            <Menu.Target
            
            >
                <div className={`mt-2 hover:scale-95 border-white border-solid items-center justify-center h-16 aspect-square w-16 flex border-2 transition-all cursor-pointer z-70  p-3 rounded-full shadow-lg  ${activeOption ? 'bg-red-500 text-white' : 'bg-white text-[#0071b9]'}`}>

                    {editControlLoading.value ? <Loader color="white"/> : <IconPencil size={30} />}
                </div>
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