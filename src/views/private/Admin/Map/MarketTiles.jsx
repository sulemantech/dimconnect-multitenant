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

            //let fetchUrl = `https://dim-tileserver-dev.hiwifipro.com/data/${value}.json`;

            //if (ags !== null && ags === "05758032") { 
             var fetchUrl = `https://dim-tileserver-dev.hiwifipro.com/data/05758032.json`;
            //}

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

                <MarketTilesView tileData={tileData} id={dropvalue.value} />
            }
        </>

    )
}


export const MarketTilesView = ({ tileData, id }) => {
        const PolyfillColors = {
          '05758032_ap_2023': 'blue',
          '05758032_gem_spenge': 'lightgreen',
          '05758032_tkuA': 'purple',
          '05758032_tkuB': 'black',
          '05758032_tkuC': 'red',
          '05758032_tkuD': 'grey',
        };
      
        let url = `https://dim-tileserver-dev.hiwifipro.com/data/05758032.json`;
        return (
          <SplineWrapper>
            <Source
              type="vector"
              format="pbf"
              url={url}
              minzoom={4}
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
                    minzoom={0}
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
                                {
                                    "circle-color": PolyfillColors[layer.layer] ? PolyfillColors[layer.layer] : 'grey',
                                    "circle-stroke-width": 1,
                                    "circle-stroke-opacity": 0.5,
                                    "circle-stroke-color": "white",
                                    "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 1, 18, 5],
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
      