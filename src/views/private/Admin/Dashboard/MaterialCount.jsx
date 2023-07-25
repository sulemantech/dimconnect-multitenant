import { Box, Card, CardSection, Divider, Loader, Paper, Skeleton, Title } from "@mantine/core";
import { useEffect, useState } from "preact/hooks";
import { getMaterialCountByDistrictId } from "../../../../api";
import { dropvalue } from "../../../../signals";
import { commarize } from "../../../../utils/convertor";
import { useTranslation } from "react-i18next";
import { IconChartBubble } from "@tabler/icons-react";
import { Icon123 } from "@tabler/icons-react";

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

      <div className="flex flex-[3] flex-row flex-grow">
        
          <GroupedCount
            title="Primary Stations"
            loading={loading}
            color="border-sky-500"
            unit="m"
            data={[
              { count: ( MaterialCount?.data?.primary_distribution_ducts), title: 'Primary Ducts' },
              { count: ( MaterialCount?.data?.primary_distribution_cables), title: 'Primary Cables' },
            ]}
          />
        <GroupedCount
          title="Feeder Stations"
          loading={loading}
          color="border-red-500"
          unit="m"
          data={[
            { count: MaterialCount?.data?.feeder_ducts, title: 'Feeder Ducts' },
            { count:  MaterialCount?.data?.feeder_cables, title: 'Feeder Cables' },
          ]}
        />
        <GroupedCount
          title="Distribution Stations"
          loading={loading}
          color="border-emerald-500"
          unit="m"
          data={[
            { count: ( MaterialCount?.data?.distribution_ducts), title: 'Distribution Ducts',icon:<Icon123 /> },
            { count: ( MaterialCount?.data?.out_distributioncables), title: 'Distribution Cables' },
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
      shadow="sm"
      radius={'lg'}
      withBorder
      className="flex-1 mx-2"
    >
      <CardSection >

        <Title className='truncate p-4' order={3}>{title}</Title>
      </CardSection>

      <CardSection className="p-4">
        { loading ? (
          <Loader variant="dots" size="md" className="text-brand" />
        ) :
          data.map((item, index) => (
            <div className="flex flex-row justify-between items-center">
             {item?.icon} <span className="text-base truncate">{item.title}</span>
              <span className="text-base truncate">{commarize(item.count)}</span>
            </div>
          ))
        }
      </CardSection>

    </Card>
  );
}
