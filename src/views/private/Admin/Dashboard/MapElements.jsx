import { useEffect, useState } from "preact/hooks"
import { Card, CardSection, Loader } from "@mantine/core"

import { dropvalue } from "../../../../signals"
import { getAddressPointCount } from "../../../../api"

const content = {
    'ja (Anschluss prüfen)': {
        color: 'rgb(255, 140, 42)',
        type: 1
    },
    'ja': {
        color: 'rgb(29, 155, 216)',
        type: 2
    },
    'nein (Anschluss geprüft)': {
        color: 'rgb(237, 82, 73)',
        type: 3
    },
    'nein': {
        color: 'rgb(0, 0, 0)',
        type: 4
    },
    'inexistente Adresse': {
        color: 'rgb(167, 38, 231)',
        type: 5
    },
}

export default () => {
    const [data, setData] = useState(null) // [{"json_object_agg":{"1":443,"2":29946,"3":172,"4":175,"5":94}}]
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dropvalue.subscribe((value) => {
            setLoading(true)
            getAddressPointCount(value).then((res) => {
                setData(res?.data?.[0]?.json_object_agg)
                setLoading(false)
            }).catch((err) => {
                setData(null)
                setLoading(false)
            })
        })
    }, [])

    return (
        <Card
            radius={'lg'}
            
        >
            <CardSection className="border-b-4 border-neutral-200 border-solid p-4">

            <div className="text-black text-2xl font-bold justify-start flex" >

                Address Points

            </div>
            </CardSection>
            <CardSection className="p-4">

            <div className="relative text-xs flex flex-col p-2 flex-1 ">
                <div>
                    {
                        Object.entries(content)?.map(([key, item]) => {
                            return (
                                <>
                                    <div className={'flex items-center justify-center'}>
                                        <div className="flex flex-1 py-1 flex-row items-center">
                                            <div className={`w-4 h-4 rounded-full mr-2`}
                                                style={{
                                                    backgroundColor: item.color
                                                }}
                                                ></div>
                                            <p className="text-base">{key}</p>


                                        </div>
                                        <div style={{
                                            color: item.color
                                        }}
                                        >
                                            {
                                                loading ? <Loader size={'xs'} /> :
                                                data && data[item.type] ? data[item.type] : 0
                                            }
                                        </div>
                                    </div>
                                    <hr className="last:hidden" />
                                </>
                            )
                        })
                    }
                </div>
            </div>
                        </CardSection>
        </Card>
    )
}