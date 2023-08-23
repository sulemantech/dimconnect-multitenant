import { Source, Layer } from "react-map-gl";
export default ({ beforeId }) => {
  return (
    <>
      <Source
        id="rlp_dop"
        type="raster"
        tiles={[
          `https://geo4.service24.rlp.de/wms/rp_dop40.fcgi?SERVICE=WMS&VERSION=1.1&REQUEST=GetMap&LAYERS=rp_dop40&FORMAT=image/png&TRANSPARENT=true&STYLES=&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256`,
        ]}
        tileSize={256}
      >
        <Layer id="rlp_dop" type="raster" beforeId="park_national_park" />
      </Source>
    </>
  );
};
