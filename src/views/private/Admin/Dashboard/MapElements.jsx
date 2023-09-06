import { useEffect, useState } from "preact/hooks"
import { Card, Text, Divider, Loader, Progress, Title } from "@mantine/core"
import { dropvalue } from "../../../../signals"
import { getAddressPointCount } from "../../../../api"
import Icons from '../../../../layout/icons';

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
        <Card className="m-2 ml-0 mb-0" >
            <Title order={4}>
                Address Points
            </Title>
            <div className="relative text-xs flex flex-col p-2 flex-1 ">
                <div>
                    {
                        Object.entries(content)?.map(([key, item]) => {
                            return (
                                <>
                                    <div className={'flex items-center justify-center'}>
                                        <div className="flex flex-1 py-1 flex-row items-center">
                                            {/* <div className={`w-4 h-4 rounded-full mr-2`}
                                                style={{
                                                    backgroundColor: item.color
                                                }}
                                            ></div> */}
                                            <Card withBorder p={5} mr={10}>
                                                <p style={{
                                                    color: item.color
                                                }}>
                                                    <Icons.Marker  />
                                                </p>
                                            </Card>
                                            <p className="text-base md:text-xs xl:text-xs">{key}</p>
                                        </div>
                                        <div className='text-base md:text-xs xl:text-xs' style={{
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

            <br />
            <Divider />
            <br />

            <Title order={3}>Address Point By Type</Title>
            <br />

            <BarChartComp data={data}/>

        </Card>
    )
}



function logScale(value, base = 10) {
    if (value <= 0) {
      throw new Error("Value must be greater than 0 for a logarithmic scale.");
    }
    
    return Math.log(value) * base;
  }

const BarChartComp = ({ data }) => {
    if(!data) return null
  const total = Object.values(data)?.reduce((a, b) => a + b, 0)
    
    return (
        
    <div >
        {
            Object.entries(content)?.map(([key, item]) => {
                return (
                    <div className='flex items-center justify-center'>
                   <Progress value={logScale(data[item.type], 10)} max={logScale(total, 10)}
                   h={20}
                   className='flex-1 md:h-4'
                   color={item.color}
                   style={{marginBottom: '10px'}}/>
                   <Text
                   className="flex items-center md:text-xs xl:text-xs"
                   w={40}
                    ml={5}
                    pb={5}
                    color={item.color}
                   >
                    {data[item.type]}
                   </Text>
                   </div>
                )
            })
         }

    </div>
    );

}
