import { useEffect, useState } from "preact/hooks"
import { Layer, Source } from "react-map-gl"
import SplineWrapper from "spline-wrapper"

import { dropvalue, visibility } from "../../../../signals"
import appConfig from "../../../../config/appConfig"



export default ({ ags = null }) => {


    const [tileData, setTileData] = useState(null)


    useEffect(() => {
        dropvalue.subscribe((value) => {
            setTileData(null)

            let fetchUrl = `https://dim-tileserver-dev.hiwifipro.com/data/${value}.json`;

            if (ags !== null && ags === "05758032") { 
                fetchUrl = `https://dim-tileserver-dev.hiwifipro.com/data/${ags}.json`;
            }

            fetch(fetchUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(appConfig.localStorageKey) || localStorage.getItem(appConfig.localStorageKeyWebview)}`,
                }
            })
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

                    visibility.value = JSON.stringify(visibilitytemp)

                })

        })

    }, [])

    // on visibility change

    return (
        <>
            {tileData != null &&
            (ags != null && ags !== "" ? (
                <MarketInvestigationTilesView tileData={tileData} id={ags} />
            ) : (
                <TilesView tileData={tileData} id={dropvalue.value} />
            ))}
        </>

    )
}



export const TilesView = ({ tileData, id }) => {

    const PolyfillColors = {
        [`${dropvalue.value}_district_boundaries`]: 'whitesmoke',
        [`${dropvalue.value}_OUT_DistributionClusters`]: 'purple',
        [`${dropvalue.value}_OUT_FeederClusters`]: 'pink',
        [`${dropvalue.value}_OUT_PrimDistributionClusters`]: 'green',
    }
    let url = `https://dim-tileserver-dev.hiwifipro.com/data/${id}.json`;

    return (
        <SplineWrapper>
            <Source
                type="vector"
                format="pbf"
                url={url}
                minzoom={1}
                maxzoom={18}
                name={`tilesource${id}`}
            >

                {
                    tileData?.tilestats?.layers?.map((layer) => {
                        const inside = JSON.parse(visibility.value)[layer.layer]

                        return <Layer
                            interactive
                            id={layer.layer}
                            type={layer.geometry.replace('Multi', '') == 'Polygon' ? 'fill' : layer.geometry.replace('Multi', '') == 'LineString' ? 'line' : 'circle'}
                            sourceId={`tilesource${id}`}
                            minzoom={
                                layer.geometry.replace('Multi', '') == 'Polygon' ?
                                    1
                                    :
                                    layer.geometry.replace('Multi', '') == 'LineString' ?
                                        14
                                        :
                                        14
                            }
                            maxzoom={
                                layer.geometry.replace('Multi', '') == 'Polygon' ?
                                    14
                                    :
                                    layer.geometry.replace('Multi', '') == 'LineString' ?
                                        22
                                        :
                                        22
                            }
                            source-layer={layer.layer}
                            paint={
                                inside?.style ? inside?.style : layer.geometry.replace('Multi', '') == 'Polygon' ?
                                    {
                                        // how to do transparent fill
                                        "fill-color": PolyfillColors[layer.layer] ? PolyfillColors[layer.layer] : 'grey',
                                        "fill-opacity": 0.5
                                    }
                                    :
                                    layer.geometry.replace('Multi', '') == 'LineString'
                                        ?
                                        (() => {

                                            if (layer.layer == dropvalue.value + '_OUT_DistributionCables') {
                                                return {
                                                    "line-color": "orange",
                                                    "line-opacity": 0.7,
                                                    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 2, 18, 4],
                                                }
                                            }
                                            else if (layer.layer == dropvalue.value + '_OUT_FeederCables') {
                                                return {
                                                    "line-color": "purple",
                                                    "line-opacity": 0.7,
                                                    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 3, 18, 6],
                                                }
                                            }
                                            else if (layer.layer == dropvalue.value + '_OUT_PrimDistributionCables') {
                                                return {
                                                    "line-color": "blue",
                                                    "line-opacity": 0.7,
                                                    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 1, 18, 2],
                                                }
                                            } else {
                                                return {
                                                    "line-color": "yellow",
                                                    "line-opacity": 0.7,
                                                    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 0.5, 18, 1],
                                                }
                                            }


                                        })()

                                        :
                                        {
                                            "circle-color": "transparent",
                                            "circle-stroke-width": 1,
                                            "circle-stroke-opacity": 0.1,
                                            "circle-stroke-color": "white",

                                            "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 18, 15],
                                        }
                            }



                            layout={{
                                ...layer.layout,
                                visibility: inside?.visible ? 'visible' : 'none'
                            }}

                            beforeId={
                                layer.geometry.replace('Multi', '') == 'Polygon' ? "waterway" :
                                    "addressPoints"
                            }
                        />
                    })
                }
            </Source>
        </SplineWrapper>
    )
}

export const MarketInvestigationTilesView = ({ tileData, id }) => {
        // Define a mapping of layer IDs to their respective colors
//         Point: 05758032_ap_2023 
// Polygon: 05758032_gem_spenge
// Point: 05758032_tkuA
// Point: 05758032_tkuB
// Point:05758032_tkuC
// Polygon:05758032_tkuD
        const PolyfillColors = {
          '05758032_ap_2023': 'yellow',
          '05758032_gem_spenge': 'purple',
          '05758032_tkuA': 'red',
          '05758032_tkuB': 'green',
          '05758032_tkuC': 'blue',
          '05758032_tkuD': 'pink',
        };
      
        // Construct the tile URL based on the provided JSON structure
        //const url = `https://dim-tileserver-dev.hiwifipro.com/data/${id}/{z}/{x}/{y}.pbf`;
        let url = `https://dim-tileserver-dev.hiwifipro.com/data/${id}.json`;

        return (
          <SplineWrapper>
            <Source
              type="vector"
              format="pbf"
              url={url}
              minzoom={8}
              maxzoom={18}
              name={`tilesource${id}`}
            >
              {tileData?.tilestats?.layers.map((layer) => {
                const layerId = layer.layer;
                const inside = JSON.parse(visibility.value)[layerId];
      
                return (
                  <Layer
                    interactive
                    id={layerId}
                    type={layer.geometry.replace('Multi', '') == 'Polygon' ? 'fill' : layer.geometry.replace('Multi', '') == 'LineString' ? 'line' : 'circle'}
                    sourceId={`tilesource${id}`}
                    minzoom={14}
                    maxzoom={22}
                    source-layer={layerId}
                    paint={
                        inside?.style ? inside?.style : layer.geometry.replace('Multi', '') == 'Polygon' ?
                            {
                                // how to do transparent fill
                                "fill-color": PolyfillColors[layer.layer] ? PolyfillColors[layer.layer] : 'grey',
                                "fill-opacity": 0.5
                            }
                            :
                            layer.geometry.replace('Multi', '') == 'LineString'
                                ?
                                (() => {

                                    if (layer.layer == dropvalue.value + '_OUT_DistributionCables') {
                                        return {
                                            "line-color": "orange",
                                            "line-opacity": 0.7,
                                            "line-width": ["interpolate", ["linear"], ["zoom"], 14, 2, 18, 4],
                                        }
                                    }
                                    else if (layer.layer == dropvalue.value + '_OUT_FeederCables') {
                                        return {
                                            "line-color": "purple",
                                            "line-opacity": 0.7,
                                            "line-width": ["interpolate", ["linear"], ["zoom"], 14, 3, 18, 6],
                                        }
                                    }
                                    else if (layer.layer == dropvalue.value + '_OUT_PrimDistributionCables') {
                                        return {
                                            "line-color": "blue",
                                            "line-opacity": 0.7,
                                            "line-width": ["interpolate", ["linear"], ["zoom"], 14, 1, 18, 2],
                                        }
                                    } else {
                                        return {
                                            "line-color": "yellow",
                                            "line-opacity": 0.7,
                                            "line-width": ["interpolate", ["linear"], ["zoom"], 14, 0.5, 18, 1],
                                        }
                                    }


                                })()

                                :
                                {
                                    "circle-color": "transparent",
                                    "circle-stroke-width": 1,
                                    "circle-stroke-opacity": 0.1,
                                    "circle-stroke-color": "white",

                                    "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 18, 15],
                                }
                    }

                    layout={{
                      ...layer.layout,
                      visibility: inside?.visible ? 'visible' : 'none',
                    }}
                    
                  />
                );
              })}
            </Source>
          </SplineWrapper>
        );
      };
      