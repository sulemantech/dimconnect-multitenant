import { Source, Layer } from "react-map-gl";
export default ({ beforeId }) => {
  return (
    <>
      <Source
        id="rlp_dop"
        type="raster"
        tiles={[
          import.meta.env.VITE_AERIAL_VIEW_WMS_URL,
        ]}
        tileSize={256}
      >
        <Layer id="rlp_dop" type="raster" beforeId="park_national_park" />
      </Source>
    </>
  );
};
