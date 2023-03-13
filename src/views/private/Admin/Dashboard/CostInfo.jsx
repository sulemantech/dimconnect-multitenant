import { useEffect, useState } from 'preact/hooks';
import { dropvalue } from '../../../../layout/Header';
import { getCostInfoByDistrictId } from '../../../../api';
import {  Loader, Table } from '@mantine/core';
import { commarize } from '../../../../utils/convertor';


export default () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getCostInfoByDistrictId(dropvalue.value).then((res) => {
      setLoading(false);
      setData(res.data);
    });
  }, [dropvalue.value])
  if (loading) {
    return <div className='flex justify-center h-full items-center'><Loader size='lg' /></div>
  }
  return (
    <Table className="w-full" striped responsive>
      <thead>
        <tr>
          <th>Type</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Feeder Cable Cost</td>
          <td>{commarize( data?.feeder_cable_cost )} €</td>
        </tr>
        <tr>
          <td>PRM Distribution Cable Cost</td>
          <td>{commarize(data.prm_distrb_cable_cost) } €</td>
        </tr>
        <tr>
          <td>Distribution Cable Cost</td>
          <td>{commarize(data.distrb_cable_cost)} €</td>
        </tr>
        <tr>
          <td>Duct Cost</td>
          <td>{commarize(data.duct_cost)} €</td>
        </tr>
        <tr>
          <td>Home Activation Cost</td>
          <td>{commarize(data.home_activation_cost)} €</td>
        </tr>
        <tr>
          <td>Total Cost</td>
          <td>{commarize(parseFloat(data?.feeder_cable_cost) + parseFloat(data?.prm_distrb_cable_cost) + parseFloat(data?.distrb_cable_cost) + parseFloat(data?.duct_cost) + parseFloat(data?.home_activation_cost))} €</td>
        </tr>
      </tbody>

    </Table>
  );

}
