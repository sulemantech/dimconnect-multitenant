import { IconCapture, IconMap2, IconSlideshow } from "@tabler/icons"

export default () => {
    const controls = {
        'Region': {
            icon: <IconMap2 className="scale-110 text-[#0071b9] " />,
            selectable: true,
            "method": () => {
                parent.postMessage({ type: 'changeRegion' }, '*')
                window?.webkit?.messageHandlers?.jsHandler?.postMessage({ type: 'changeRegion' })
            }
        },
        'Screenshot': {
            icon: <IconCapture className="scale-110 text-[#0071b9]" />,
            selectable: true,
            "method": () => {
                parent.postMessage({ type: 'addScreenshot' }, '*')
                window?.webkit?.messageHandlers?.jsHandler?.postMessage({ type: 'addScreenshot' })
                
            }
        },
        'Show Screenshots': {
            icon: <IconSlideshow className="scale-110 text-[#0071b9]" />,
            selectable: true,
            "method": () => {
                parent.postMessage({ type: 'showScreenshots' }, '*')
                window?.webkit?.messageHandlers?.jsHandler?.postMessage({ type: 'showScreenshots' })
                
            }
        },
    }
    return (
        <div className="flex flex-row items-center justify-around w-full h-12 shadow-2xl">
            {
                Object.keys(controls).map((key, index) => {
                    return (
                        <div
                            onClick={() => {
                                
                                controls[key].method()
                            }}
                            className={`flex-1 justify-center flex items-center gap-2  cursor-pointer border-r-2 border-neutral-200 border-solid text-[#0071b9]`}
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