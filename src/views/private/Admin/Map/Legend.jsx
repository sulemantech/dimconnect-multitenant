
import { Accordion } from "@mantine/core"
import { useDidUpdate } from "@mantine/hooks"
import { useState } from "preact/hooks"

import { DistrictPhaseLayersVisibility, DistrictPhaseVisibility, addressPointsStatusVisibility, legendContent, netzplanninglegend } from "../../../../signals"


export default ({ noAddressPoint = false, noStatus = false }) => {
    const [value, setValue] = useState('Address Points')
    const [collapsed, setCollapsed] = useState(!noAddressPoint)
    useDidUpdate(() => {
        setTimeout(() => {
            if (value == null) setCollapsed(true)
        }, 500)
    }, [value])
    useDidUpdate(() => {
        if (collapsed == false) setValue('')
    }, [collapsed])

    if (collapsed) return <div className="absolute -left-8 hover:scale-95 transition-all cursor-pointer bottom-24 justify-center rotate-90 font-bold text-lg tracking-wide text-white bg-[#0092c3] shadow-2xl z-40 rounded-md p-2 " onClick={() => setCollapsed(false)}>
        Legend
    </div>

    return (
        <div className="relative text-xs flex flex-col p-2 shadow-md rounded-md mt-2 bg-white">
            <h6 className="mb-1"><b>Legend</b></h6>
            <hr className="mb-2" />
            <Accordion defaultValue={window.innerWidth > 768 ? 'Address Points' : ''} className="text-xs" onChange={(e) => {
                const params = new URLSearchParams(window.location.search)
                if (!params.get('statusPage')) {
                    if (e !== 'Status') {

                        DistrictPhaseVisibility.value = false
                    } else {
                        DistrictPhaseVisibility.value = true
                    }
                    setValue(e)
                }
            }}>
                <NetzplanningLegend />
                {!noAddressPoint && <Accordion.Item value="Address Points" className="text-xs" >
                    <Accordion.Control className="text-xs last:p-0" value={"Address Points"}>Address Points</Accordion.Control>
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

const NetzplanningLegend = () => {
    return <></>

}