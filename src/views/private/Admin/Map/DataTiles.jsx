import { signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { Layer, Source, useMap } from "react-map-gl"
import { getAddressPointStatus } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"

export const visibility = signal(null)

export default () => {


    const [tileData, setTileData] = useState(null)
    const [addressPointStatus, setAddressPointStatus] = useState({
        '2':[41283, 41284, 41285, 41286, 41287, 41288, 41289, 41290, 41291, 41292, 41293, 41294, 41295, 41296, 41297, 41298, 41299, 41300, 41301, 41302, 41303, 41304, 41305, 41306, 41307, 41308, 41309, 41310, 41311, 41312, 41313, 41314, 41315, 41316, 41317, 41318, 41319, 41320, 41321, 41322, 41323, 41324, 41325, 41326, 41327, 41328, 41329, 41330, 41331, 41332, 41333, 41334, 41335, 41336, 41337, 41338, 41339, 41340, 41341, 41342, 41343, 41344, 41345, 41346, 41347, 41348, 41349, 41350, 41351, 41352, 41353, 41354, 41355, 41356, 41357, 41358, 41359, 41360, 41361, 41362, 41363, 41364, 41365, 41366, 41367, 41368, 41369, 41370, 41371, 41372, 41373, 41374, 41375, 41376, 41377, 41378, 41379, 41380, 41381, 41382, 41383, 41384, 41385, 41386, 41387, 41388, 41389, 41390, 41391, 41392, 41393, 41394, 41395, 41396, 41397, 41398, 41399, 41400, 41401, 41402, 41403, 41404, 41405, 41406, 41407, 41408, 41409],
        '3':[41251, 41252, 41253, 41254, 41255, 41256, 41257, 41258, 41259, 41260, 41261, 41262, 41263, 41264, 41265, 41266, 41267, 41268, 41269, 41270, 41271, 41272, 41273, 41274, 41275, 41276, 41277, 41278, 41279, 41280, 41281, 41282, 41283, 41284, 41285, 41286, 41287, 41288, 41289, 41290, 41291, 41292, 41293, 41294, 41295, 41296, 41297, 41298, 41299, 41300, 41301, 41302, 41303, 41304, 41305, 41306, 41307, 41308, 41309, 41310, 41311, 41312, 41313, 41314, 41315, 41316, 41317, 41318, 41319, 41320, 41321, 41322, 41323, 41324, 41325, 41326, 41327, 41328, 41329, 41330, 41331, 41332, 41333, 41334, 41335, 41336, 41337, 41338, 41339, 41340, 41341, 41342, 41343, 41344, 41345, 41346, 41347, 41348, 41349, 41350, 41351, 41352, 41353, 41354, 41355, 41356, 41357, 41358, 41359, 41360, 41361, 41362, 41363, 41364, 41365, 41366, 41367, 41368, 41369, 41370, 41371, 41372, 41373, 41374, 41375, 41376],
        '4':[41221, 41222, 41223, 41224, 41225, 41226, 41227, 41228, 41229, 41230, 41231, 41232, 41233, 41234, 41235, 41236, 41237, 41238, 41239, 41240, 41241, 41242, 41243, 41244, 41245, 41246, 41247, 41248, 41249, 41250, 41251, 41252, 41253, 41254, 41255, 41256, 41257, 41258, 41259, 41260, 41261, 41262, 41263, 41264, 41265, 41266, 41267, 41268, 41269, 41270, 41271, 41272, 41273, 41274, 41275, 41276, 41277, 41278, 41279, 41280, 41281, 41282, 41283, 41284, 41285, 41286, 41287, 41288, 41289, 41290, 41291, 41292, 41293, 41294, 41295, 41296, 41297, 41298, 41299, 41300, 41301, 41302, 41303, 41304, 41305, 41306, 41307, 41308, 41309, 41310, 41311, 41312, 41313, 41314, 41315, 41316, 41317, 41318, 41319, 41320, 41321, 41322, 41323, 41324, 41325, 41326, 41327, 41328, 41329, 41330, 41331, 41332, 41333, 41334, 41335, 41336, 41337, 41338, 41339, 41340, 41341, 41342, 41343, 41344, 41345, 41346]
    })


    useEffect(() => {
        setTileData(null)
        fetch(`https://dim-tileserver-dev.hiwifipro.com/data/${dropvalue.value}.json`)
            .then(res => res.json())
            .then(data => {

                let visibilitytemp = {}
                data?.tilestats?.layers?.forEach(layer => {
                    visibilitytemp[layer.layer] = {
                        visible: true,
                        name: layer.layer,
                        type: layer.geometry,
                        attributes: layer.attributes
                    }
                })
                setTileData(data)
                if (!visibility.value) {
                    visibility.value = JSON.stringify(visibilitytemp)

                } else {
                    setTileData(data)
                }

            })

        // getAddressPointStatus(dropvalue.value).then(({ data }) => {
        //     setAddressPointStatus(data?.[0]?.json_object_agg)
        // })


    }, [dropvalue.value])

    // on visibility change

    return (
        <>

            {tileData != null &&

                <TilesView tileData={tileData} id={dropvalue.value} addressPointStatus={addressPointStatus} />
            }
        </>

    )
}

export const TilesView = ({ tileData, id, addressPointStatus }) => {
    
    return (
        <Source
            type="vector"
            format="pbf"
            url={`https://dim-tileserver-dev.hiwifipro.com/data/${id}.json`}
            minzoom={1}
            maxzoom={18}
            name={`tilesource${id}`}
        >

            {
                tileData?.tilestats?.layers?.map((layer) => {
                    const inside = JSON.parse(visibility.value)[layer.layer]
                   
                    if(layer.layer == `${dropvalue.value}_OUT_DemandPoints`){
                        const expressionValidated = addressPointStatus?.['2']?.map((id) => ['==', 'ID', id])
                        const expressionUnvalidated = addressPointStatus?.['3']?.map((id) => ['==', 'ID', id])
                        const expressionToBeValidated = addressPointStatus?.['4']?.map((id) => ['==', 'ID', id])
                        return [
                        <Layer
                            interactive
                            id={layer.layer + 'validated'}
                            type='circle'
                            sourceId={`tilesource${id}`}
                            source-layer={layer.layer}
                            paint={{
                                'circle-color' : "orange",
                                'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 3, 18, 7],
                                'circle-stroke-width': 1,
                                'circle-stroke-color': 'white'

                            }}
                            
                            filter={['any', ...expressionValidated]}
                        />,
                        <Layer
                            interactive
                            id={layer.layer + 'unvalidated'}
                            type='circle'
                            sourceId={`tilesource${id}`}
                            source-layer={layer.layer}
                            paint={{
                                'circle-color' : "red",
                                'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 3, 18, 7],
                                'circle-stroke-width': 1,
                                'circle-stroke-color': 'white'

                            }}
                            filter={['any', ...expressionUnvalidated]}
                        />,
                        <Layer  
                            interactive 
                            id={layer.layer + 'tobeverified'}
                            type='circle'
                            sourceId={`tilesource${id}`}
                            source-layer={layer.layer}
                            paint={{
                                'circle-color' : "blue",
                                'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 3, 18, 7],
                                'circle-stroke-width': 1,
                                'circle-stroke-color': 'white'

                            }}
                            filter={['any', ...expressionToBeValidated]}
                        />].map((layer) => layer)
                            
                    }

                    return <Layer
                        interactive
                        id={layer.layer}
                        type={layer.geometry.replace('Multi', '') == 'Polygon' ? 'fill' : layer.geometry.replace('Multi', '') == 'LineString' ? 'line' : 'circle'}
                        sourceId={`tilesource${id}`}
                        source-layer={layer.layer}
                        paint={
                            inside?.style ? inside?.style : layer.geometry.replace('Multi', '') == 'Polygon' ?
                                {
                                    // how to do transparent fill

                                    "fill-opacity": 0
                                }
                                :
                                layer.geometry.replace('Multi', '') == 'LineString'
                                    ?
                                    (() => {
                                        
                                        if (layer.layer == '071375003_OUT_DistributionCables') {
                                            return {
                                                "line-color": "red",
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 2],
                                            }
                                        }
                                        else if (layer.layer == '071375003_OUT_FeederCables') {
                                            return {
                                                "line-color": "purple",
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 2],
                                            }
                                        }
                                        else if (layer.layer == '071375003_OUT_PrimDistributionCables') {
                                            return {
                                                "line-color": "blue",
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 2],
                                            }
                                        } else {
                                            return {
                                                "line-color": "grey",
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 2],
                                            }
                                        }


                                    })()

                                    :
                                    {
                                        "circle-color": "red",
                                        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 5],
                                    }
                        }



                        layout={{
                            ...layer.layout,
                            // visibility: inside?.visible ? 'visible' : 'none'      
                        }}
                    />
                })
            }
        </Source>
    )
}