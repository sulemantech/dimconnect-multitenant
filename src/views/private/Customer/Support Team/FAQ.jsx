import { Input, ScrollArea } from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import { useEffect, useState } from "preact/hooks"

import Icons from "../../../../layout/icons"
import { getFAQs } from "../../../../api"
import { Link } from "preact-router"
import { FAQState } from "../../../../signals"
import DimBot from "../../../../components/DimBot"

export const getFAQ_Memory = async () => {
    if(FAQState.value.length < 1) {
        const res = await getFAQs("d2lmaS10ZXN0MUBybHAuZGV2LXR1di5kZTpXaWZpLVRlc3Qx")
        
        FAQState.value = res.data.list
        return res.data.list
    }else{
        console.log(FAQState.value)
        return FAQState.value
    }
}


export default () => {
    const allowedCatID = [
        "610cf5bee37598dc3",
        "610cf6bcc03a171db",
        "610cf6dad6e09ff26",
        "610cf6f201d682d18",
        //news
        // "60ec1a0a2f119b147",
        // "61f9532b9c18b0d45"
      ]
    const [data, setData] = useState([])
    useEffect(() => {
        getFAQs("d2lmaS10ZXN0MUBybHAuZGV2LXR1di5kZTpXaWZpLVRlc3Qx").then((res) => {
            
            FAQState.value = res.data.list.filter(item => allowedCatID.includes(item.categoriesIds[0]))
        })
        FAQState.subscribe(setData)
    }, [])



    const categories = [...new Set(data.map(item => Object.values(item.categoriesNames)[0]))];


    

    return (
        <div className={'h-screen bg-white overflow-x-auto'}>
            <div style={{ backgroundImage: 'url("/horizontal blue background.svg")' }} className="flex flex-col pl-20 justify-center h-1/3">
                <div className="text-4xl font-bold tracking-wide text-white">We Can Help.</div>
                <div className="text-xs text-white my-2">FAQ : Frequently Asked Questions, Conclusively Answered</div>
                <Input rightSection={<IconSearch size={20} />} radius={'xl'} placeholder="Search" className="w-1/2 mt-4" />
            </div>

            <div className={`px-20 mt-10`}>
                <h6 className={`text-[#0E76BB] font-bold text-xl`}>Popular FAQ Topics are here:</h6>
                <p className={'font-semibold text-sm mt-1'}>General Questions: Short And Briefly Answered</p>
                <ul className={`mt-4 list-disc list-inside  text-sm font-light tracking-wider`}>
                  {
                    data
                    .filter(item => item.name.length > 100)
                    
                    .slice(0, 3).map((item, index) => {
                        return(
                        <li key={index} className={`my-2`} >
                            <Link href={`./faq/${Object.values(item.categoriesNames)[0]}`} >
                                <a className={`text-[#0E76BB] hover:underline`}>{item.name}</a>
                            </Link>
                        </li>
                    )})
                  }
                </ul>
            </div>
            <div className={`px-16 mt-10`}>
                <ScrollArea className={`h-96`}>
                <div className="grid grid-cols-3 gap-4 grow">
                    {
                    categories
                    .filter(item => item)
                    .map((category, index) => (
                        <Link href={`./faq/${category}`} >
                            <PageControlButton
                                label={category}
                                key={index}
                                icon={<Icons.TopicFAQ />}
                            />
                        </Link>
                    ))}
                </div>
                </ScrollArea>
            </div>
<DimBot height={'400px'} width={'350px'}/>
        </div>
    )
}

const PageControlButton = ({ icon, label, href }) => {
    return (
        <div className={`flex h-full flex-1 flex-col justify-center items-center space-x-2 bg-slate-300 m-2 rounded-3xl shadow-md border-white border-2 border-solid py-2 hover:scale-105 transition-all cursor-pointer`}>
            <div className={`flex justify-center items-center w-10 h-10 rounded-full  text-[#0E76BB]`}>
                {icon}
            </div>
            <div className={`text-[#0E76BB] tracking-wide text-xs`}>
                {label}
            </div>
        </div>
    )
}