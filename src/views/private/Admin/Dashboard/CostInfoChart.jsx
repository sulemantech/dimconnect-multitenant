import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "preact/hooks";
import { Loader } from "@mantine/core";

import { costInfoData } from "../../../../signals";

ChartJS.register(ArcElement, Tooltip, Legend);

export default () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      costInfoData.subscribe((data) => {
        setData(data);
      })
    }, []
  )

  const getChartData = (dataset) => ({
    labels: dataset.map(item => item.cable_type),
    datasets: [{
      data: dataset.map(item => item.total_cost),
      backgroundColor: ['#0E76BB', '#0092c3', 'sky', 'blue', 'indigo', 'purple', 'cyan']
    }]
  });

  if (!data) {
    return <div className='flex justify-center h-full items-center'><Loader size='lg' /></div>
  }

  if (loading || !data?.cables) {
    return <div className='flex justify-center h-full items-center'><Loader size='lg' /></div>
  }

  return <div className="w-full h-[350px] flex justify-center items-center">
   


      <div>
      <h2>Distribution Cable Types</h2>
      <Doughnut className="w-1/3 h-96 p-6 max-w-xs" title="" data={getChartData(data.cables.distribution)} />
      </div>

      <div>
      <h2>Feeder Cable Types</h2>
      <Doughnut  className="w-1/3 h-96 p-6 max-w-xs" title="" data={getChartData(data.cables.feeder)} />
      </div>

      <div>
      <h2>Primary Cable Types</h2>
      <Doughnut className="w-1/3 h-96 p-6 max-w-xs" title="" data={getChartData(data.cables.primary)} />
      </div>
   
 
  </div>
}
