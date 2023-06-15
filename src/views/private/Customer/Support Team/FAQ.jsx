import { Input } from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import Icons from "../../../../layout/icons"

export default () => {
    return (
        <div className={'h-screen bg-white'}>
            <div style={{ backgroundImage: 'url("/horizontal blue background.svg")' }} className="flex flex-col pl-20 justify-center h-1/3">
                <div className="text-4xl font-bold tracking-wide text-white">We Can Help.</div>
                <div className="text-xs text-white my-2">FAQ : Frequently Asked Questions, Conclusively Answered</div>
                <Input rightSection={<IconSearch size={20} />} radius={'xl'} placeholder="Search" className="w-1/2 mt-4" />
            </div>

            <div className={`px-20 mt-10`}>
                <h6 className={`text-[#0071b9] font-bold text-xl`}>Popular FAQ Topics are here:</h6>
                <p className={'font-semibold text-sm mt-1'}>General Questions: Short And Briefly Answered</p>
                <ul className={`mt-4 list-disc list-inside  text-sm font-light tracking-wider`}>
                    <li>What is a comprehensive Cross-Municipal network detail planning?</li>
                    <li>What is a comprehensive Cross-Municipal network detail planning?</li>
                    <li>What is a comprehensive Cross-Municipal network detail planning?</li>
                </ul>
            </div>
            <div className={`px-16 mt-10`}>

                <div className={`flex`}>
                    <PageControlButton label={'General Questions'} href={'/'} icon={<Icons.TopicFAQ />} />
                    <PageControlButton label={'General Questions'} href={'/'} icon={<Icons.TopicFAQ />} />
                    <PageControlButton label={'General Questions'} href={'/'} icon={<Icons.TopicFAQ />} />
                </div>
                <div className={`flex`}>
                <PageControlButton label={'General Questions'} href={'/'} icon={<Icons.TopicFAQ />} />
                    <PageControlButton label={'General Questions'} href={'/'} icon={<Icons.TopicFAQ />} />
                    <PageControlButton label={'General Questions'} href={'/'} icon={<Icons.TopicFAQ />} />
                </div>
            </div>

        </div>
    )
}

const PageControlButton = ({icon, label, href}) => {
    return (
        <div className={`flex flex-1 flex-col justify-center items-center space-x-2 bg-slate-300 m-2 rounded-3xl shadow-md border-white border-2 border-solid py-2 hover:scale-105 transition-all cursor-pointer`}>
            <div className={`flex justify-center items-center w-10 h-10 rounded-full  text-[#0071b9]`}>
                {icon}
            </div>
            <div className={`text-[#0071b9] tracking-wide text-xs`}>
                {label}
            </div>
        </div>
    )
}