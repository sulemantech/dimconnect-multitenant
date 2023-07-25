import { Loader } from "@mantine/core";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "preact/hooks";
import { Doughnut } from "react-chartjs-2";

import { costInfoData } from "../../../../signals";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

export default () => {
  const {t}=useTranslation()
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      costInfoData.subscribe((data) => {
        setData(data);
      })
    }, []
  )
  
  if (!data || !data.cables || !data.cables.distribution || !data.cables.feeder || !data.cables.primary) {
    return <div className='flex justify-center h-full items-center'>
      <p>No Data</p>
    </div>
  }

  const getChartData = (dataset) => {
    if (!dataset) {
      return {}
    }
    return ({
      labels: dataset.map(item => item.cable_type),
      datasets: [{
        data: dataset.map(item => item.total_cost),
        backgroundColor: ['#0E76BB', '#0092c3', 'sky', 'blue', 'indigo', 'purple', 'cyan']
      }]
    })
  };

  if (!data) {
    return <div className='flex justify-center h-full items-center'><Loader size='lg' /></div>
  }

  if (loading || !data?.cables) {
    return <div className='flex justify-center h-full items-center'><Loader size='lg' /></div>
  }

  return <div className="w-full h-[350px] flex justify-center items-center">



    <div>
      <h2>{t('Distribution Cable Types')}</h2>
      <Doughnut className="w-1/3 h-96 p-6 max-w-xs" title="" data={getChartData(data.cables.distribution)} />
    </div>

    <div>
      <h2>{t('Feeder Cable Types')}</h2>
      <Doughnut className="w-1/3 h-96 p-6 max-w-xs" title="" data={getChartData(data.cables.feeder)} />
    </div>

    <div>
      <h2>{t('Primary Cable Types')}</h2>
      <Doughnut className="w-1/3 h-96 p-6 max-w-xs" title="" data={getChartData(data.cables.primary)} />
    </div>


  </div>
}
