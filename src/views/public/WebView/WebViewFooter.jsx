import { IconCapture, IconMap2, IconSlideshow } from "@tabler/icons"

export default () => {
    const controls = {
        'Region': {
            icon: <IconMap2 className="scale-110 text-white " />,
            selectable: true,
            "method": () => {
                parent.postMessage({ type: 'changeRegion' }, '*')
                window?.webkit?.messageHandlers?.jsHandler?.postMessage({ type: 'changeRegion' })
            }
        },
        'Screenshot': {
            icon: <IconCapture className="scale-110 text-white" />,
            selectable: true,
            "method": () => {
                parent.postMessage({ type: 'addScreenshot' }, '*')
                window?.webkit?.messageHandlers?.jsHandler?.postMessage({ type: 'addScreenshot' })

            }
        },
        'Show Screenshots': {
            icon: <IconSlideshow className="scale-110 text-white" />,
            selectable: true,
            "method": () => {
                parent.postMessage({ type: 'showScreenshots' }, '*')
                window?.webkit?.messageHandlers?.jsHandler?.postMessage({ type: 'showScreenshots' })

            }
        },
    }
    return (
        <div className="flex flex-row items-center justify-around w-full pt-2 pb-4 shadow-2xl bg-[#0E76BB] ">
            {
                Object.keys(controls).map((key, index) => {
                    return (
                        <div
                            onClick={() => {

                                controls[key].method()
                            }}
                            className={`flex-1 justify-center flex flex-col  items-center gap-2  cursor-pointer border-r-2 border-neutral-200 border-solid bg-[#0E76BB] text-white last:border-none`}
                        >
                            {controls[key].icon}
                            <b className="tracking-wide text-[10px] ">
                                {key}
                            </b>
                        </div>
                    )
                })
            }
        </div>
    )
}