import { ActionIcon, Card, Input, LoadingOverlay, SegmentedControl, Table } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import { IconRefresh, IconSettings } from '@tabler/icons';
import { IconPdf } from '@tabler/icons-react';
import { jsPDF } from "jspdf";
import { useEffect, useState } from 'preact/hooks';
import { getCostInfoByDistrictId } from '../../../../api';
import { openDrawer } from '../../../../providers/DrawerProvider';
import { costInfoData, costInputParams, dropvalue, regsionListSignal } from '../../../../signals';
import { commarize } from '../../../../utils/convertor';
import { useTranslation } from "react-i18next";



export const generatePDF = (data, fileName) => {
  const doc = new jsPDF();

  // add title of filename
  doc.text(`Kosteninformationen von ${fileName}`, 10, 10);



  const categories = ['distribution', 'feeder', 'primary'];

  let startY = 30;
  for (let category of categories) {
    const cableHeaders = [['Cable Type', 'Material Cost', 'Labour Cost', 'Total', 'Volume', 'Total Cost']];
    const cableData = data.cables[category].map(item => Object.values(item)).map(item => {
      return item.map(item => commarize(item))
    })

    doc.text(`Cables - ${category}`, 10, startY);
    doc.autoTable({
      head: cableHeaders,
      body: cableData,
      startY: startY + 5
    });

    const ductHeaders = [['Duct Type', 'Material Cost', 'Labour Cost', 'Volume', 'Total Cost']];
    const ductData = data.duct[category].map(item => Object.values(item)).map(item => {
      return item.map(item => commarize(item))
    })
    startY = doc.lastAutoTable.finalY + 10;
    doc.text(`Ducts - ${category}`, 10, startY);
    doc.autoTable({
      head: ductHeaders,
      body: ductData,
      startY: startY + 5
    });

    startY = doc.lastAutoTable.finalY + 10;
  }

  // const activationHeaders = [['Building Count', '1 to 3 Buildings', 'Building Connections 1 to 3', 'Building Per Connection Cost 1 to 3', 'Total Cost Building Connections 1 to 3', 'Building Count 3 Plus', 'Building Connections 3 Plus', 'Building Per Connection Cost 3 Plus', 'Total Cost Building Connections 3 Plus', 'Total Homes Count', 'Homes Count 1 to 3', 'Home Count Connections 1 to 3', 'Home Count Per Connection Cost 1 to 3', 'Total Cost Home Count Connections 1 to 3', 'Home Count 3 Plus', 'Home Count Connections 3 Plus', 'Home Count Per Connection Cost 3 Plus', 'Total Cost Home Count Connections 3 Plus', 'Total Cost']];
  // const activationData = [Object.values(data.homeActivation)];
  // startY = doc.lastAutoTable.finalY + 10;
  // doc.text(`Home Activation`, 10, startY);
  // doc.autoTable({
  //   head: activationHeaders,
  //   body: activationData,
  //   startY: startY + 5
  // });

  const activationHeaders = [['key', 'value']];
  const activationData = Object.entries(data.homeActivation).map(item => [item[0].split('_').join(' ').toUpperCase(), commarize(item[1])])

  startY = doc.lastAutoTable.finalY + 10;
  doc.text(`Home Activation`, 10, startY);
  doc.autoTable({
    head: activationHeaders,
    body: activationData,
    startY: startY + 5
  });




  doc.save(`${fileName}-${new Date().toISOString()}-kalkulation.pdf`);
};

export default () => {
  const [data, setData] = useState(null); // as costInfoSampleData
  const [loading, setLoading] = useState(false);
  const [ags, setAgs] = useState('');
  const {t} = useTranslation()

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


  return (
    <>
      <Card className="flex p-2 m-2 flex-grow relative">
        
        <LoadingOverlay visible={loading} />

        <p className="flex-grow flex-1 font-thin text-neutral-700 text-lg">
          {t('Cost Info')}
        </p>

        <div className='flex'>
          <ActionIcon onClick={() => {
            generatePDF(data, regsionListSignal.value.find(tile => tile.ags === ags).name)
          }}>
            <IconPdf />
          </ActionIcon>
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
              </Card>
  
      <hr />
      {data && <CostInfoModalContent data={data} />}
    </>
  )
}





export const CostInfoModalContent = ({ data }) => {
   const {t}=useTranslation()
  const [segmentedControl, setSegmentedControl] = useState('cable')
  const [segmentedControl2, setSegmentedControl2] = useState('home')

  return (
    <div className='flex'>
      <div className='flex flex-col'>
      <SegmentedControl
        className="mb-4"
        data={[
          { label: t('Home'), value: 'home' },
          { label: t('Business'), value: 'business' },
        ]}
        fullWidth
        color="brand"
        onChange={(value) => {
          setSegmentedControl2(value)
        }}
        value={segmentedControl2}
      />
        <HomeActivationTable data={data.homeActivation} />
      </div>
      <div className='flex flex-col flex-1'>
      <SegmentedControl
        className="mb-4"
        data={[
          { label: t('Cables'), value: 'cable' },
          { label: t('Ducts'), value: 'duct' },
        ]}
        fullWidth
        color="brand"
        onChange={(value) => {
          setSegmentedControl(value)
        }}
        value={segmentedControl}
      />
        {
          segmentedControl === 'cable' ?
            <CableTable data={data.cables} />
            : segmentedControl === 'duct' ?
              <DuctTable data={data.duct} />
                : null
        }
      </div>

    </div>
  )
}


export const HomeActivationTable = ({ data }) => {
 const {t}=useTranslation()
  return (
    <Card className='m-2'>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full overflow-hidden">
            <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table striped className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>

                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      {t('Type')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      {t('Value')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    Object.keys(data).map((key, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{t(key.split('_').join(' ').toUpperCase())}</div>
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
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Card >
  )
}



export const DuctTable = ({ data }) => {
  const {t}=useTranslation()
  const sections = Object.keys(data);

  return (
    
    
    <div className="overflow-x-auto flex flex-col flex-1 flex-grow">
      {sections.map(section => (
          <div className='flex flex-1'>
        <Card key={section} className='m-2 flex-[2]'>
          <h2 className="text-md font-semibold mt-4 m-1 text-sky-700">{section.split('_').join(' ').toUpperCase()}</h2>
          <hr />
          <div className=" overflow-x-auto">
            <div className="py-2 px-1 align-middle inline-block min-w-full overflow-hidden">
              <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table striped className="min-w-full divide-y bg-white divide-gray-200">
                  <thead className="justify-between">
                    <tr>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Duct Type')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Material Cost')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Labour Cost')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Volume')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Total Cost')}</th>
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
                </Table>
              </div>
            </div>
          </div>
        </Card>
        <Card className='flex flex-1 flex-grow m-2'>
      Pie Chart
    </Card>
    </div>
      ))}
   
    </div>
  );
};


export const CableTable = ({ data }) => {
  const sections = Object.keys(data);
  const {t} = useTranslation()

  return (
    <div className="overflow-x-auto flex flex-col flex-1 flex-grow">

      {sections.map(section => (
       <div className='flex flex-1'>
       <Card key={section} className='m-2 flex-[2]'>
          <h2 className="text-md font-semibold mt-4 m-1 text-sky-700">{t(section.split('_').join(' ').toUpperCase())}</h2>
          <hr />
          <div className=" overflow-x-auto">
            <div className="align-middle inline-block min-w-full overflow-hidden">
              <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table striped className="min-w-full divide-y bg-white divide-gray-200">
                  <thead className="justify-between">
                    <tr>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Cable Type')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Material Cost')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Labour Cost')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Total')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Volume')}</th>
                      <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">{t('Total Cost')}</th>
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
                </Table>
              </div>
            </div>
          </div>
        </Card>
        <Card className='flex flex-1 flex-grow m-2'>
      Pie Chart
    </Card>
        </div>
      ))
      }
    </div >
  );
};


export const CostInfoSettings = () => {
  const [data, setData] = useState({});
  const {t}=useTranslation()
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