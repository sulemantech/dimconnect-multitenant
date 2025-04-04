import { Autocomplete, Input, Loader, ScrollArea } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import tenantConfig  from "../../../../../config";
import Icons from "../../../../layout/icons"
import { getFAQs } from "../../../../api"
import { Link } from "preact-router"
import { FAQState, userDataSignal } from "../../../../signals"
import DimBot from "../../../../components/DimBot"

export const getFAQ_Memory = async () => {
    if (FAQState.value.length < 1) {
        const res = await getFAQs("d2lmaS10ZXN0MUBybHAuZGV2LXR1di5kZTpXaWZpLVRlc3Qx")
        
        FAQState.value = res.data.list.filter(faq => !faq.deleted) // Filter out FAQs with deleted=true
        return FAQState.value
    } else {
        console.log(FAQState.value)
        return FAQState.value
    }
}

export default () => {
    const { t } = useTranslation()
    const [loading,setLoading] = useState(false)
    //TODO:Replace the harcoded categories and take the list from the logged in user
    const allowedCatID = userDataSignal.value.faqIds
    const [data, setData] = useState([])
    useEffect(() => {
        setLoading(true)
        //TODO: Replace the hardcoded authentication token
        getFAQs("d2lmaS10ZXN0MUBybHAuZGV2LXR1di5kZTpXaWZpLVRlc3Qx").then((res) => {
            FAQState.value = res.data.list.filter(item => !item.deleted && allowedCatID.includes(item.categoriesIds[0]))
            setLoading(false)
        })        
        FAQState.subscribe(setData)
    }, [])



    const categories = [...new Set(data.map(item => Object.values(item.categoriesNames)[0]))];

    if(loading) return (
        <div className="h-screen bg-white overflow-x-auto flex justify-center items-center">
            <Loader variant="bars" size={'lg'} />
        </div>
    )



    return (
        <div id="scale-down" className={'h-screen bg-white overflow-x-auto'}>
            <div style={{ backgroundImage: 'url("/horizontal blue background.svg")', }} className="flex bg-no-repeat bg-cover flex-col pl-20 justify-center h-[295px] max-2xl:h-[200px]">
                <div className="py-6" />
                <div className="text-4xl max-2xl:text-2xl font-bold tracking-wide text-white">{t('We Can Help.')}</div>
                <div className="text-xs text-white my-2">{t('FAQ : Frequently Asked Questions, Conclusively Answered')}</div>
                {/* <Input  size="lg"
                rightSection={<IconSearch size={20} />} radius={'xl'} placeholder={t('Search')} className="w-1/2 mt-4" /> */}
                <Autocomplete   size="sm" data={data.map(item => item.name)}
                rightSection={<IconSearch size={16} />} radius={'xl'} placeholder={t('Search')} className="w-1/2 mt-4"
                
                // when someone click or select any item from the list, it will redirect to the FAQ page with the selected item
                onChange={(value) => {
                    console.log(value)
                    const selectedFAQ = data.filter(item => item.name === value)
                    if(selectedFAQ.length > 0) {
                        window.location.href = `./faq/${Object.values(selectedFAQ[0].categoriesNames)[0]}?q=${selectedFAQ[0].id}&#${selectedFAQ[0].id}`
                    }
                }}
                />
            </div>

            <div className={`px-20 mt-10`}>
                <h6 style={{ color:tenantConfig.GlobalConfiguration.textbluecolor}} className={` font-bold text-xl max-2xl:text-lg`}>{t('Popular FAQ Topics are here:')}</h6>
                <p className={'text-sm mt-1 max-2xl:text-xs'}>{t('General Questions: Short And Briefly Answered')}</p>
                <ul style={{ color:tenantConfig.GlobalConfiguration.textbluecolor}}   className={`mt-4 max-2xl:mt-2 list-disc list-inside  text-sm max-2xl:text-xs font-light tracking-wider`}>
                    {
                        data
                            .filter(item => item.name.length > 100)

                            .slice(0, 3).map((item, index) => {
                                
                                return (
                                    <li key={index} className={`my-2`} >
                                        <Link href={`./faq/${Object.values(item.categoriesNames)[0]}?q=${item.id}&#${item.id}`} >
                                            <a className={` hover:underline`}>{item.name}</a>
                                        </Link>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
            <div className={`px-16 mt-10 max-w-[1600px]`}>
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
            <DimBot height={'400px'} width={'300px'} />
        </div>
    )
}

const PageControlButton = ({ icon, label, href }) => {
    
    return (
        <div style={{backgroundColor: tenantConfig.FAQ.CardBg , color:tenantConfig.GlobalConfiguration.textbluecolor}} className={`flex flex-1 flex-col flex-grow h-24 max-2xl:h-20 rounded-3xl justify-center px-10  font-semibold capitalize hover:scale-95 active:bg-sky-400 hover:bg-sky-200   justify-self-end items-center hover:shadow-lg shadow-md transition-all duration-200 ease-in-out ripple-bg-sky-50`}>
            <div className={`flex justify-center items-center -mt-6 w-12 max-2xl:w-9 h-12 max-2xl:h-9 max-2xl:-mt-4 rounded-full  `}>
                {icon}
            </div>
            <div className={` tracking-wide text-xs`}>
                {label}
            </div>
        </div>
        
    )
}