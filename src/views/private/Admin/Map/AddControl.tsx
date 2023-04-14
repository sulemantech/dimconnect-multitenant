import { Menu } from "@mantine/core"
import { IconMap, IconPlus } from "@tabler/icons"
import { mapStyle } from "./Map"
import { closeAllModals, openModal } from "@mantine/modals"
import { useState } from "react"
import { editAddressPoint } from "./AddressPoints"

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

    // if (modal) {
    //     return (
    //         <div className=" hover:scale-95 mt-2 border-white border-solid items-center justify-center h-16 aspect-square w-16 flex border-2 transition-all cursor-pointer z-70  p-3 rounded-full shadow-lg text-[#0071b9] bg-white "
    //             onClick={() => {
    //                 openModal({
    //                     title: 'Map Style',
    //                     children: (
    //                         <div className="flex flex-col gap-2">
    //                             {
    //                                 Object.keys(Styles)?.map((key, index) => {
    //                                     return (
    //                                         <>
    //                                         <div className={`flex gap-2 items-center ${
    //                                             mapStyle.value === Styles[key] ? ' text-gray-600' : ' text-[#0071b9]'
    //                                         }`} key={index} onClick={() => {
    //                                             mapStyle.value = Styles[key]
    //                                             closeAllModals()
    //                                         }}>
    //                                                <div className="text-lg">{key}</div>
    //                                         </div>
    //                                         <hr className={'my-2'}/>
    //                                         </>
    //                                     )
    //                                 }
    //                                 )
    //                             }
    //                         </div>
    //                     )

    //                 })
    //             }}
    //         >
    //             <IconPlus size={30} />
    //         </div>

    //     )
    // }

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

                    <IconPlus size={30} />
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