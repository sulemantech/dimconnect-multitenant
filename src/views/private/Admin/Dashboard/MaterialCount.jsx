import { Box, Card, CardSection, Divider, Loader, Paper, Skeleton, Title } from "@mantine/core";
import { useEffect, useState } from "preact/hooks";
import { getMaterialCountByDistrictId } from "../../../../api";
import { dropvalue } from "../../../../signals";
import { commarize } from "../../../../utils/convertor";
import { useTranslation } from "react-i18next";
import { IconChartBubble, IconLocation, IconMap2, IconPin } from "@tabler/icons-react";
import { Icon123 } from "@tabler/icons-react";
import { IconTestPipe } from "@tabler/icons";
import Icons from "../../../../layout/icons";

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
    <div className="flex flex-row flex-1 flex-grow">
      {/* <div className="flex flex-col flex-1 flex-grow">
        <CountCard
          title="Demand Points"
          loading={loading}
          count={MaterialCount?.data?.demand_points}
        />
        <CountCard
          title="Drop Duct"
          unit="m"
          count={MaterialCount?.data?.drop_ducts}
          loading={loading}
        />


      </div> */}



      <div className="flex flex-[3] md:flex-row flex-grow flex-wrap flex-col">
        <GroupedCount
            title="Drop | Demand"
            loading={loading}
            color=""
            unit="m"
            data={[
              { count: ( MaterialCount?.data?.demand_points), title: 'Points',icon:<Icons.Marker/> },
              { count: (MaterialCount?.data?.drop_ducts), title: 'Ducts',icon:<Icons.IconDucts/> },
            ]}
          />
          <GroupedCount
            title="Primary Breakdown"
            loading={loading}
            color="text-red-500"
            unit="m"
            data={[
              { count: ( MaterialCount?.data?.primary_distribution_ducts), title: 'Primary Ducts',icon:<Icons.IconCables/> },
              { count: ( MaterialCount?.data?.primary_distribution_cables), title: 'Primary Cables',icon:<Icons.IconDucts/> },
            ]}
          />
        <GroupedCount
          title="Feeder Breakdown"
          loading={loading}
          color="text-emerald-500"
          unit="m"
          data={[
            { count: MaterialCount?.data?.feeder_ducts, title: 'Feeder Ducts',icon:<Icons.IconCables/> },
            { count:  MaterialCount?.data?.feeder_cables, title: 'Feeder Cables',icon:<Icons.IconDucts/> },
          ]}
        />
        <GroupedCount
          title="Distribution Breakdown"
          loading={loading}
          color="text-sky-700"
          unit="m"
          data={[
            { count: ( MaterialCount?.data?.distribution_ducts), title: 'Distribution Ducts',icon:<Icons.IconCables/> },
            { count: ( MaterialCount?.data?.out_distributioncables), title: 'Distribution Cables',icon:<Icons.IconDucts/> },
          ]}
        />




      </div>
    </div>
  );
};

const CountCard = ({ title, count, unit = "", loading = false }) => {
  const { t } = useTranslation()
  return (
    <Paper
      withBorder
      p={10}
     
      className="flex flex-grow items-center px-4 min-h-[40px] md:min-h-[50px] m-1 bg-white shadow-lg rounded-lg justify-between"
    >
      <div className="flex rounded-t-lg font-thin text-xl truncate text-black p-1">
        {t(title)}
      </div>
     
      <div className="flex relative justify-center items-center text-sm md:text-2xl font-light text-brand">
        <b>
          {
            loading ? (
              <Loader variant="dots" size="md" className="text-brand" />
            ) : (
              count ?
                commarize(count)
                :
                <span className="text-red-500 text-2xl">{t('No Data')}</span>

            )
          }
          {(count && !loading) && unit}
        </b>
      </div>
    </Paper>
  )
};

const GroupedCount = ({ title, data, unit = "", loading = false, color='red' }) => {
  return (
    <Card
      className="flex-1 m-2"
    >
    

        <Title className='truncate mb-2' order={4}>{title}</Title>
  
        { 
          data.map((item, index) => (
            <div className="flex flex-row justify-between items-center p-1">
              <span className="text-base truncate flex items-center justify-center"><Card withBorder className={`${color} flex items-center justify-center`} w={30} h={25} p={2} mr={10}>{item?.icon}</Card>{item.title}</span>
              <span className="text-base truncate">{
                loading ? (
                  <Loader variant="dots" size="md" className="text-brand" />
                ) :
              commarize(item.count ?? 0)
              }</span>
            </div>
          ))
        }
    

    </Card>
  );
}
