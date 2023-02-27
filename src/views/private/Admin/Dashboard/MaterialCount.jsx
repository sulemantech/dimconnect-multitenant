
import { Loader } from "@mantine/core"
import { useEffect, useState } from "preact/hooks"
import { getMaterialCountByDistrictId } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"

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
        <div className="flex flex-1">
            <div className="flex flex-col md:flex-row w-full">
                <div className="flex-[1] min-h-[100px] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
                    <p className="flex-grow font-thin text-neutral-700 text-lg">
                        Demand Points
                    </p>
                    <hr />
                    <div className="flex justify-center items-center text-4xl font-light text-[#0071b9]">
                        <b>
                            {loading ? <Loader className="mt-1" /> :
                                MaterialCount?.data?.[0]?.demand_points || <span className="text-red-500 text-sm">No Data</span>}
                        </b>
                    </div>
                </div>
                <div className="flex-[1] min-h-[100px] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
                    <p className="flex-grow font-thin text-neutral-700 text-lg">
                        Feeder Cables
                    </p>
                    <hr />
                    <div className="flex justify-center items-center text-4xl font-light text-[#0071b9]">
                        <b>
                            {loading ? <Loader className="mt-1" /> :
                                MaterialCount?.data?.[0]?.feeder_cables || <span className="text-red-500 text-sm">No Data</span>}
                        </b>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full">
                <div className="flex-[1] min-h-[100px] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
                    <p className="flex-grow font-thin text-neutral-700 text-lg">
                        Distribution Cables
                    </p>
                    <hr />
                    <div className="flex justify-center items-center text-4xl font-light text-[#0071b9]">
                        <b>
                            {loading ? <Loader className="mt-1" /> :
                                MaterialCount?.data?.[0]?.out_distributioncables || <span className="text-red-500 text-sm">No Data</span>}
                        </b>
                    </div>
                </div>
                <div className="flex-[1] min-h-[100px] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
                    <p className="flex-grow font-thin text-neutral-700 text-lg">
                    Primary_Distribution_Cables
                    </p>
                    <hr />
                    <div className="flex justify-center items-center text-4xl font-light text-[#0071b9]">
                        <b>
                            {loading ? <Loader className="mt-1" /> :
                                MaterialCount?.data?.[0]?.primary_distribution_cables || <span className="text-red-500 text-sm">No Data</span>}
                        </b>
                    </div>
                </div>
            </div>
        </div>
    )
}