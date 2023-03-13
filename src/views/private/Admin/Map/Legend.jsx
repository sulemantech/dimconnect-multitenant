import { signal } from "@preact/signals"
// ja (Anschluss prüfen)	                 rgb(255, 140, 42);
// ja	                                                 rgb(29, 155, 216);
// nein (Anschluss geprüft)	         rgb(237, 82, 73);
// nein	                                                 rgb(0, 0, 0);
// inexistente Adresse	                 rgb(167, 38, 231);
// Schon bearbeitet	                         rgb(112, 173, 70);
export const legendContent = signal({
    'ja (Anschluss prüfen)': {
        color: 'rgb(255, 140, 42)',
        type: 'point'
    },
    'ja': {
        color: 'rgb(29, 155, 216)',
        type: 'point'
    },
    'nein (Anschluss geprüft)': {
        color: 'rgb(237, 82, 73)',
        type: 'point'
    },
    'nein': {
        color: 'rgb(0, 0, 0)',
        type: 'point'
    },
    'inexistente Adresse': {
        color: 'rgb(167, 38, 231)',
        type: 'point'
    },
})
export default () => {
    return (
        <div className="relative text-xs flex flex-col p-2 shadow-md rounded-md mt-2 bg-white">
            {/* <h6 className="mb-1"><b>Legend</b></h6> */}
           
            <div>
                {
                    Object.entries(legendContent.value).map(([key, item]) => {
                        switch (item.type) {
                            case 'point': {
                                return (
                                    <>
                                    <div className="flex py-1 flex-row items-center">
                                        <div className={`w-4 h-4 rounded-full mr-2`}
                                            style={{
                                                backgroundColor: item.color
                                            }}
                                        ></div>
                                        <div className="flex-1" />
                                        <p>{key}</p>
                                    </div>
                                            <hr />
                                            </>
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