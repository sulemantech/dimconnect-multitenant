import { Loader, Paper, Skeleton } from "@mantine/core";
import { useEffect, useState } from "preact/hooks";
import { getMaterialCountByDistrictId } from "../../../../api";
import { dropvalue } from "../../../../signals";
import { commarize } from "../../../../utils/convertor";

export default () => {
  const [MaterialCount, setMaterialCount] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getMaterialCountByDistrictId(dropvalue.value)
      .then(({ data }) => {
        setLoading(false);
        setMaterialCount(data);
      })
      .catch((err) => {
        setLoading(false);
        setMaterialCount("No Data");
      });
  }, [dropvalue.value]);
  return (
    <div className="flex flex-col flex-1 flex-grow">
      <div className="flex flex-col md:flex-row w-full flex-grow">
        <CountCard
          title="Demand Points"
          loading={loading}
          count={MaterialCount?.data?.demand_points}
        />

        <CountCard
          title="Feeder Cables"
          loading={loading}
          unit="m"
          count={MaterialCount?.data?.feeder_cables}
        />
     
        <CountCard
          title="Distribution Cables"
          unit="m"
          count={MaterialCount?.data?.out_distributioncables}
          loading={loading}
        />

        <CountCard
          title="Primary Cables"
          unit="m"
          count={MaterialCount?.data?.primary_distribution_cables}
          loading={loading}
        />
      </div>
      <div className="flex flex-col md:flex-row w-full flex-grow">
        <CountCard
          title="Distribution Duct"
          unit="m"
          count={MaterialCount?.data?.distribution_ducts}
          loading={loading}
        />

        <CountCard
          title="Primary Duct"
          unit="m"
          count={MaterialCount?.data?.primary_distribution_ducts}
          loading={loading}
        />
      
        <CountCard
          title="Feeder Duct"
          unit="m"
          count={MaterialCount?.data?.feeder_ducts}
          loading={loading}
        />
        <CountCard
          title="Drop Duct"
          unit="m"
          count={MaterialCount?.data?.drop_ducts}
          loading={loading}
        />
      </div>
    </div>
  );
};

const CountCard = ({ title, count,unit="", loading = false }) => (
  <Paper
    withBorder
    p={0}
    className=" flex-grow items-center  min-h-[40px] md:min-h-[50px] m-1 bg-white shadow-lg rounded-lg"
  >
    <span className="flex rounded-t-lg font-thintext-xs md:text-sm truncate bg-brand text-white p-1">
      {title}
    </span>
    <hr />
    <div className="flex relative justify-center items-center text-sm md:text-xl font-light text-brand">
      <b>
        {
          loading ? (
            <Loader variant="dots" size="md" className="text-brand" />
          ) : (
            count ? 
            commarize(count) 
            : 
              <span className="text-red-500 text-sm">No Data</span>
            
          )
        }
        {(count && !loading) && unit}
      </b>
    </div>
  </Paper>
);
