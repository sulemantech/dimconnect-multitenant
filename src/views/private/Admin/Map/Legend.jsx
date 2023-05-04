import { signal } from "@preact/signals"
import { addressPointsStatusVisibility } from "./AddressPoints"
import { Accordion } from "@mantine/core"
import { DistrictPhaseLayersVisibility, DistrictPhaseVisibility } from "./DistrictPhase"
import { useDidUpdate } from "@mantine/hooks"
import { useState } from "preact/hooks"
// ja (Anschluss prüfen)	                 rgb(255, 140, 42);
// ja	                                                 rgb(29, 155, 216);
// nein (Anschluss geprüft)	         rgb(237, 82, 73);
// nein	                                                 rgb(0, 0, 0);
// inexistente Adresse	                 rgb(167, 38, 231);
// Schon bearbeitet	                         rgb(112, 173, 70);
export const legendContent = signal({
    'ja (Anschluss prüfen)': {
        color: 'rgb(255, 140, 42)',
        type: 'point',
        code: 1
    },
    'ja': {
        color: 'rgb(29, 155, 216)',
        type: 'point',
        code: 2
    },
    'nein (Anschluss geprüft)': {
        color: 'rgb(237, 82, 73)',
        type: 'point',
        code: 3
    },
    'nein': {
        color: 'rgb(0, 0, 0)',
        type: 'point',
        code: 4
    },
    'inexistente Adresse': {
        color: 'rgb(167, 38, 231)',
        type: 'point',
        code: 5
    },
})

export const netzplanninglegend = signal({
    "Status": {
        "Finalisierung Netzdetailplanung": {
            color: "orange",
            type: 'point',
            code: 1,
            key : "Finalisierung Netzdetailplanung durch TRC"
        },
        'noch keine Phase begonnen': {
            color: '#808080',
            type: 'point',
            code: 2,
            key : "Noch nicht begonnen"
        },
        'in Bearbeitung, s. Phasen': {
            color: '#ffeb9c',
            type: 'point',
            code: 3,
            key : "NPV: Netzplanaufbereitung durch TRC"
        },
        'alle Phasen abgeschlossen': {
            color: '#c6efce',
            type: 'point',
            code: 4,
            key : "Abgeschlossen"
        },
    },
    // "Bearbeitungsphasen": {
    //     'Onboarding': {
    //         symbol: '1',
    //     },
    //     'APV: Validierung durch TRC': {
    //         symbol: '2',
    //     },
    //     'APV: Validierung durch Kommune': {
    //         symbol: '3',
    //     },
    //     'NPV: Netzplanaufbereitung durch TRC': {
    //         symbol: '4',
    //     },
    //     'NPV: Netzplanaufbereitung durch Kommune': {
    //         symbol: '5',
    //     },
    //     'Finalisierung Netzdetailplanung durch TRC': {
    //         symbol: '6',
    //     },
    //     'Finalisierung Netzdetailplanung durch Kommune': {
    //         symbol: '7',
    //     },
    // }
})

export default ({noAddressPoint=false,noStatus=false}) => {
    const [value, setValue] = useState('Address Points')
    const [collapsed, setCollapsed] = useState(!noAddressPoint)
    useDidUpdate(() => {
        setTimeout(() => {
        if(value == null) setCollapsed(true)
        }, 500)
    }, [value])
    useDidUpdate(() => {
        if(collapsed == false) setValue('')
    }, [collapsed])

    if(collapsed) return <div className="absolute -left-8 hover:scale-95 transition-all cursor-pointer bottom-12 justify-center rotate-90 font-bold text-lg tracking-wide text-white bg-[#0071b9] shadow-2xl z-40 rounded-md p-2 " onClick={() => setCollapsed(false)}>
        Legend
    </div>

    return (
        <div className="relative text-xs flex flex-col p-2 shadow-md rounded-md mt-2 bg-white">
            <h6 className="mb-1"><b>Legend</b></h6>
            <hr className="mb-2" />
            <Accordion defaultValue={window.innerWidth>768?'Address Points':''} className="text-xs" onChange={(e) => {
                if (e !== 'Status') {
                    DistrictPhaseVisibility.value = false
                } else {
                    DistrictPhaseVisibility.value = true
                }
                setValue(e)
            }}>
              {!noAddressPoint &&  <Accordion.Item value="Address Points" className="text-xs" >
                    <Accordion.Control className="text-xs last:p-0"  value={"Address Points"}>Address Points</Accordion.Control>
                    <Accordion.Panel>
                        <div>
                            {
                                Object.entries(legendContent.value)?.map(([key, item]) => {
                                    return <div className="flex py-1 flex-row items-center cursor-pointer hover:bg-neutral-100"
                                        onClick={() => {
                                            addressPointsStatusVisibility.value = {
                                                ...addressPointsStatusVisibility.value,
                                                [item.code]: !addressPointsStatusVisibility.value[item.code]
                                            }
                                        }}
                                    >
                                        <div className={`w-4 h-4 rounded-full mr-2`}
                                            style={{
                                                backgroundColor: addressPointsStatusVisibility.value[item.code] ? item.color : 'silver',

                                            }}
                                        ></div>
                                        <div className="flex-1" />
                                        <p
                                            className={`text-xs ${addressPointsStatusVisibility.value[item.code] ? 'text-gray-900' : 'text-gray-400'}`}
                                        >{key}</p>



                                    </div>


                                })
                            }
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>}
               {!noStatus && <Accordion.Item value="Status" className="text-xs">
                    <Accordion.Control value={'Status'} className="text-xs last:p-0">Status</Accordion.Control>
                    <Accordion.Panel>
                        <div>
                            {
                                Object.entries(netzplanninglegend.value)?.map(([key, item]) => {
                                    return <>
                                        <p className="text-xs font-bold my-2">{key}</p>

                                        {
                                            Object.entries(item)?.map(([key, item]) => {
                                                return <div className="flex py-1 flex-row items-center cursor-pointer hover:bg-neutral-100"
                                                    onClick={() => {
                                                        DistrictPhaseLayersVisibility.value = {
                                                            ...DistrictPhaseLayersVisibility.value,
                                                            [item.key]: !DistrictPhaseLayersVisibility.value[item.key]
                                                        }
                                                       
                                                    }}
                                                >
                                                    <div className={`w-4 h-4 rounded-full mr-2`}
                                                        style={{
                                                            backgroundColor: DistrictPhaseLayersVisibility.value[item.key] ? item.color : 'silver',
                                                            color: 'blue'
                                                        }}
                                                    >
                                                        {item.symbol}
                                                    </div>
                                                    <div className="flex-1" />
                                                    <p
                                                        className={`text-xs ${DistrictPhaseLayersVisibility.value[item.key] ? 'text-gray-900' : 'text-gray-400'}`}
                                                    >{key}</p>



                                                </div>
                                            })
                                        }
                                    </>
                                })
                            }
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>}
            </Accordion>
        </div>
    )
}