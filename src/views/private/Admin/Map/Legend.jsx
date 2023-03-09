import { signal } from "@preact/signals"

export const legendContent = signal({
    'XYZ': {
        type: 'point',
        color: 'red'
    },
    'ABC': {
        type: 'line',
        color: 'blue'
    }
})
export default () => {
    return (
        <div className="relative flex flex-col p-2 shadow-md rounded-md mt-2 bg-white">
            <h6><b>Legend</b></h6>
            <hr />
            <div>
                {
                    Object.entries(legendContent.value).map(([key, item]) => {
                        switch (item.type) {
                            case 'point': {
                                return (
                                    <div className="flex flex-row items-center">
                                        <div className={`w-4 h-4 rounded-full mr-2`}
                                            style={{
                                                backgroundColor: item.color
                                            }}
                                        ></div>
                                        <div className="flex-1" />
                                        <p>{key}</p>
                                    </div>
                                )
                            }
                            case 'line': {
                                return (
                                    <div className="flex flex-row items-center">
                                        <div className={`w-4 h-1 mr-2`}
                                            style={{
                                                backgroundColor: item.color
                                            }}
                                        ></div>
                                        <div className="flex-1" />
                                        <p>{key}</p>
                                    </div>
                                )
                            }
                            case 'polygon': {
                                return (
                                    <div className="flex flex-row items-center">
                                        <div className={`w-4 h-4 mr-2`}
                                            style={{
                                                backgroundColor: item.color
                                            }}
                                        ></div>
                                        <div className="flex-1" />
                                        <p>{key}</p>
                                    </div>
                                )
                            }
                        }

                    })
                }
            </div>
        </div>
    )
}