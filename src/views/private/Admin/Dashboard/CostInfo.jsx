import { ActionIcon, Badge, Card, Divider, Input, LoadingOverlay, SegmentedControl, Table, Tabs, Title } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import { IconRefresh, IconSettings } from '@tabler/icons';
import { IconDownload, IconMessage, IconPdf, IconPhoto } from '@tabler/icons-react';
import { jsPDF } from "jspdf";
import { useEffect, useState } from 'preact/hooks';
import { getCostInfoByDistrictId } from '../../../../api';
import { openDrawer } from '../../../../providers/DrawerProvider';
import { costInfoData, costInputParams, dropvalue, regsionListSignal } from '../../../../signals';
import { commarize } from '../../../../utils/convertor';
import { useTranslation } from "react-i18next";
import Icons from '../../../../layout/icons';



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
  const { t } = useTranslation()

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
    <Divider />
      <Card className="flex p-2 m-2 flex-grow relative">

        <LoadingOverlay visible={loading} />

        <p className="flex-grow flex-1 font-thin text-neutral-700 text-lg">
          {t('COST CENTER')} , €
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
              <ActionIcon onClick={() => {
                generatePDF(data, regsionListSignal.value.find(tile => tile.ags === ags).name)
              }}>
                <IconDownload />
              </ActionIcon>

        </div>
      </Card>
     

      {data && <CostInfoModalContent data={data} />}
    </>
  )
}





export const CostInfoModalContent = ({ data }) => {
  const { t } = useTranslation()
  const [segmentedControl, setSegmentedControl] = useState('cable')
  const [segmentedControl2, setSegmentedControl2] = useState('home')

  return (
    <div className='flex'>
      <div className='flex flex-col w-1/3'>
        <Tabs  defaultValue="gallery" 
        className='flex flex-col flex-grow'
          styles={{
            tab : {
              fontSize : '18px',
              '&[data-active]': {
                borderBottom : '5px solid #0E76BB',
                color : '#0E76BB'
              }
            }
          }}
        classNames={{
          tabsList :  'mx-2 -mb-2 z-50',
          panel : 'flex-grow',
        }}>
          <Tabs.List grow>
            <Tabs.Tab value="gallery" icon={<Icons.HomeBordered />}>Home</Tabs.Tab>
            <Tabs.Tab value="messages" icon={<Icons.BuildingsBordered  />}>Business</Tabs.Tab>

          </Tabs.List>

          <Tabs.Panel value="gallery" >
            <HomeActivationTable data={data.homeActivation} />
          </Tabs.Panel>

          <Tabs.Panel value="messages">
            <HomeActivationTable data={data.homeActivation} business />
          </Tabs.Panel>


        </Tabs>

      </div>
      <div className='flex flex-col flex-1'>
        <Tabs  
        defaultValue="gallery" 
        className='flex flex-col flex-grow'
          styles={{
            tab : {
              fontSize : '18px',
              '&[data-active]': {
                borderBottom : '5px solid #0E76BB',
                color : '#0E76BB',
                
              }
            }
          }}
        classNames={{
          tabsList :  'mx-2 -mb-2 z-50 w-2/3',
          tab: {
            '&[data-active]' : 'bg-red-500'
          },
          panel : 'flex-grow',
        }}
        >
          <Tabs.List grow>
            <Tabs.Tab value="gallery" icon={<Icons.IconCablesBordered  />}>Cables Costs, €</Tabs.Tab>
            <Tabs.Tab value="messages" icon={<Icons.IconDuctsBordered  />}>Ducts Costs, €</Tabs.Tab>

          </Tabs.List>

          <Tabs.Panel value="gallery" >
            <CableTable data={data.cables} />
          </Tabs.Panel>

          <Tabs.Panel value="messages">
            <DuctTable data={data.duct} />
          </Tabs.Panel>


        </Tabs>

      </div>

    </div>
  )
}

const ICONS_COLORS = ['text-blue-500', 'text-red-500', 'text-emerald-500', 'text-yellow-500', 'text-purple-500', 'text-pink-500', 'text-indigo-500', 'text-gray-500']

export const HomeActivationTable = ({ data,business=false }) => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col flex-grow'>
    <Card className='m-2'>
      <div className='flex justify-between items-center'>

    <Title order={4}>
        {business ? t('BUSINESS ACTIVATION') : t('HOME ACTIVATION')}
    </Title>
    <Badge variant='filled' color='gray' className='bg-gray-100' size='lg'>
      <p className='font-thin text-neutral-700'> Cost, €<b className='font-bold text-base'> 286k</b></p>
    </Badge>
      </div>
    <br />
    <hr/>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full overflow-hidden">
            <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>

                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      {t('Activation Types')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      {t('Value')}, €
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    Object.keys(data)
                    .map((key, index) => {
                      if(!business && key.toLowerCase().includes('building')) return null;
                      if(business && !key.toLowerCase().includes('building')) return null;
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-xs text-gray-900">{t(key.split('_').join(' ').toUpperCase())}</div>
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
    <Card className='m-2 flex-grow'>

    </Card>
    </div>
  )
}



export const DuctTable = ({ data }) => {
  const { t } = useTranslation()
  const sections = Object.keys(data);

  return (


    <div className="overflow-x-auto flex flex-col flex-1 flex-grow">
      {sections.map((section,index) => (
        <div className='flex flex-1' key={index}>
          <Card  className='m-2 w-2/3 min-h-[250px]'>
          <div className='flex items-center'><p className={
            `${ICONS_COLORS[index % ICONS_COLORS.length]} text-2xl`
          }><Icons.IconDucts/></p> <Title ml={10} order={4}>{section.split('_').join(' ').toUpperCase()}</Title> </div> 
           
            <br />
            <div className=" overflow-x-auto">
             
                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <Table cellPadding={1} className="min-w-full divide-y bg-white divide-gray-200">
                    <thead className="justify-between">
                      <tr>
                        <th >{t('Duct Type')}</th>
                        <th >{t('Material Cost')}</th>
                        <th >{t('Labour Cost')}</th>
                        <th >{t('Volume')}</th>
                        <th >{t('Total Cost')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data[section].map((row, index) => (
                        <tr key={index} >
                          <td >{row.duct_type}</td>
                          <td >{row.duct_materialcost}</td>
                          <td >{row.duct_labourcost}</td>
                          <td >{commarize(row.duct_volume)}</td>
                          <td >{commarize(row.total_cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
  const { t } = useTranslation()

  return (
    <div className="overflow-x-auto flex flex-col flex-1 flex-grow">

      {sections.map((section,index) => (
        <div className='flex flex-1' key={section}>
          <Card  className='m-2 w-2/3 min-h-[250px]'>
           <div className='flex items-center'><p className={
             `${ICONS_COLORS[index % ICONS_COLORS.length]} text-2xl`
          }><Icons.IconCables/></p> <Title ml={10} order={4}>{section.split('_').join(' ').toUpperCase()}</Title> </div>

            <br />
            <div className=" overflow-x-auto">
              <div className="align-middle inline-block min-w-full overflow-hidden">
                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <Table className="min-w-full divide-y bg-white divide-gray-200">
                    <thead className="justify-between">
                      <tr>
                        <th>{t('Cable Type')}</th>
                        <th>{t('Material Cost')}</th>
                        <th>{t('Labour Cost')}</th>
                        <th>{t('Total')}</th>
                        <th>{t('Volume')}</th>
                        <th>{t('Total Cost')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data[section].map((row, index) => (
                        <tr key={index} >
                          <td >{row.cable_type}</td>
                          <td >{row.materialcost}</td>
                          <td >{row.labourcost}</td>
                          <td >{row.total}</td>
                          <td >{commarize(row.volume)}</td>
                          <td >{commarize(row.total_cost)}</td>
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
  const { t } = useTranslation()
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