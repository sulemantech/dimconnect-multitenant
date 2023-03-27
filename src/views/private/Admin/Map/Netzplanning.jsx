import { useEffect, useState } from "preact/hooks"
import { dropvalue } from "../../../../layout/Header"
import { getnetzplanning } from "../../../../api"

export default () =>{
    const [data,setData ] = useState([])
    useEffect(()=>{
        dropvalue.subscribe((value)=>{
            getnetzplanning(value).then((res)=>{
                console.log(Object.values(res.data?.[0]?.["json_build_object"]))
                setData(res.data?.[0]?.["json_build_object"])
            })
        })

    },[])
    return(
        <>
        </>
    )
}