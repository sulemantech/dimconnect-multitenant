import { useEffect, useState } from "preact/compat";
import { Source, Layer } from "react-map-gl";
export default () => {
  const [layers, setLayers] = useState([]);

  async function fetchCapabilities(url) {
    try {
      const response = await fetch(url);
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");
      return xmlDoc;
    } catch (error) {
      console.error("Error fetching GetCapabilities:", error);
    }
  }

  function extractSupportedImageFormats(xmlDoc) {
    const formats = [];

    const getMapElement = xmlDoc.querySelector("Capability > Request > GetMap");
    if (getMapElement) {
      const formatElements = getMapElement.getElementsByTagName("Format");
      for (let i = 0; i < formatElements.length; i++) {
        formats.push(formatElements[i].textContent);
      }
    }

    return formats;
  }

  useEffect(() => {
    const url = import.meta.env.VITE_PR_PROPERTIES_WMS_GET_CAPABILITIES_URL;

    fetchCapabilities(url).then((xmlDoc) => {
      const globalSupportedFormats = extractSupportedImageFormats(xmlDoc);
      const layerInfos = []; // Array to store layer info objects

      const srsElements = xmlDoc.getElementsByTagName("SRS");
      const supportedSRS = [];

      for (let i = 0; i < srsElements.length; i++) {
        supportedSRS.push(srsElements[i].textContent);
      }

      const layerElements = xmlDoc.getElementsByTagName("Layer");
      for (let i = 0; i < layerElements.length; i++) {
        const nameElement = layerElements[i].getElementsByTagName("Name")[0];
        if (nameElement) {
          const layerName = nameElement.textContent;

          // Try to get layer-specific formats
          const layerSpecificFormats = Array.from(
            layerElements[i].querySelectorAll("Format")
          ).map((el) => el.textContent);

          let format;
          if (layerSpecificFormats.length > 0) {
            // Use the first layer-specific format
            format = layerSpecificFormats[0];
          } else {
            // Fallback to the first global format
            format = globalSupportedFormats[0];
          }

          layerInfos.push({
            name: layerName,
            format: format,
          });
        }
      }

      setLayers(layerInfos); // Update state with layer info objects
    });
  }, []);

  return (
    <>
      {layers.map((layer, index) => (
        <Source
          key={index + "layer" + layer.name}
          id={layer.name}
          type="raster"
          tiles={[
            `https://geo5.service24.rlp.de/wms/liegenschaften_rp.fcgi?SERVICE=WMS&VERSION=1.1&REQUEST=GetMap&LAYERS=${layer.name}&FORMAT=image/png&TRANSPARENT=true&STYLES=&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256`,
          ]}
          tileSize={256}
        >
          <Layer id={layer.name} type="raster" beforeId="landuse" />
        </Source>
      ))}
    </>
  );
};
