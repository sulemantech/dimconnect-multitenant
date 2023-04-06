import { CloseButton, Modal, ScrollArea, Transition } from "@mantine/core"
import { signal } from "@preact/signals"
import { useEffect, useErrorBoundary, useMemo, useState } from "preact/hooks"
import { JsonToTable } from "react-json-to-table"
import { dropvalue } from "../../../../layout/Header"
import { Carousel } from "@mantine/carousel"
import { memo } from "preact/compat"

export const infoCardVal = signal(null)



export default ({ modal = false }) => {
    const [infoCardData, setInfoCardData] = useState(null)
    const [segment, setSegment] = useState('')
    useEffect(() => {
        infoCardVal.subscribe((val) => {
            if (!val) return
            const len = val?.length

            const distinct = [...new Set(val?.map(item => item.sourceLayer))]
            const duplicates = distinct?.map(item => val.filter(i => i.sourceLayer === item).length)
            if(distinct?.length === 1){
                setSegment(distinct[0]?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase())
            }
            setInfoCardData(distinct?.map((item, index) => {
                return {
                    sourceLayer: item,
                    properties: val.filter(i => i.sourceLayer === item).map(i => i.properties),
                    count: duplicates[index]
                }
            }))
        })

    }, [])

    const onClose = () => {
        setInfoCardData(null)
        infoCardVal.value = null
    }

    
    const view = useMemo(() => {
        return (
            infoCardData && <div className="">
                <div className="flex items-center">
                    <div className="flex-1" />
                    <div className="absolute -right-3 -top-3">
                        <CloseButton radius={'xl'} color="blue" className="bg-white" onClick={onClose} />
                    </div>

                </div>
                <div className="text-xs flex flex-col font-semibold text-gray-700">

                    <CustomSegmentedControl data={infoCardData} value={segment} onChange={setSegment} />
                    <hr />
                    <h6 className="text-sm font-semibold text-sky-700 my-2">{
                        segment}</h6>

                    <hr />
                    {
                        segment && <>
                            <div className="text-sm font-semibold text-gray-700">
                                <Carousel mx="auto" withControls={infoCardData?.find(item => item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() === segment)?.count > 1}>
                                    {
                                        (infoCardData?.find(item => item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() === segment)?.properties || []).slice(0,20)?.flatMap((item, index) => {
                                            return (

                                                <MemoizedCarousel key={index} item={item} />

                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                        </>
                    }


                </div>


            </div>
        )
    }, [infoCardData, segment])


    return (
        <>
            {!modal ?

                <Transition transition="slide-right" duration={400} mounted={infoCardVal.value != null} timingFunction="ease">
                    {(styles) =>
                        <div style={styles} className="bg-white absolute left-2 bottom-2 z-50 p-2 rounded-md shadow-lg max-w-xl" >
                            {view}
                        </div>
                    }
                </Transition>
                :
                <Modal opened={infoCardVal.value != null} withCloseButton={false} title="Info Card" size={'xl'}>
                    <div className="w-full h-full"
                        style={{
                            maxWidth: '80vw',
                        }}
                    >
                        {view}
                    </div>
                </Modal>
            }
        </>
    )
}

const MemoizedCarousel = memo(({ item }) => (
    <Carousel.Slide>
        <ScrollArea className="h-96">
            <JsonToTable json={item} />
        </ScrollArea>
    </Carousel.Slide>
))

const CustomSegmentedControl = ({ data, value, onChange }) => {

    const MAXITEMSPERROW = 2

    const [segment, setSegment] = useState(value)
    const [rows, setRows] = useState([])


    useEffect(() => {
        const rows = []
        let row = []
        data?.forEach((item, index) => {
            if (index % MAXITEMSPERROW === 0 && index !== 0) {
                rows.push(row)
                row = []
            }
            row.push(item)
        })
        rows.push(row)

        setRows(rows)

    }, [data])

    useEffect(() => {
        onChange(segment)

    }, [segment])

    return (
        <div className={"flex flex-1 flex-col md:flex-row flex-wrap justify-center items-center text-xs"}>
            {rows?.map((row, index) => {
                return (
                    <div className="flex flex-1 w-full flex-wrap flex-row justify-center items-center">
                        {
                            row?.map((item, index) => {
                                return (
                                    <div className={`relative flex flex-1 m-1 flex-col whitespace-nowrap justify-center items-center cursor-pointer ${segment === item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() ? "bg-sky-700 text-white" : "bg-gray-200 text-gray-700"} rounded-md px-2 py-1`}
                                        onClick={() => setSegment(item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase())}
                                        style={{
                                            fontSize: "0.6rem",
                                        }}
                                    >
                                        {
                                            item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase()
                                        }
                                        {
                                            item.count > 1 && <span style={{ fontSize: '0.5rem' }} className="bg-sky-500 aspect-square rounded-full absolute -right-2 -top-2 w-4 h-4 flex items-center justify-center text-white">{item.count}</span>
                                        }
                                    </div>

                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
}
