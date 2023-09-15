import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Divider,
  Input,
  LoadingOverlay,
  Progress,
  RingProgress,
  SegmentedControl,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import { IconRefresh, IconSettings } from "@tabler/icons";
import {
  IconDownload,
  IconMessage,
  IconPdf,
  IconPhoto,
} from "@tabler/icons-react";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "preact/hooks";
import { getCostInfoByDistrictId } from "../../../../api";
import { openDrawer } from "../../../../providers/DrawerProvider";
import {
  costInfoData,
  costInputParams,
  dropvalue,
  regsionListSignal,
} from "../../../../signals";
import { commarize } from "../../../../utils/convertor";
import { useTranslation } from "react-i18next";
import Icons from "../../../../layout/icons";

export const generatePDF = (data, fileName) => {
  const doc = new jsPDF();

  // add title of filename
  doc.text(`Kosteninformationen von ${fileName}`, 10, 10);

  const categories = ["distribution", "feeder", "primary"];

  let startY = 30;
  for (let category of categories) {
    const cableHeaders = [
      [
        "Cable Type",
        "Material Cost",
        "Labour Cost",
        "Total",
        "Volume",
        "Total Cost",
      ],
    ];
    const cableData = data.cables[category]
      .map((item) => Object.values(item))
      .map((item) => {
        return item.map((item) => commarize(item));
      });

    doc.text(`Cables - ${category}`, 10, startY);
    doc.autoTable({
      head: cableHeaders,
      body: cableData,
      startY: startY + 5,
    });

    const ductHeaders = [
      ["Duct Type", "Material Cost", "Labour Cost", "Volume", "Total Cost"],
    ];
    const ductData = data.duct[category]
      .map((item) => Object.values(item))
      .map((item) => {
        return item.map((item) => commarize(item));
      });
    startY = doc.lastAutoTable.finalY + 10;
    doc.text(`Ducts - ${category}`, 10, startY);
    doc.autoTable({
      head: ductHeaders,
      body: ductData,
      startY: startY + 5,
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

  const activationHeaders = [["key", "value"]];
  const activationData = Object.entries(data.homeActivation).map((item) => [
    item[0].split("_").join(" ").toUpperCase(),
    commarize(item[1]),
  ]);

  startY = doc.lastAutoTable.finalY + 10;
  doc.text(`Home Activation`, 10, startY);
  doc.autoTable({
    head: activationHeaders,
    body: activationData,
    startY: startY + 5,
  });

  doc.save(`${fileName}-${new Date().toISOString()}-kalkulation.pdf`);
};

export default () => {
  const [data, setData] = useState(null); // as costInfoSampleData
  const [loading, setLoading] = useState(false);
  const [ags, setAgs] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    dropvalue.subscribe(setAgs);
  }, []);

  useDidUpdate(() => {
    if (ags) {
      getCost();
      costInfoData.subscribe(setData);
    }
  }, [ags]);


  // ============================== Commenting this line so we get the default calculation ==============================
  function updateStateFromApiResponse(currentState, apiResponse) {
    // Extracting the data from the API response
    const cablesData = apiResponse.cables;
    const ductData = apiResponse.duct;
    const homeActivationData = apiResponse.homeActivation;

    // Updating the cables data
    for (let cableType in cablesData) {
        if (currentState.cables[cableType]) {
            currentState.cables[cableType].materialCost = cablesData[cableType][0].materialcost;
            currentState.cables[cableType].labourCost = cablesData[cableType][0].labourcost;
        }
    }

    // Updating the duct data
    for (let ductType in ductData) {
        if (currentState.duct[ductType]) {
            currentState.duct[ductType].materialCost = ductData[ductType][0].duct_materialcost;
            currentState.duct[ductType].labourCost = ductData[ductType][0].duct_labourcost;
        }
    }

    // Updating the home activation data
    currentState.homeActivation.building.lowerMaterialCost = homeActivationData.building_per_connection_cost_1_to_3;
    currentState.homeActivation.building.lowerLabourCost = homeActivationData.building_per_connection_cost_1_to_3;
    currentState.homeActivation.building.greaterMaterialCost = homeActivationData.building_per_connection_cost_3_plus;
    currentState.homeActivation.building.greaterLabourCost = homeActivationData.building_per_connection_cost_3_plus;

    currentState.homeActivation.home.lowerMaterialCost = homeActivationData.homecount_per_connection_cost_1_to_3;
    currentState.homeActivation.home.lowerLabourCost = homeActivationData.homecount_per_connection_cost_1_to_3;
    currentState.homeActivation.home.greaterMaterialCost = homeActivationData.homecount_per_connection_cost_3_plus;
    currentState.homeActivation.home.greaterLabourCost = homeActivationData.homecount_per_connection_cost_3_plus;

    return currentState;
}

  // ====================================================================================================================





  const getCost = () => {
    setLoading(true);
    const URLSearchParam = new URLSearchParams();
    // ============================== Commenting this line so we get the default calculation ==============================

    // URLSearchParam.append('costs', JSON.stringify(costInputParams.value));

    // ====================================================================================================================
    
    getCostInfoByDistrictId(ags, URLSearchParam)
      .then((res) => {
        setLoading(false);
        const updatedState = updateStateFromApiResponse({ ...costInputParams.value }, res.data);
        costInputParams.value = updatedState;
        costInfoData.value = res.data;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <Card className="flex p-2 max-lg:py-0 m-2 max-lg:my-0 flex-grow relative max-lg:h-[2vh]">
        <LoadingOverlay visible={loading} />

        <p className="flex-grow flex-1 font-thin text-neutral-700 text-lg lg:text-[0.8vw]">
          {t("COST CENTER")} , €
        </p>

        <div className="flex">
          <ActionIcon
            size={15}
            onClick={() => {
              getCost();
            }}
          >
            <IconRefresh />
          </ActionIcon>

          <ActionIcon
            size={15}
            onClick={() => {
              openDrawer({
                children: <CostInfoSettings />,
                title: "Cost Info Settings",
              });
            }}
          >
            <IconSettings />
          </ActionIcon>
          <ActionIcon
            size={15}
            onClick={() => {
              generatePDF(
                data,
                regsionListSignal.value.find((tile) => tile.ags === ags).name
              );
            }}
          >
            <IconDownload />
          </ActionIcon>
        </div>
      </Card>

      {data && (
        <CostInfoModalContent
          data={data}
          showtab={true}
          showtab2={true}
          flexdirection={"flex-col"}
          responsive={"md:w-1/3"}
        />
      )}
    </>
  );
};

export const CostInfoModalContent = ({
  data,
  showtab,
  showtab2,
  flexdirection,
  responsive,
}) => {
  const { t } = useTranslation();
  const [segmentedControl, setSegmentedControl] = useState("cable");
  const [segmentedControl2, setSegmentedControl2] = useState("home");

  return (
    <div className="flex flex-col md:flex-row">
      {showtab && (
        <div className={`flex ${flexdirection} ${responsive} w-full`}>
          <Tabs
            defaultValue="gallery"
            className="flex flex-col flex-grow"
            styles={{
              tab: {
                fontSize: "18px",
                "&[data-active]": {
                  borderBottom: "5px solid #0E76BB",
                  color: "#0E76BB",
                },
              },
              panel: {
                display: "flex",
              },
            }}
            classNames={{
              tabsList: "mx-2 -mb-2 z-50",
              panel: "flex-grow flex-col ",
              root: "flex flex-col flex-grow",
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab
                value="gallery"
                className="max-lg:text-xs"
                icon={<Icons.HomeBordered />}
              >
                Home
              </Tabs.Tab>
              <Tabs.Tab
                value="messages"
                className="max-lg:text-xs"
                icon={<Icons.BuildingsBordered />}
              >
                Business
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
              <HomeActivationTable data={data.homeActivation} />
            </Tabs.Panel>

            <Tabs.Panel value="messages">
              <HomeActivationTable data={data.homeActivation} business />
            </Tabs.Panel>
          </Tabs>
        </div>
      )}
      {showtab2 && (
        <div className="flex flex-col flex-1 ">
          <Tabs
            defaultValue="gallery"
            className="flex flex-col flex-grow"
            styles={{
              tab: {
                fontSize: "18px",
                "&[data-active]": {
                  borderBottom: "5px solid #0E76BB",
                  color: "#0E76BB",
                },
              },
            }}
            classNames={{
              tabsList: "mx-2 -mb-2 z-50 w-2/3",
              tab: {
                "&[data-active]": "bg-red-500",
              },
              panel: "flex-grow",
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab
                value="gallery"
                className="max-lg:text-xs"
                icon={<Icons.IconCablesBordered />}
              >
                Cables Costs, €
              </Tabs.Tab>
              <Tabs.Tab
                value="messages"
                className="max-lg:text-xs"
                icon={<Icons.IconDuctsBordered />}
              >
                Ducts Costs, €
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
              <CableTable data={data.cables} />
            </Tabs.Panel>

            <Tabs.Panel value="messages">
              <DuctTable data={data.duct} />
            </Tabs.Panel>
          </Tabs>
        </div>
      )}
    </div>
  );
};

const ICONS_COLORS = [
  "text-blue-500",
  "text-red-500",
  "text-green-500",
  "text-yellow-500",
  "text-purple-500",
  "text-pink-500",
  "text-indigo-500",
  "text-gray-500",
];

export const HomeActivationTable = ({ data, business = false }) => {
  const { t } = useTranslation();
  if (!data)
    return (
      <Card className="m-2 flex flex-grow flex-1 ">
        <Text color="red" className="text-center flex-grow">
          {t("NO DATA")}
        </Text>
      </Card>
    );
  return (
    <div className="flex flex-col flex-1 flex-grow ">
      <Card className="m-2">
        <div className="flex justify-between items-center">
          <Title className="max-lg:text-xs" order={4}>
            {business ? t("BUSINESS ACTIVATION") : t("HOME ACTIVATION")}
          </Title>
          <Badge
            variant="filled"
            color="gray"
            className="bg-gray-100 max-lg:w-[7vw]"
            size="20"
          >
            <p className="font-thin  text-neutral-700 ">
              {" "}
              Cost, €
              <b className="font-semibold text-base max-lg:text-xs ">
                {" "}
                {commarize(
                  CalculateActivationCostByType(
                    data,
                    business ? "building" : "home"
                  )
                )}
              </b>
            </p>
          </Badge>
        </div>
        <br />
        <hr />
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full overflow-hidden">
              <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="">
                      <th
                        scope="col"
                        className="px-6 py-3   font-medium tracking-wide text-left text-gray-500 uppercase"
                      >
                       <p className="max-lg:text-xs"> {t("Activation Types")}</p>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                       <p className="max-lg:text-xs"> {t("Value")}, €  </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.keys(data)
                      .filter((key) => key.toLowerCase() !== "total_cost")
                      .map((key, index) => {
                        if (!business && key.toLowerCase().includes("building"))
                          return null;
                        if (business && !key.toLowerCase().includes("building"))
                          return null;
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4  whitespace-nowrap">
                              <div className="text-xs max-lg:text-[0.8vw] text-gray-900">
                                {t(key.split("_").join(" ").toUpperCase())}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {
                                <div className="text-sm max-lg:text-[0.8vw] text-gray-900">
                                  {commarize(data[key])}
                                </div>
                              }
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className="m-2 flex-grow flex flex-col">
        <Title className="max-lg:text-xs " order={4}>{t("Activation Cost by Type")}</Title>
        <br />
        <hr />
        <br />
        <div className="flex justify-around">
          <div className="flex items-center justify-center">
            <span className=" max-lg:text-xs  mr-4">{t("HOME")}</span>
            <span className="p-2 shadow-md rounded-full">
              <div className="bg-brand w-8 max-lg:w-5 h-2 rounded-full"></div>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className=" max-lg:text-xs mr-4">{t("BUSINESS")}</span>
            <span className="p-2 shadow-md rounded-full">
              <div className="bg-brand-dark w-8 max-lg:w-5 h-2 rounded-full"></div>
            </span>
          </div>
        </div>

        <div className="border-l-[1px] border-solid border-gray-800 px-1 py-4 my-auto">
          <div className="flex items-center">
            <Progress
              color="brand"
              className="w-3/4 max-lg:h-4"
              value={
                (CalculateActivationCostByType(data, "home") /
                  data.total_cost) *
                100
              }
              size="xl"
              h={35}
            />
            <span className="w-1/4 justify-center max-lg:text-xs  text-center text-brand text-lg font-bold">
              {commarize(CalculateActivationCostByType(data, "home"))}
            </span>
          </div>
          <div className="flex items-center">
            <Progress
              value={
                (CalculateActivationCostByType(data, "building") /
                  data.total_cost) *
                100
              }
              h={35}
              className="w-3/4 max-lg:h-4"
              size="xl"
              mt={20}
              classNames={{
                bar: "bg-brand-dark",
              }}
            />
            <span className="w-1/4 justify-center text-center max-lg:text-xs  text-brand-dark text-lg font-bold">
              {commarize(CalculateActivationCostByType(data, "building"))}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const CalculateActivationCostByType = (data, type) => {
  return Object.keys(data)
    .filter(
      (key) =>
        key.toLowerCase().includes(type.toLowerCase()) &&
        key.toLowerCase().includes("cost")
    )
    .reduce((acc, key) => acc + data[key], 0);
};

export const DuctTable = ({ data }) => {
  const { t } = useTranslation();
  const sections = Object.keys(data);

  return (
    <div className="overflow-x-auto flex flex-col flex-1 flex-grow">
      {sections.map((section, index) => {
        let sectionColor = ICONS_COLORS[index % ICONS_COLORS.length];
        let GrandTotal = data[section].reduce(
          (acc, key) => acc + key.total_cost,
          0
        );
        return (
          <div className="flex flex-1" key={index}>
            <Card className="m-2 md:w-6/12 xl:w-6/12 w-full min-h-[250px]">
              <div className="flex items-center">
                <p
                  className={`${
                    ICONS_COLORS[index % ICONS_COLORS.length]
                  } text-2xl`}
                >
                  <Icons.IconDucts />
                </p>{" "}
                <Title className="max-lg:text-xs" ml={10} order={4}>
                  {section.split("_").join(" ").toUpperCase()}
                </Title>{" "}
              </div>

              <br />
              <div className=" overflow-x-auto">
                <div className="overflow-x-scroll border-b border-gray-200 sm:rounded-lg">
                  <Table
                    cellPadding={1}
                    className="min-w-full divide-y bg-white divide-gray-200"
                  >
                    <thead className="justify-between">
                      <tr>
                        <th>
                          <p className="max-lg:text-xs">{t("Duct Type")}</p>
                        </th>
                        <th className="md:visible invisible">
                          <p className="max-lg:text-xs">{t("Material Cost")}</p>
                        </th>
                        <th className="md:visible invisible">
                          <p className="max-lg:text-xs">{t("Labour Cost")}</p>
                        </th>
                        <th>
                          <p className="max-lg:text-xs">{t("Volume")}</p>
                        </th>
                        <th>
                          <p className="max-lg:text-xs">{t("Total Cost")}</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data[section].map((row, index) => (
                        <tr key={index}>
                          <td> <p className="max-lg:text-[0.8vw]">   {row.duct_type}</p></td>
                          <td className="md:visible  invisible">
                             <p className="max-lg:text-[0.8vw]">   {row.duct_materialcost}</p>
                          </td>
                          <td className="md:visible  invisible">
                             <p className="max-lg:text-[0.8vw]">   {row.duct_labourcost}</p>
                          </td>
                          <td> <p className="max-lg:text-[0.8vw]">   {commarize(row.duct_volume)}</p></td>
                          <td> <p className="max-lg:text-[0.8vw]">   {commarize(row.total_cost)}</p></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Card>
            <Card className="md:flex flex-col flex-1 flex-grow m-2 items-center md:w-14 xl:w-14 justify-center hidden">
              <Title order={4}>
                {section.charAt(0).toUpperCase() + section.slice(1)} Cable By
                Type
              </Title>
              <Divider />
              <div className="flex">
                <div className="flex flex-col flex-grow items-center py-6">
                  {data[section].map((row, index) => {
                    let color = sectionColor.split("-")[1];
                    let initialshade = 8;
                    let shade = initialshade - index - index;
                    color = `${color}.${shade}`;
                    return (
                      <div className="flex items-center flex-grow" key={index}>
                        <Badge
                          variant="filled"
                          color={color}
                          h={5}
                          w={5}
                          mr={2}
                        />
                        <p className="text-xs">
                          {row.duct_type.replace("(Rohrverband)", "")}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <RingProgress
                  classNames={{
                    root: "p-0",
                    label: "p-0",
                  }}
                  className=""
                  thickness={40}
                  size={180}
                  sections={data[section].map((row, index) => {
                    let color = sectionColor.split("-")[1];
                    let initialshade = 8;
                    let shade = initialshade - index - index;
                    color = `${color}.${shade}`;
                    return {
                      value: (row.total_cost / GrandTotal) * 100,
                      color: color,
                    };
                  })}
                />
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const CableTable = ({ data }) => {
  const sections = Object.keys(data);
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden flex flex-col flex-1 flex-grow">
      {sections.map((section, index) => {
        let sectionColor = ICONS_COLORS[index % ICONS_COLORS.length];
        let GrandTotal = data[section].reduce(
          (acc, key) => acc + key.total_cost,
          0
        );
        return (
          <div className="flex flex-1" key={section}>
            <Card className="m-2 md:w-6/12 xl:w-6/12 w-full min-h-[250px]">
              <div className="flex items-center">
                <p
                  className={`${
                    ICONS_COLORS[index % ICONS_COLORS.length]
                  } text-2xl max-lg:text-xs`}
                >
                  <Icons.IconCables />
                </p>{" "}
                <Title className="max-lg:text-xs" ml={10} order={4}>
                  {section.split("_").join(" ").toUpperCase()}
                </Title>{" "}
              </div>

              <br />
              <div className=" overflow-x-auto">
                <div className="align-middle inline-block min-w-full overflow-hidden">
                  <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <Table className="min-w-full divide-y bg-white divide-gray-200">
                      <thead className="justify-between ">
                        <tr>
                          <th>
                            <p className="max-lg:text-xs">
                              {" "}
                              {t("Cable Type")}{" "}
                            </p>
                          </th>
                          <th className="md:visible invisible ">
                            <p className="max-lg:text-xs">
                              {t("Material Cost")}
                            </p>
                          </th>
                          <th className="md:visible invisible">
                            <p className="max-lg:text-xs">
                              {t("Labour Cost")}
                            </p>
                          </th>
                          <th className="md:visible invisible">
                            <p className="max-lg:text-xs">{t("Total")}</p>
                          </th>
                          <th>
                            <p className="max-lg:text-xs">{t("Volume")}</p>
                          </th>
                          <th>
                            <p className="max-lg:text-xs">{t("Total Cost")}</p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data[section].map((row, index) => (
                          <tr key={index}>
                            <td>
                              <p className="max-lg:text-[0.8vw]">
                                {row.cable_type}
                              </p>
                            </td>
                            <td className=" md:visible   invisible">
                              <p className="max-lg:text-[0.8vw]">
                                {row.materialcost}
                              </p>
                            </td>
                            <td className="md:visible  invisible">
                              <p className="max-lg:text-[0.8vw]">
                                {" "}
                                {row.labourcost}
                              </p>
                            </td>
                            <td className="md:visible  invisible">
                              <p className="max-lg:text-[0.8vw]">
                                {row.total}
                              </p>
                            </td>
                            <td>
                              <p className="max-lg:text-[0.8vw]">
                                {commarize(row.volume)}
                              </p>
                            </td>
                            <td>
                              <p className="max-lg:text-[0.8vw]">
                                {commarize(row.total_cost)}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="md:flex flex-col flex-1 flex-grow m-2 items-center md:w-14 xl:w-14 justify-center hidden">
              <Title className="max-lg:text-xs" order={4}>
                {section.charAt(0).toUpperCase() + section.slice(1)} Cable By
                Type
              </Title>
              <Divider />
              <div className="flex">
                <div className="flex flex-col flex-grow items-center py-6">
                  {data[section].map((row, index) => {
                    let color = sectionColor.split("-")[1];
                    let initialshade = 8;
                    let shade = initialshade - index - index;
                    color = `${color}.${shade}`;
                    return (
                      <div className="flex items-center flex-grow" key={index}>
                        <Badge
                          variant="filled"
                          color={color}
                          h={5}
                          w={5}
                          mr={2}
                        />
                        <p className="text-xs">{row.cable_type}</p>
                      </div>
                    );
                  })}
                </div>

                <RingProgress
                  classNames={{
                    root: "p-0",
                    label: "p-0",
                  }}
                  className=""
                  thickness={40}
                  size={180}
                  sections={data[section].map((row, index) => {
                    let color = sectionColor.split("-")[1];
                    let initialshade = 8;
                    let shade = initialshade - index - index;
                    color = `${color}.${shade}`;
                    return {
                      value: (row.total_cost / GrandTotal) * 100,
                      color: color,
                    };
                  })}
                />
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const CostInfoSettings = () => {
  const [data, setData] = useState({});
  const { t } = useTranslation();
  useEffect(() => costInputParams.subscribe(setData), []);
  return (
    <form>
      <div className="my-2 flex tracking-wider font-bold items-center text-center text-sky-600">
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
          {data.cables &&
            Object.keys(data.cables).map((key) => (
              <tr>
                <td> {key.toUpperCase()}</td>
                <td>
                  <Input
                    type="number"
                    value={data.cables[key].materialCost}
                    onChange={(e) => {
                      data.cables[key].materialCost = parseFloat(
                        e.target.value
                      );
                      setData(data);
                    }}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={data.cables[key].labourCost}
                    onChange={(e) => {
                      data.cables[key].labourCost = parseFloat(e.target.value);
                      setData(data);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="my-2 flex tracking-wider font-bold items-center text-center text-sky-600">
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
          {data.duct &&
            Object.keys(data.duct).map((key) => (
              <tr>
                <td> {key.toUpperCase()}</td>
                <td>
                  <Input
                    type="number"
                    value={data.duct[key].materialCost}
                    onChange={(e) => {
                      data.duct[key].materialCost = e.target.value;
                      setData(data);
                    }}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={data.duct[key].labourCost}
                    onChange={(e) => {
                      data.duct[key].labourCost = e.target.value;
                      setData(data);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="my-2 flex tracking-wider font-bold items-center text-center text-sky-600">
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
          {data.homeActivation &&
            Object.keys(data.homeActivation).map((key) => (
              <tr>
                <td> {key.toUpperCase()}</td>
                <td>
                  <Input
                    type="number"
                    value={data.homeActivation[key].greaterMaterialCost}
                    onChange={(e) => {
                      data.homeActivation[key].materialCost = e.target.value;
                      setData(data);
                    }}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={data.homeActivation[key].greaterLabourCost}
                    onChange={(e) => {
                      data.homeActivation[key].labourCost = e.target.value;
                      setData(data);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="my-2 flex tracking-wider font-bold items-center text-center text-sky-600">
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
          {data.homeActivation &&
            Object.keys(data.homeActivation).map((key) => (
              <tr>
                <td> {key.toUpperCase()}</td>
                <td>
                  <Input
                    type="number"
                    value={data.homeActivation[key].lowerMaterialCost}
                    onChange={(e) => {
                      data.homeActivation[key].materialCost = e.target.value;
                      setData(data);
                    }}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={data.homeActivation[key].lowerLabourCost}
                    onChange={(e) => {
                      data.homeActivation[key].labourCost = e.target.value;
                      setData(data);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </form>
  );
};
