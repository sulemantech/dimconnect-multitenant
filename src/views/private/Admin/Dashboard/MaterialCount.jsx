
import { Loader, Paper } from "@mantine/core"
import { useEffect, useState } from "preact/hooks"
import { getMaterialCountByDistrictId } from "../../../../api"
import { dropvalue } from "../../../../signals"

export default () => {
    const [MaterialCount, setMaterialCount] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        getMaterialCountByDistrictId(dropvalue.value)
            .then(({ data }) => {
                setLoading(false)
                setMaterialCount(data)
    
            }).catch((err) => {
                setLoading(false)
                setMaterialCount('No Data')
            })
    }, [dropvalue.value])
    return (
        <div className="flex flex-col flex-1 flex-grow">
            <div className="flex flex-col md:flex-row w-full flex-grow">
                <CountCard title="Demand Points" count={ loading ? <Loader className="mt-1" /> : MaterialCount?.data?.[0]?.demand_points || <span className="text-red-500 text-sm">No Data</span> } />
                
                <CountCard title="Feeder Cables" count={ loading ? <Loader className="mt-1" /> : MaterialCount?.data?.[0]?.feeder_cables || <span className="text-red-500 text-sm">No Data</span> } />
            </div>
            <div className="flex flex-col md:flex-row w-full flex-grow">
                
                <CountCard title="Distribution Cables" count={ loading ? <Loader className="mt-1" /> : MaterialCount?.data?.[0]?.out_distributioncables || <span className="text-red-500 text-sm">No Data</span> } />
                
                <CountCard title="Primary Cables" count={ loading ? <Loader className="mt-1" /> : MaterialCount?.data?.[0]?.primary_distribution_cables || <span className="text-red-500 text-sm">No Data</span> } />
            </div>
        </div>
    )
}

const CountCard = ({ title, count }) => (
    <Paper withBorder className="flex-[1] flex flex-grow items-center px-4 min-h-[40px] md:min-h-[50px] m-1 bg-white shadow-lg rounded-xl">
                    <p className="flex-grow font-thin text-neutral-700 text-xs md:text-sm">
                        {title}
                    </p>
                    <hr />
                    <div className="flex justify-center items-center text-sm md:text-xl font-light text-[#0E76BB]">
                        <b>
                           {count}
                        </b>
                    </div>
                </Paper>
)