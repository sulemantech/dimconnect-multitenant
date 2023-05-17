import { Box, CloseButton, Loader, LoadingOverlay, Modal, ScrollArea, Table, Transition } from "@mantine/core"
import { signal } from "@preact/signals"
import { useCallback, useEffect, useErrorBoundary, useMemo, useState } from "preact/hooks"
import { JsonToTable } from "react-json-to-table"
import { dropvalue } from "../../../../layout/Header"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { formatCamelCaseToTitleCase } from "../../../../utils/convertor"
import { getAddressPointDetails } from "../../../../api"

export const infoCardVal = signal(null)




export default ({ modal = false, presegment = null }) => {
    return infoCardVal.value !=null ?
    <>
        {!modal ?

            <Transition transition="slide-right" duration={400} mounted={infoCardVal.value != null} timingFunction="ease">
                {(styles) =>
                    <div style={styles} className="bg-white absolute left-2 bottom-2 z-50 p-2 rounded-md shadow-lg max-w-xl" >
                        <Component modal={modal} presegment={presegment} />
                    </div>
                }
            </Transition>
            :
            <>

                <Modal lockScroll={false} className="overflow-x-hidden" padding={'xs'} opened={infoCardVal.value != null} onClose={()=>{
                    infoCardVal.value = null
                }} title="Info Card" size={'xl'}>
                    <div className="w-full h-full">
                        <Component modal={modal} presegment={presegment} />
                    </div>
                </Modal>
            </>
        }

    </>
    :
    <LoadingOverlay visible={infoCardVal.value != null} />
    
}

const Component = ({ modal = false, presegment = null }) => {
    const [infoCardData, setInfoCardData] = useState(null)
    const [segment, setSegment] = useState(presegment)

    useEffect(() => {
        infoCardVal.subscribe(async (val) => {
            if (!val) {
                setSegment(null)
                return
            }
            const len = val?.length
            // val = val.filter((feature) => feature.sourceLayer !== undefined)

            const distinct = [...new Set(val?.map(item => item.sourceLayer))].filter(item => item !== undefined)
            // if (segment == null && distinct?.length === 1) {
            //     setSegment(distinct[0]?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase())
            // }



            setSegment(distinct[0]?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase())


            let filtered = val.filter((feature) => feature.layer.id === 'addressPoints')

            if (filtered.length !== 0) {
                distinct.push('Address Point')

                const id = filtered[0].properties.id
                const { data } = await getAddressPointDetails(dropvalue.value, id)
                    .catch(err => {
                        filtered = undefined
                    })
                if (data) {
                    setSegment('ADDRESS POINT')
                    val.push({
                        sourceLayer: 'Address Point',
                        properties: data
                    })
                }

            }

            const duplicates = distinct?.map(item => val.filter(i => i.sourceLayer === item).length)


            setInfoCardData(distinct?.filter(item => item !== undefined)
                .map((item, index) => {

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

    const renameKeys = {
        "id": "AGG ID",
        "id_drop": "Main Cable 1 ID",
        "id_feeder": "Main Cable 2 ID",
        "agg_id": "AGG ID",

    }

    const blockedKeys = ['fid_1', 'di_drop', 'di_feeder', 'p2p_m_rev', 'p2p_adop', 'id', 'fid']

    return infoCardData && <div className="mt-2" id={'info-card'}>
        <div className="flex items-center">
            <div className="flex-1" />
            {!modal && <div className="absolute -right-3 -top-3">
                <CloseButton radius={'xl'} color="blue" className="bg-white" onClick={onClose} />
            </div>}

        </div>
        <div className="text-xs flex flex-col font-semibold text-gray-700">

            <CustomSegmentedControl data={infoCardData} value={segment} onChange={setSegment} />
            <hr />
            <h6 className="text-sm font-semibold text-sky-700 my-2">{
                segment}</h6>

            <hr />
            {
                segment ? <>
                    <div className="text-sm font-semibold text-gray-700">
                        <Carousel showThumbs={false} className="relative overflow-hidden" selectedItem={0} showIndicators={false} align={'center'} skipSnaps controlsOffset={'xs'} slideSize={'100%'} withControls={infoCardData?.find(item => item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() === segment)?.count > 1}>
                            {
                                (infoCardData?.find(item => item.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_", "")?.replace(/_/g, " ")?.toUpperCase() === segment)?.properties || [])

                                    .slice(0, 20)?.flatMap((item, index) => {
                                        item = Object.keys(item).filter(key => item[key] !== null)
                                            .filter(key => key.length < 20)
                                            .filter(key => !blockedKeys.includes(key))
                                            .reduce((obj, key) => {
                                                if (renameKeys.hasOwnProperty(key)) {
                                                    obj[renameKeys[key]] = item[key];
                                                } else {
                                                    obj[formatCamelCaseToTitleCase(key)] = item[key];
                                                }
                                                return obj;
                                            }, {});
                                        return (

                                            <MemoizedCarousel key={index} item={item} />

                                        )
                                    })
                            }
                        </Carousel>
                    </div>
                </>
                    :
                    <div className="flex items-center justify-center">
                        <Loader />
                    </div>
            }

        </div>

    </div>


}

const MemoizedCarousel = ({ item }) => (
    <Box className="overflow-hidden">

        {/* <JsonToTable json={item} /> */}
        <Table striped withBorder className="relative max-w-[100%]">
            <tbody className="text-[10px]">
                {
                    Object.keys(item).map((key, index) => (
                        <tr key={index} >
                            <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">{key}</td>
                            <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">{item[key]}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>

    </Box>
)

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

        onChange(null)
        setTimeout(() => {
            onChange(segment)

        }, 100)
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
                                            item.count > 1 && <span style={{ fontSize: '0.5rem' }} className="bg-sky-500 aspect-square rounded-full absolute -right-2 -top-2 w-4 h-4 flex items-center justify-center text-white">{item.count > 20 ? 20 : item.count}</span>
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
