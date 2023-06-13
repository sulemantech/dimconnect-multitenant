import { useEffect, useState } from 'preact/hooks';
import { Loader, Table } from '@mantine/core';
import { Input } from '@mantine/core';
import { commarize } from '../../../../utils/convertor';
import { dropvalue, costInfoData, costInputParams } from '../../../../signals';
import { getCostInfoByDistrictId } from '../../../../api';




export default () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dropvalue.subscribe((value) => {
      setLoading(true);
      getCostInfoByDistrictId(value).then((res) => {
        setLoading(false);
        costInfoData.value = res.data;
      });
    });
    costInfoData.subscribe((data) => {
      setData(data);
    });
  }, [])
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
          <td>{commarize(data?.feeder_cable_cost)} €</td>
        </tr>
        <tr>
          <td>PRM Distribution Cable Cost</td>
          <td>{commarize(data.prm_distrb_cable_cost)} €</td>
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


export const CostInfoSettings = () => {
  const [data, setData] = useState({});
  useEffect(() => costInputParams.subscribe(setData), [])
  return (
    <form>
      <div className='my-2 flex tracking-wider font-bold items-center text-center text-sky-600'>
        CABLES
      </div>
      <hr />
      <Table className="w-full" striped responsive>
        <thead>
          <tr>
            <th>Type</th>
            <th>Material Cost</th>
            <th>Labour Cost</th>
          </tr>
        </thead>

        <tbody>
          {
            data.cables && Object.keys(data.cables).map((key) => (
              <tr>
                <td> {key.toUpperCase()}</td>
                <td>
                  <Input type="number" value={data.cables[key].materialCost} onChange={(e) => {
                    data.cables[key].materialCost = e.target.value;
                    setData(data);
                  }} />
                </td>
                <td>
                  <Input type="number" value={data.cables[key].labourCost} onChange={(e) => {
                    data.cables[key].labourCost = e.target.value;
                    setData(data);
                  }} />
                </td>
              </tr>
            ))

          }
        </tbody>

      </Table>

      <div className='my-2 flex tracking-wider font-bold items-center text-center text-sky-600'>
        DUCT
      </div>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Material Cost</th>
            <th>Labour Cost</th>
          </tr>
        </thead>
        <tbody>
          {
            data.duct && Object.keys(data.duct).map((key) => (
              <tr>
                <td> {key.toUpperCase()}</td>
                <td>
                  <Input type="number" value={data.duct[key].materialCost} onChange={(e) => {
                    data.duct[key].materialCost = e.target.value;
                    setData(data);
                  }} />
                </td>
                <td>
                  <Input type="number" value={data.duct[key].labourCost} onChange={(e) => {
                    data.duct[key].labourCost = e.target.value;
                    setData(data);
                  }} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      <div className='my-2 flex tracking-wider font-bold items-center text-center text-sky-600'>
      Home Activation
      </div>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Greater Material Cost</th>
            <th>Greater Labour Cost</th>
          </tr>
        </thead>
        <tbody>

          {
            data.homeActivation && Object.keys(data.homeActivation).map((key) => (
              <tr>
                <td> {key.toUpperCase()}</td>
                <td>
                  <Input type="number" value={data.homeActivation[key].greaterMaterialCost} onChange={(e) => {
                    data.homeActivation[key].materialCost = e.target.value;
                    setData(data);
                  }} />
                </td>
                <td>
                  <Input type="number" value={data.homeActivation[key].greaterLabourCost} onChange={(e) => {
                    data.homeActivation[key].labourCost = e.target.value;
                    setData(data);
                  }} />
                </td>
              </tr>
            ))
          }

        </tbody>
      </Table>

      <div className='my-2 flex tracking-wider font-bold items-center text-center text-sky-600'>
      Home Activation
      </div>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Lower Material Cost</th>
            <th>Lower Labour Cost</th>
          </tr>
        </thead>
        <tbody>

          {
            data.homeActivation && Object.keys(data.homeActivation).map((key) => (
              <tr>
                <td> {key.toUpperCase()}</td>
                <td>
                  <Input type="number" value={data.homeActivation[key].lowerMaterialCost} onChange={(e) => {
                    data.homeActivation[key].materialCost = e.target.value;
                    setData(data);
                  }} />
                </td>
                <td>
                  <Input type="number" value={data.homeActivation[key].lowerLabourCost} onChange={(e) => {
                    data.homeActivation[key].labourCost = e.target.value;
                    setData(data);
                  }} />
                </td>
              </tr>
            ))
          }

        </tbody>
      </Table>
    </form >
  );
}
