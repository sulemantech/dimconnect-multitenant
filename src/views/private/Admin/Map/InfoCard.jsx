import { Badge, CloseButton, Modal, ScrollArea, Transition } from "@mantine/core"
import { signal } from "@preact/signals"
import { useEffect, useErrorBoundary, useState } from "preact/hooks"
import { JsonToTable } from "react-json-to-table"
import { dropvalue } from "../../../../layout/Header"
import { Carousel } from "@mantine/carousel"
import { openModal } from "@mantine/modals"
import { memo } from "preact/compat"

export const infoCardVal = signal(null)



export default ({ modal = false }) => {
    const [infoCardData, setInfoCardData] = useState(null)
    const [segment, setSegment] = useState('')
    useEffect(() => {
        if (infoCardVal.value) {
            const len = infoCardVal.value.length
            // infoCardVal.value has array with multiple sourceLayer , need to get the distinct output and the length of duplicates
            const distinct = [...new Set(infoCardVal.value?.map(item => item.sourceLayer))]
            const duplicates = distinct?.map(item => infoCardVal.value.filter(i => i.sourceLayer === item).length)

            setInfoCardData(distinct?.map((item, index) => {
                return {
                    sourceLayer: item,
                    properties: infoCardVal.value.filter(i => i.sourceLayer === item).map(i => i.properties),
                    count: duplicates[index]
                }
            }))
        }



    }, [infoCardVal.value])

    const onClose = () => {
        setInfoCardData(null)
        infoCardVal.value = null
    }
    
    const [error, resetError] = useErrorBoundary((error)=>console.log(error))
    if (error) {
        return (
          <div>
            <p>{error.message}</p>
            <button onClick={resetError}>Try again</button>
          </div>
        );
      }
    const view = infoCardData && <div className="">
        <div className="flex items-center">


            {/* <div className="text-sm font-semibold text-gray-700">
            {infoCardData?.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase()}
        </div> */}
            <div className="flex-1" />
            <div className="absolute -right-3 -top-3">
                <CloseButton radius={'xl'} color="blue" className="bg-white" onClick={onClose} />
            </div>

        </div>
        <div className="text-xs flex flex-col font-semibold text-gray-700">
            {/* <JsonToTable json={infoCardData?.properties} /> */}

            {/* <div className={"flex flex-col"}>
                {infoCardData?.slice(0, 2).length > 1 &&
                    <SegmentedControl
                        data={infoCardData?.slice(0, 2)?.map(item => {
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
                    />}
                {infoCardData?.slice(2, 4).length > 1 && <SegmentedControl
                    data={infoCardData?.slice(2, 4)?.map(item => {
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
                />}
                {infoCardData?.slice(4, 6).length > 1 && <SegmentedControl
                    data={infoCardData?.slice(4, 6)?.map(item => {
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
                />}
            </div> */}
            <CustomSegmentedControl data={infoCardData} value={segment} onChange={(value) => setSegment(value)} />
            <hr />
            <h6 className="text-sm font-semibold text-sky-700 my-2">{
                segment}</h6>

            <hr />
            {
                segment && <>
                    <div className="text-sm font-semibold text-gray-700">
                        <Carousel mx="auto" withControls={infoCardData?.find(item => item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() === segment)?.count > 1}>
                            {
                                (infoCardData?.find(item => item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() === segment)?.properties || [])?.splice(0,50)?.map((item, index) => {
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

const MemoizedCarousel = memo(({item}) => (
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
    const [row, setRow] = useState(0)

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
    }
        , [segment])

    return (
        <div className={"flex flex-1 flex-col md:flex-row flex-wrap justify-center items-center text-xs"}>
            {rows?.map((row, index) => {
                return (
                    <div className="flex flex-1  flex-wrap flex-row justify-center items-center">
                        {
                            row?.map((item, index) => {
                                return(
                                    <div className={`flex flex-1 m-1 flex-col whitespace-nowrap justify-center items-center cursor-pointer ${segment === item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() ? "bg-sky-700 text-white" : "bg-gray-200 text-gray-700"} rounded-md px-2 py-1`} onClick={() => setSegment(item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase())}
                                        style={{
                                            fontSize: "0.6rem",
                                        }}
                                    >
                                        {
                                            item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase()
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