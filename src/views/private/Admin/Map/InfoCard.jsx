import { Badge, Center, CloseButton, SegmentedControl, Tabs, Transition } from "@mantine/core"
import {  signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { JsonToTable } from "react-json-to-table"
import { dropvalue } from "../../../../layout/Header"
import { Carousel } from "@mantine/carousel"

export const infoCardVal = signal(null)



export default ({ modal = false }) => {
    const [infoCardData, setInfoCardData] = useState(null)
    const [segment , setSegment] = useState('')
    useEffect(() => {
        if (infoCardVal.value) {
            const len = infoCardVal.value.length
            // infoCardVal.value has array with multiple sourceLayer , need to get the distinct output and the length of duplicates
            const distinct = [...new Set(infoCardVal.value.map(item => item.sourceLayer))]
            const duplicates = distinct.map(item => infoCardVal.value.filter(i => i.sourceLayer === item).length)
            
            setInfoCardData(distinct.map((item, index) => {
                return {
                    sourceLayer: item,
                    properties: infoCardVal.value.filter(i => i.sourceLayer === item).map(i => i.properties),
                    count: duplicates[index]
                }
            }))
        }



    }, [infoCardVal.value])



    return (
        <>
            {

                <Transition transition="slide-right" duration={400} mounted={infoCardVal.value != null} timingFunction="ease">
                    {(styles) =>

                        <div style={styles} className="bg-white absolute left-2 bottom-2 z-50 p-2 rounded-md shadow-lg" >
                            <div className="">
                                <div className="flex items-center">


                                    {/* <div className="text-sm font-semibold text-gray-700">
                                        {infoCardData?.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase()}
                                    </div> */}
                                    <div className="flex-1" />
                                    <div className="absolute -right-3 -top-3">
                                    <CloseButton radius={'xl'} color="blue" className="bg-white" onClick={() => infoCardVal.value = null} />
                                    </div>

                                </div>
                                <div className="text-xs font-semibold text-gray-700">
                                    {/* <JsonToTable json={infoCardData?.properties} /> */}
                                    
                                    <SegmentedControl
                                        data={infoCardData?.map(item => {
                                            return {
                                                label: <Center>
                                                    {item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase()}
                                                    {item.count > 1 && <Badge color="red" size="xs" className="ml-1">{item.count}</Badge>}
                                                </Center>,
                                                value: item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase()
                                            }
                                        })}
                                        size="xs"
                                        value={segment}
                                        onChange={(value) => setSegment(value)}

                                    />

                                    {
                                        segment && <>
                                            <div className="text-sm font-semibold text-gray-700">
                                                <Carousel maw={420} mx="auto" withControls={infoCardData?.find(item => item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() === segment)?.count > 1}>
                                                {
                                                    infoCardData?.find(item => item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() === segment)?.properties?.map((item, index) => {
                                                        return (
                                                            <Carousel.Slide key={index}>
                                                                <JsonToTable json={item} />
                                                            </Carousel.Slide>
                                                        )
                                                    })
                                                }
                                                </Carousel>
                                            </div>
                                        </>
                                    }

                                </div>


                            </div>
                        </div>

                    }
                </Transition>
            }
        </>
    )
}