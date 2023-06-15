import { useEffect, useState } from 'preact/hooks';
import { Loader, Table } from '@mantine/core';
import { Input } from '@mantine/core';
import { commarize } from '../../../../utils/convertor';
import { dropvalue, costInfoData, costInputParams } from '../../../../signals';
import { getCostInfoByDistrictId } from '../../../../api';
import appConfig from '../../../../config/appConfig';
import axios from 'axios';


const costInfoSampleData = {
  "cables": {
    "distribution": [
      {
        "cable_type": "48",
        "materialcost": "1",
        "labourcost": "1",
        "total": "2",
        "volume": "2999.499944686889652",
        "total_cost": "5998.999889373779304"
      },
      {
        "cable_type": "12",
        "materialcost": "1",
        "labourcost": "1",
        "total": "2",
        "volume": "197598.243586063384578",
        "total_cost": "395196.487172126769156"
      },
      {
        "cable_type": "24",
        "materialcost": "1",
        "labourcost": "1",
        "total": "2",
        "volume": "26649.107190608978225",
        "total_cost": "53298.214381217956450"
      },
      {
        "cable_type": "6",
        "materialcost": "1",
        "labourcost": "1",
        "total": "2",
        "volume": "2169990.308662891383683",
        "total_cost": "4339980.617325782767366"
      }
    ],
    "feeder": [
      {
        "cable_type": "144",
        "materialcost": "2",
        "labourcost": "2",
        "total": "4",
        "volume": "21332.892645835876461",
        "total_cost": "85331.570583343505844"
      },
      {
        "cable_type": "192",
        "materialcost": "2",
        "labourcost": "2",
        "total": "4",
        "volume": "22864.814158916473388",
        "total_cost": "91459.256635665893552"
      },
      {
        "cable_type": "288",
        "materialcost": "2",
        "labourcost": "2",
        "total": "4",
        "volume": "41148.055275440216053",
        "total_cost": "164592.221101760864212"
      }
    ],
    "primary": [
      {
        "cable_type": "192",
        "materialcost": "2",
        "labourcost": "2",
        "total": "4",
        "volume": "1185.505584716796870",
        "total_cost": "4742.022338867187480"
      },
      {
        "cable_type": "144",
        "materialcost": "2",
        "labourcost": "2",
        "total": "4",
        "volume": "90802.308464288711488",
        "total_cost": "363209.233857154845952"
      }
    ]
  },
  "duct": {
    "distribution": [
      {
        "duct_type": "12x10/6 (Rohrverband)",
        "duct_materialcost": "6.00",
        "duct_labourcost": "0",
        "duct_volume": "432120.731266197979797",
        "total_cost": "2592724.38759718787878200"
      }
    ],
    "feeder": [
      {
        "duct_type": "7x16x12",
        "duct_materialcost": "7.5",
        "duct_labourcost": "0",
        "duct_volume": "57400.874345093965363",
        "total_cost": "430506.5575882047402225"
      }
    ],
    "primary": [
      {
        "duct_type": "7x16/12 (Rohrverband)",
        "duct_materialcost": "7.5",
        "duct_labourcost": "0",
        "duct_volume": "77544.191479349814865",
        "total_cost": "581581.4360951236114875"
      }
    ]
  },
  "homeActivation": {
    "total_building_count": 91,
    "building_count_1_to_3": 89,
    "building_connections_1_to_3": 96,
    "building_per_connection_cost_1_to_3": 400,
    "total_cost_building_connections_1_to_3": 38400,
    "building_count_3_plus": 2,
    "building_connections_3_plus": 9,
    "building_per_connection_cost_3_plus": 400,
    "total_cost_building_connections_3_plus": 3600,
    "total_homescount": 778,
    "homescount_1_to_3": 776,
    "homecount_connections_1_to_3": 865,
    "homecount_per_connection_cost_1_to_3": 1,
    "total_cost_homecount_connections_1_to_3": 865,
    "homecount_3_plus": 2,
    "homecount_connections_3_plus": 10,
    "homecount_per_connection_cost_3_plus": 11,
    "total_cost_homecount_connections_3_plus": 110,
    "total_cost": 42975
  }
}

export default () => {
  const [data, setData] = useState({}); // as costInfoSampleData
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dropvalue.subscribe((value) => {
      setLoading(true);

      const URLSearchParam = new URLSearchParams();
      URLSearchParam.append('costs', JSON.stringify(costInputParams.value));

      
      
        
      getCostInfoByDistrictId(value,URLSearchParam)
      
      .then((res) => {
        
        setLoading(false);
        costInfoData.value = res.data;
      }).catch((err) => {
        setLoading(false);
        console.log(err);
      })
    })
    costInfoData.subscribe((data) => {
      setData(data);
    });
  }, [])

  if (loading) {
    return <div className='flex justify-center h-full items-center'><Loader size='lg' /></div>
  }
  return (
    <>

      { Object.keys(data).length > 0 && 
        Object.keys(data).map((key) => (
          <>
            <div className='my-2 flex tracking-wider font-bold items-center text-center text-sky-600'>
              {key.toUpperCase()}
            </div>
            <hr />
            <Table className="w-full" striped responsive>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Material Cost</th>
                  <th>Labour Cost</th>
                  <th>Volume</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {
                  
                  key == 'homeActivation' ? <> 
                  <tr>
                    <td className='text-xs'>Total Building Count</td>
                    
                    </tr>
                  </>
                  :
                  Object.keys(data[key]).map((item) =>{ 
                    const dd = data[key][item];
                    const reduced = dd.reduce((acc, item) => {

                      if(key == 'cable'){
                        acc.materialcost = acc.materialcost + parseFloat(item.duct_materialcost);
                        acc.labourcost = acc.labourcost + parseFloat(item.duct_labourcost);
                        acc.total = acc.total + parseFloat(item.total);
                        acc.volume = acc.volume + parseFloat(item.duct_volume);
                        acc.total_cost = acc.total_cost + parseFloat(item.total_cost);
                      }else{

                      acc.materialcost = acc.materialcost + parseFloat(item.materialcost);
                      acc.labourcost = acc.labourcost + parseFloat(item.labourcost);
                      acc.total = acc.total + parseFloat(item.total);
                      acc.volume = acc.volume + parseFloat(item.volume);
                      acc.total_cost = acc.total_cost + parseFloat(item.total_cost);
                      }
                      return acc;
                    }, {
                      materialcost: 0,
                      labourcost: 0,
                      total: 0,
                      volume: 0,
                      total_cost: 0
                    })
                   return (
                    <>
                
                      return <tr>
                      <td className='text-xs'>{item.split('_').join(' ').toUpperCase()}</td>
                      <td>{commarize(reduced.materialcost)} €</td>
                      <td>{commarize(reduced.labourcost)} €</td>
                      <td>{commarize(reduced.volume)} €</td>
                      <td>{commarize(reduced.total_cost)} €</td>
                    </tr>
                     
                    
                    </>
                  )
                })
                }
              </tbody>
            </Table>
          </>
        ))
      }
    </>
  )
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
