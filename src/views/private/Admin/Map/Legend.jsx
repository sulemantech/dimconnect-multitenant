import { signal } from "@preact/signals"
import { addressPointsStatusVisibility } from "./AddressPoints"
import { Accordion } from "@mantine/core"
// ja (Anschluss prüfen)	                 rgb(255, 140, 42);
// ja	                                                 rgb(29, 155, 216);
// nein (Anschluss geprüft)	         rgb(237, 82, 73);
// nein	                                                 rgb(0, 0, 0);
// inexistente Adresse	                 rgb(167, 38, 231);
// Schon bearbeitet	                         rgb(112, 173, 70);
export const legendContent = signal({
    'ja (Anschluss prüfen)': {
        color: 'rgb(255, 140, 42)',
        type: 'point',
        code: 1
    },
    'ja': {
        color: 'rgb(29, 155, 216)',
        type: 'point',
        code: 2
    },
    'nein (Anschluss geprüft)': {
        color: 'rgb(237, 82, 73)',
        type: 'point',
        code: 3
    },
    'nein': {
        color: 'rgb(0, 0, 0)',
        type: 'point',
        code: 4
    },
    'inexistente Adresse': {
        color: 'rgb(167, 38, 231)',
        type: 'point',
        code: 5
    },
})

export const netzplanninglegend = signal({
    "Status": {
    "Finalisierung Netzdetailplanung durch TRC": {
        color: "orange",
        type: 'point',
        code: 1
    },
        'noch keine Phase begonnen': {
            color: '#808080',
            type: 'point',
            code: 1
        },
        'in Bearbeitung, s. Phasen': {
            color: '#ffeb9c',
            type: 'point',
            code: 2
        },
        'alle Phasen abgeschlossen': {
            color: '#c6efce',
            type: 'point',
            code: 3
        },
    },
    "Bearbeitungsphasen": {
        'Onboarding': {
            symbol: '1',
        },
        'APV: Validierung durch TRC': {
            symbol: '2',
        },
        'APV: Validierung durch Kommune': {
            symbol: '3',
        },
        'NPV: Netzplanaufbereitung durch TRC': {
            symbol: '4',
        },
        'NPV: Netzplanaufbereitung durch Kommune': {
            symbol: '5',
        },
        'Finalisierung Netzdetailplanung durch TRC': {
            symbol: '6',
        },
        'Finalisierung Netzdetailplanung durch Kommune': {
            symbol: '7',
        },
    }
    })

export default () => {
    return (
        <div className="relative text-xs flex flex-col p-2 shadow-md rounded-md mt-2 bg-white">
            <h6 className="mb-1"><b>Legend</b></h6>
            <Accordion defaultValue={'Address Points'} className="text-xs">
                <Accordion.Item value="Address Points" className="text-xs">
                    <Accordion.Control>Address Points</Accordion.Control>
                    <Accordion.Panel>
                        <div>
                            {
                                Object.entries(legendContent.value)?.map(([key, item]) => {
                                    return <div className="flex py-1 flex-row items-center cursor-pointer"
                                        onClick={() => {
                                            addressPointsStatusVisibility.value = {
                                                ...addressPointsStatusVisibility.value,
                                                [item.code]: !addressPointsStatusVisibility.value[item.code]
                                            }
                                        }}
                                    >
                                        <div className={`w-4 h-4 rounded-full mr-2`}
                                            style={{
                                                backgroundColor: addressPointsStatusVisibility.value[item.code] ? item.color : 'silver',

                                            }}
                                        ></div>
                                        <div className="flex-1" />
                                        <p
                                            className={`text-xs ${addressPointsStatusVisibility.value[item.code] ? 'text-gray-900' : 'text-gray-400'}`}
                                        >{key}</p>

                                        <hr />

                                    </div>


                                })
                            }
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="Netzplanning" className="text-xs">
                    <Accordion.Control>Netzplanning</Accordion.Control>
                    <Accordion.Panel>
                        <div>
                            {
                                Object.entries(netzplanninglegend.value)?.map(([key, item]) => {
                                    return <>
                                        {
                                            Object.entries(item)?.map(([key, item]) => {
                                                return <div className="flex py-1 flex-row items-center cursor-pointer"
                                                    onClick={() => {
                                                        
                                                    }}
                                                >
                                                    <div className={`w-4 h-4 rounded-full mr-2`}
                                                        style={{
                                                            backgroundColor: addressPointsStatusVisibility.value[item.code] ? item.color : 'whitesmoke',
                                                            color: 'blue'
                                                        }}
                                                    >
                                                        {item.symbol}
                                                    </div>
                                                    <div className="flex-1" />
                                                    <p
                                                        className={`text-xs ${addressPointsStatusVisibility.value[item.code] ? 'text-gray-900' : 'text-gray-400'}`}
                                                    >{key}</p>

                                                    <hr />

                                                </div>
                                            })
                                        }
                                    </>
                                })
                            }
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}