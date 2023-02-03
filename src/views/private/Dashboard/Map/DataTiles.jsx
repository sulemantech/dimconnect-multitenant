import { signal } from "@preact/signals"
import { useEffect,useState } from "preact/hooks"
import { Layer, Source, useMap } from "react-map-gl"

export default () => {

    const [tileJSON,settileJSON] = useState(null)
    const map = useMap()?.current
    useEffect(() => {
        fetch('https://dim-tileserver-dev.hiwifipro.com/data/071310007.json')
            .then(res => res.json())
            .then(data => {

                map.easeTo({ center: [8.029105246999109, 49.410560035491216], zoom: 9 })
                settileJSON(data)
               
            })
    }, [])

    return (
        <>
            {/* <Source
                id="geostyle"
                type="vector"
                tiles={['http://18.218.50.110:8885/data/boundaries/{z}/{x}/{y}.pbf']}
                minzoom={1}
                maxzoom={20}
            />
            <Layer
                id="bound"
                type="fill"
                source="geostyle"
                source-layer='boundaries'
                paint={{
                    "fill-color": "#088",
                    "fill-opacity": 0.8
                }}

            /> */}

            <>
                {tileJSON != null &&
                    <>
                        <Source
                            id="geostyle"
                            type="vector"
                            tiles={['https://dim-tileserver-dev.hiwifipro.com/data/073325005/{z}/{x}/{y}.pbf']}
                            minzoom={1}
                            maxzoom={20}
                        />


                        {
                            tileJSON?.tilestats?.layers?.map(layer => {

                                return <Layer
                                    id={layer.layer}
                                    type={layer.geometry.replace('Multi', '') == 'Polygon' ? 'fill' : layer.geometry.replace('Multi', '') == 'LineString' ? 'line' : 'circle'}
                                    source="geostyle"
                                    source-layer={layer.layer}
                                    paint={
                                        layer.geometry.replace('Multi', '') == 'Polygon' ? {
                                            "fill-color": "orange",
                                            "fill-opacity": 0.5
                                        } : layer.geometry.replace('Multi', '') == 'LineString' ? {
                                            "line-color": "green",
                                            "line-width": 2
                                        } : {
                                            "circle-color": "red",
                                            "circle-radius": 2
                                        }
                                    }
                                />
                            })
                        }
                    </>
                }
            </>
</>
            )
}