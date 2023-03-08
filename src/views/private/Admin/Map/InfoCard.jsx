import { Transition } from "@mantine/core"
import { effect, signal } from "@preact/signals"
import { useState } from "preact/hooks"
import { JsonToTable } from "react-json-to-table"
import { dropvalue } from "../../../../layout/Header"

export const infoCardVal = signal(null)



export default () => {
    const [infoCardData, setInfoCardData] = useState(null)
    effect(() => {
        if (infoCardVal.value) {
            const len = infoCardVal.value.length
            setInfoCardData(infoCardVal.value[len - 1])
        }
    }, [infoCardVal.value])
    return (
        <>
            {
            
                <Transition transition="slide-right" duration={400} mounted={infoCardVal.value != null} timingFunction="ease">
                    {( styles) =>
                    
                        <div  style={styles}  className="bg-white absolute left-2 bottom-2 z-50 p-2 rounded-md shadow-lg" >
                            <div className="relative">
                                <div className="flex items-center">
                               
                                
                                <div className="text-sm font-semibold text-gray-700">
                                    {infoCardData?.sourceLayer?.replace(`${dropvalue.value}`, "")?.replace("_OUT_","")?.replace(/_/g, " ")?.toUpperCase()}
                                </div>
                                <div className="flex-1" />
                                <button className="absolute right-0 top-0 -mt-2 -mr-2 " onClick={() => infoCardVal.value = null}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>

                                </div>
                                <div className="text-xs font-semibold text-gray-700">
                                    <JsonToTable json={infoCardData.properties} />
                                </div>


                            </div>
                            </div>
                           
                    }
                </Transition>
            }
        </>
    )
}