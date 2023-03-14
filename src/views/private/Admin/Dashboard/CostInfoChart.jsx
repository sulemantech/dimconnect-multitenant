import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { dropvalue } from "../../../../layout/Header";
import { useEffect, useState } from "preact/hooks";
import { getCostInfoByDistrictId } from "../../../../api";
import { Loader } from "@mantine/core";
import { costInfoData } from "./CostInfo";

ChartJS.register(ArcElement, Tooltip, Legend);





export default () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    costInfoData.subscribe((data) => {
      setData(data);
    });
  }, [])

  if (loading) {
    return <div className='flex justify-center h-full items-center'><Loader size='lg' /></div>
  }

  return <div className="w-full h-[350px] flex justify-center items-center">
  <Doughnut data={{
    labels: ['Feeder Cable Cost', 'PRM Distribution Cable Cost', 'Distribution Cable Cost', 'Duct Cost', 'Home Activation Cost'],
    datasets: [
      {
        label: 'Cost',
        data: [parseFloat(data?.feeder_cable_cost), parseFloat(data?.prm_distrb_cable_cost), parseFloat(data?.distrb_cable_cost), parseFloat(data?.duct_cost), parseFloat(data?.home_activation_cost)],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#00a0e9',
          '#0071b9',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#00a0e9',
          '#0071b9',
        ],
      },
    ],

  }} 
   options={{
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
          labels: {
              display: false
          }
      }
  
   }}
  />
  </div>
}
