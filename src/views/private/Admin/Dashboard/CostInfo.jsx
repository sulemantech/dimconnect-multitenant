import { useEffect, useState } from 'preact/hooks';
import { ActionIcon, Loader, SegmentedControl, Table } from '@mantine/core';
import { Input } from '@mantine/core';
import { commarize } from '../../../../utils/convertor';
import { dropvalue, costInfoData, costInputParams } from '../../../../signals';
import { getCostInfoByDistrictId } from '../../../../api';
import appConfig from '../../../../config/appConfig';
import axios from 'axios';
import { openDrawer } from '../../../../providers/DrawerProvider';
import { IconRefresh, IconSettings } from '@tabler/icons';
import { useDidUpdate } from '@mantine/hooks';


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
  const [data, setData] = useState(null); // as costInfoSampleData
  const [loading, setLoading] = useState(false);
  const [ags, setAgs] = useState('');
  useEffect(() => {
    dropvalue.subscribe(setAgs)
  }, [])
  
  useDidUpdate(() => {
    if (ags) {
      getCost();
      costInfoData.subscribe(setData);
    }
  }, [ags])

  const getCost = () => {
    setLoading(true);
    const URLSearchParam = new URLSearchParams();
    URLSearchParam.append('costs', JSON.stringify(costInputParams.value));
    getCostInfoByDistrictId(ags, URLSearchParam)

      .then((res) => {

        setLoading(false);
        costInfoData.value = res.data;
      }).catch((err) => {
        setLoading(false);
        console.log(err);
      })
  }

  if (loading) {
    return <div className='flex justify-center h-full items-center'><Loader size='lg' /></div>
  }
  return (
    <>
      <div className="flex">

        <p className="flex-grow flex-1 font-thin text-neutral-700 text-lg">
          Cost Info
        </p>
        <div className='flex'>
          <ActionIcon
            onClick={() => {
              getCost();
            }}
          >
            <IconRefresh />


          </ActionIcon>

          <ActionIcon onClick={() => {
            openDrawer({
              children: <CostInfoSettings />,
              title: 'Cost Info Settings'
            })
          }}>
            <IconSettings />
          </ActionIcon>
        </div>
      </div>
      <hr />
      {data && <CostInfoModalContent data={data} />}
    </>
  )
}





export const CostInfoModalContent = ({ data }) => {
  
  const [segmentedControl, setSegmentedControl] = useState('homeActivation')

  return (
      <div>
          <SegmentedControl
              className="mb-4"
              data={[
                  { label: 'Home Activation', value: 'homeActivation' },
                  { label: 'Cables', value: 'cable' },
                  { label: 'Ducts', value: 'duct' },
              ]}
              fullWidth
              color="brand"
              onChange={(value) => {
                  setSegmentedControl(value)
              }}
              value={segmentedControl}
          />
          <div>
              {
                  segmentedControl === 'cable' ?
                      <CableTable data={data.cables} />
                      : segmentedControl === 'duct' ?
                          <DuctTable data={data.duct} />
                          : segmentedControl === 'homeActivation' ?
                              <HomeActivationTable data={data.homeActivation} />
                              : null
              }
          </div>

      </div>
  )
}


export const HomeActivationTable = ({ data }) => {

  return (
      <div>
          
          <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto">
                  <div className="py-2 align-middle inline-block min-w-full overflow-hidden sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                  <tr>

                                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                          Key
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                          Value
                                      </th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                  {
                                      Object.keys(data).map((key, index) => {
                                          return (
                                              <tr key={index}>
                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                      <div className="text-sm text-gray-900">{key.split('_').join(' ').toUpperCase()}</div>
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                      {

                                                          <div className="text-sm text-gray-900">{commarize(data[key])}</div>

                                                      }
                                                  </td>
                                              </tr>
                                          )
                                      })
                                  }
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div >
  )
}



export const DuctTable = ({ data }) => {
  const sections = Object.keys(data);

  return (
      <div className="overflow-x-auto">
          {sections.map(section => (
              <div key={section}>
                  <h2 className="text-md font-semibold mt-4 mb-2 text-sky-700">{section.split('_').join(' ').toUpperCase()}</h2>
                  <hr />
                  <div className=" overflow-x-auto">
                      <div className="py-2 px-1 align-middle inline-block min-w-full overflow-hidden shadow-md">
                          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="justify-between">
                                      <tr>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Duct Type</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Material Cost</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Labour Cost</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Volume</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Total Cost</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {data[section].map((row, index) => (
                                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">{row.duct_type}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">{row.duct_materialcost}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">{row.duct_labourcost}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs font-semibold text-gray-900">{commarize(row.duct_volume)}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs font-semibold text-gray-900">{commarize(row.total_cost)}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  );
};


export const CableTable = ({ data }) => {
  const sections = Object.keys(data);

  return (
      <div className="overflow-x-auto">
          
          {sections.map(section => (
              <div key={section}>
                  <h2 className="text-md font-semibold mt-4 mb-2 text-sky-700">{section.split('_').join(' ').toUpperCase()}</h2>
                  <hr />
                  <div className=" overflow-x-auto">
                      <div className="py-2 px-1 align-middle inline-block min-w-full overflow-hidden shadow-md">
                          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="justify-between">
                                      <tr>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Cable Type</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Material Cost</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Labour Cost</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Total</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Volume</th>
                                          <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Total Cost</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {data[section].map((row, index) => (
                                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">{row.cable_type}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">{row.materialcost}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">{row.labourcost}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">{row.total}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs font-semibold text-gray-900">{commarize(row.volume)}</td>
                                              <td className="px-2 py-4 whitespace-nowrap text-xs font-semibold text-gray-900">{commarize(row.total_cost)}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          ))
          }
      </div >
  );
};


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
                    data.cables[key].materialCost = parseFloat(e.target.value);
                    setData(data);
                  }} />
                </td>
                <td>
                  <Input type="number" value={data.cables[key].labourCost} onChange={(e) => {
                    data.cables[key].labourCost = parseFloat(e.target.value);
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