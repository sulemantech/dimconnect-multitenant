import { Button, Input, Slider, Table } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { useEffect, useState } from "preact/hooks"
import PageProvider from "../../../../providers/PageProvider"
import { visibility } from "../../Admin/Map/DataTiles"
import { dropvalue } from "../../../../layout/Header"

export default () => {
    const [layers, setLayers] = useState({})
    useEffect(() => {
        setLayers(JSON.parse(visibility.value) || {})
    }, [visibility.value])
    return (
        <PageProvider>
            <Table align="center" size="sm" responsive>
                <thead>
                    <tr>
                        <th>Layer</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.values(layers).map((layer, index) => {
                            return (
                                <tr key={index}>
                                    <td>{
                                        layer.name
                                        .replace(dropvalue.value, '')
                                            .replace('_OUT_', '')
                                        .split('_')
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')
                                    }</td>
                                    <td>{
                                        layer.type
                                    }</td>
                                    <td>
                                       
                                        <Button variant="outline" color="orange"
                                        mr={1}
                                            onClick={() => {
                                                openModal({
                                                    title: 'Style',
                                                    children: <Styler layer={layer} />
                                                })
                                            }}
                                        >
                                            Style
                                        </Button>
                                        <Button variant="outline" color="red"
                                            onClick={() => {
                                                openModal({
                                                    title: 'Attributes',
                                                    children: <Attributes layer={layer} />
                                                })
                                            }}
                                        >
                                            View Attributes
                                        </Button>
                                    </td>
                                </tr>

                            )
                        })
                    }
                </tbody>
            </Table>
        </PageProvider>
    )
}

const Attributes = ({ layer }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {
                    layer.attributes.map((attr, index) => {
                        return (
                            <tr key={index}>
                                <td>{attr.attribute}</td>
                                <td>{attr.type}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

const stylingType = {
    'Polygon': {
        'fill-color': 'color',
        'fill-outline-color': 'color',
        'fill-opacity': 'slider',
    },
    'LineString': {
        'line-color': 'color',
        'line-width': 'number',
        'line-opacity': 'slider'
    },
    'Point': {
        'circle-color': 'color',
        'circle-radius': 'number',
        'circle-opacity': 'slider'
    }
}

const onChange = (e, layer, attr) => {
    const layers = JSON.parse(visibility.value)
    layers[layer.name]['style'] = {
        ...layers[layer.name]['style'],
        [attr]: parseFloat(e.target.value) || e.target.value
    }
    visibility.value = JSON.stringify(layers)
    
}

const Styler = ({ layer }) => {
return (
        <div>
            <h1>Fill Color</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(stylingType[layer.type]).map((attr, index) => {
                            return (
                                <tr key={index}>
                                    <td>{attr.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                                    <td>{
                                        stylingType[layer.type][attr] == 'color' ? (
                                            <Input defaultValue={layer.style?.[attr] || 'orange'} type='color' onChange={(e) => onChange(e, layer, attr)} />
                                        ) : stylingType[layer.type]?.[attr] == 'slider' ? (
                                            <Slider type="range" min="0" max="1" step="0.01" defaultValue={layer.style?.[attr] || 1} onChange={(e) => onChange({
                                                target: {
                                                    value: e
                                                }
                                            }, layer, attr)} />
                                        ) : stylingType[layer.type][attr] == 'number' ? (
                                            <Input type="number" defaultValue={layer.style?.[attr] || 1} onChange={(e) => onChange(e, layer, attr)} />
                                        ) : null

                                    }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )

}
