import { Accordion, Radio } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import { useState, useEffect } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@mantine/core";

import {
  DistrictPhaseLayersVisibility,
  DistrictPhaseVisibility,
  addressPointsStatusVisibility,
  legendContent,
  netzplanninglegend,
  visibility,
  netzplanning,
  photoVisibility,
  videoVisibility,
  BarrierState,
  roadandwaterstate,
  aerialViewVisibility,
  PRpropertiesVisibility,
  legendState,
} from "../../../../signals";
import { effect } from "@preact/signals";

export default ({
  noAddressPoint = false,
  noStatus = false,
  noNetzplanung = false,
  noBackground = false,
}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(JSON.parse(visibility.value) || {});
  }, [visibility.value]);
  const [netzplanningCheckbox, setnetzplanningCheckbox] = useState(
    netzplanning.value[10] &&
      netzplanning.value[5] &&
      netzplanning.value[6] &&
      addressPointsStatusVisibility.value[4]
  );
  const checkAll = (e) => {
    netzplanning.value = {
      10: e.target.checked,
      5: e.target.checked,
      6: e.target.checked,
    };
    const toggleVisibility = (index) => {
      data[Object.keys(data)[index]] = {
        ...data[Object.keys(data)[index]],
        visible: e.target.checked,
      };
    };

    toggleVisibility(1);
    toggleVisibility(6);
    toggleVisibility(10);
    visibility.value = JSON.stringify(data);

    setnetzplanningCheckbox(e.target.checked);
  };
  const { t } = useTranslation();
  const [value, setValue] = useState("Address Points");
  const [collapsed, setCollapsed] = useState(!noAddressPoint);
  useDidUpdate(() => {
    setTimeout(() => {
      if (value == null) setCollapsed(true);
    }, 1500);
  }, [value]);

  effect(() => {
    if (legendState.value === false) {
      setCollapsed(true);
    }
  }, [legendState.value]);

  useDidUpdate(() => {
    if (collapsed == false) setValue("");
  }, [collapsed]);

  if (collapsed)
    return (
      <div
        className="absolute -left-8 hover:scale-95 transition-all cursor-pointer bottom-24 justify-center rotate-90 font-bold text-lg max-2xl:text-sm tracking-wide  text-white bg-[#0092c3] shadow-2xl z-40 rounded-md p-2 "
        onClick={() => {
          legendState.value = true;
          setCollapsed(false);
        }}
      >
        {t("Legend")}
      </div>
    );

  return (
    <div className="relative text-xs max-2xl:text-[0.8vw] flex flex-col p-2 shadow-md rounded-md mt-2 bg-white overflow-scroll">
      <h6 className="mb-1">
        <b>{t("Legend")}</b>
      </h6>
      <hr className="mb-2" />
      <Accordion
        defaultValue={window.innerWidth > 768 ? "Background" : ""}
        className="text-xs max-2xl:text-[0.8vw]"
        onChange={(e) => {
          const params = new URLSearchParams(window.location.search);
          if (!params.get("statusPage")) {
            if (e !== "Status") {
              DistrictPhaseVisibility.value = false;
            } else {
              DistrictPhaseVisibility.value = true;
            }
            setValue(e);
          }
        }}
      >
        <NetzplanningLegend />
        {!noBackground && (
          <Accordion.Item
            value="Background"
            className="text-xs max-2xl:text-[0.8vw]"
          >
            <div className="flex flex-1 space-x-4 items-center">
              {/* <span className="mt-3 "></span> */}
              <Checkbox
                size="xs"
                checked={
                  aerialViewVisibility.value || PRpropertiesVisibility.value
                }
                onChange={(e) => {
                  if (e.target.checked === true) {
                    aerialViewVisibility.value = true;
                    PRpropertiesVisibility.value = false;
                  }
                  if (!e.target.checked) {
                    aerialViewVisibility.value = false;
                    PRpropertiesVisibility.value = false;
                  }
                }}
              />
              <Accordion.Control
                className="text-xs max-2xl:text-[0.8vw] last:p-0"
                value={"Background"}
              >
                Background
              </Accordion.Control>
            </div>
            <Accordion.Panel>
              <div>
                <Radio.Group
                  value={
                    // if both false then null
                    aerialViewVisibility.value && PRpropertiesVisibility.value
                      ? "Aerial View"
                      : aerialViewVisibility.value
                      ? "Aerial View"
                      : PRpropertiesVisibility.value
                      ? "RP Properties"
                      : null
                  }
                  onChange={(e) => {
                    console.log(
                      "values",
                      (aerialViewVisibility.value = e === "Aerial View"),
                      (PRpropertiesVisibility.value = e === "RP Properties")
                    );
                  }}
                >
                  <Radio
                    value="Aerial View"
                    size="xs"
                  >
                  Aerial View
                  </Radio>
                  <Radio
                    value="RP Properties"
                    size="xs"
                  >
                  </Radio>
                    RP Properties
                </Radio.Group>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}
        {!noAddressPoint && (
          <Accordion.Item
            value="Address Points"
            className="text-xs max-2xl:text-[0.8vw]"
          >
            <div className="flex flex-1 space-x-4 ">
              <span className="mt-3 ">
                <Checkbox
                  size="xs"
                  checked={[1, 2, 3, 5, 6].every(
                    (index) => addressPointsStatusVisibility.value[index]
                  )}
                  onChange={(e) => {
                    const indicesToToggle = [1, 2, 3, 4, 5, 6];
                    const updatedVisibility = {
                      ...addressPointsStatusVisibility.value,
                    };

                    indicesToToggle.forEach((index) => {
                      updatedVisibility[index] = e.target.checked;
                    });

                    addressPointsStatusVisibility.value = updatedVisibility;
                  }}
                />
              </span>
              <Accordion.Control
                className="text-xs max-2xl:text-[0.8vw] last:p-0"
                value={"Address Points"}
              >
                Address Points
              </Accordion.Control>
            </div>
            <Accordion.Panel>
              <div>
                {Object.entries(legendContent.value)?.map(([key, item]) => {
                  return (
                    <div
                      className="flex py-1 space-x-1 flex-row items-center cursor-pointer hover:bg-neutral-100"
                      onClick={() => {
                        addressPointsStatusVisibility.value = {
                          ...addressPointsStatusVisibility.value,
                          [item.code]:
                            !addressPointsStatusVisibility.value[item.code],
                        };
                      }}
                    >
                      <Checkbox
                        size="xs"
                        checked={addressPointsStatusVisibility.value[item.code]}
                      />
                      <div
                        className={`w-4 h-4 rounded-full mr-2`}
                        style={{
                          backgroundColor: addressPointsStatusVisibility.value[
                            item.code
                          ]
                            ? item.color
                            : "silver",
                        }}
                      ></div>
                      {<div className="flex-1" />}
                      <p
                        className={`text-xs ${
                          addressPointsStatusVisibility.value[item.code]
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {key}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        {!noNetzplanung && (
          <Accordion.Item value="Netzplanung" className="text-xs">
            <div className="flex flex-row space-x-1">
              <span className="mt-3">
                <Checkbox
                  size="xs"
                  checked={netzplanningCheckbox}
                  onChange={checkAll}
                />
              </span>
              <Accordion.Control
                className="text-xs max-2xl:text-[0.8vw] last:p-0"
                value={"Netzplanung"}
              >
                Netzplanung
              </Accordion.Control>
            </div>
            <Accordion.Panel>
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-2">
                  <Checkbox
                    size="xs"
                    name="checkbox2"
                    checked={netzplanning.value["10"]}
                    onChange={(e) => {
                      netzplanning.value = {
                        ...netzplanning.value,
                        ["10"]: e.target.checked,
                      };
                    }}
                  />
                  <img
                    title="Yellowtriangle"
                    src="/yellowtriangle.svg"
                    alt=""
                  />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    size="xs"
                    name="checkbox3"
                    checked={
                      data[Object.keys(data)[1]]
                        ? data[Object.keys(data)[1]].visible
                        : false
                    }
                    onChange={() => {
                      let lineyellow = data;
                      lineyellow[Object.keys(data)[1]] = {
                        ...lineyellow[Object.keys(data)[1]],
                        visible: !lineyellow[Object.keys(data)[1]].visible,
                      };
                      visibility.value = JSON.stringify(lineyellow);
                    }}
                  />

                  <img
                    title="Distribution Cables"
                    src="/yellowline.svg"
                    alt=""
                  />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    size="xs"
                    name="checkbox4"
                    checked={netzplanning.value["5"]}
                    onChange={(e) => {
                      netzplanning.value = {
                        ...netzplanning.value,
                        ["5"]: e.target.checked,
                      };
                    }}
                  />
                  <img title="Red Squre" src="/redsqurewline.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    size="xs"
                    name="checkbox5"
                    checked={
                      data[Object.keys(data)[6]]
                        ? data[Object.keys(data)[6]].visible
                        : false
                    }
                    onChange={() => {
                      let linepurple = data;
                      linepurple[Object.keys(data)[6]] = {
                        ...linepurple[Object.keys(data)[6]],
                        visible: !linepurple[Object.keys(data)[6]].visible,
                      };
                      visibility.value = JSON.stringify(linepurple);
                    }}
                  />
                  <img title="Feeder Cables" src="/redline.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    size="xs"
                    name="checkbox6"
                    checked={netzplanning.value["6"]}
                    onChange={(e) => {
                      netzplanning.value = {
                        ...netzplanning.value,
                        ["6"]: e.target.checked,
                      };
                    }}
                  />
                  <img title="Homes" src="/homeblue.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    size="xs"
                    name="checkbox7"
                    checked={
                      data[Object.keys(data)[10]]
                        ? data[Object.keys(data)[10]].visible
                        : false
                    }
                    onChange={() => {
                      let lineblue = data;
                      lineblue[Object.keys(data)[10]] = {
                        ...lineblue[Object.keys(data)[10]],
                        visible: !lineblue[Object.keys(data)[10]].visible,
                      };
                      visibility.value = JSON.stringify(lineblue);
                    }}
                  />
                  <img
                    title="PrimDistribution Cables"
                    src="/blueline.svg"
                    alt=""
                  />
                </div>
              </div>
            </Accordion.Panel>
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-2">
                <Checkbox
                  size="xs"
                  checked={photoVisibility.value}
                  onChange={() => {
                    photoVisibility.value = !photoVisibility.value;
                  }}
                />
                <p className=" text-xs max-2xl:text-[0.8vw]">Photos</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox
                  size="xs"
                  checked={videoVisibility.value}
                  onChange={() => {
                    videoVisibility.value = !videoVisibility.value;
                  }}
                />
                <p className=" text-xs max-2xl:text-[0.8vw]">Videos</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox
                  size="xs"
                  checked={BarrierState.value}
                  onChange={() => {
                    BarrierState.value = !BarrierState.value;
                  }}
                />
                <p className=" text-xs max-2xl:text-[0.8vw]">Barrieren</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox
                  size="xs"
                  checked={roadandwaterstate.value}
                  onChange={() => {
                    roadandwaterstate.value = !roadandwaterstate.value;
                  }}
                />
                <p className=" text-xs max-2xl:text-[0.8vw]">
                  Roads and Waterways
                </p>
              </div>
              <div className="flex space-x-2">
                <Checkbox size="xs" />
                <p className=" text-xs max-2xl:text-[0.8vw]">StatusÜbersicht</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox size="xs" />
                <p className=" text-xs max-2xl:text-[0.8vw]">
                  Adressen mit Versorgung
                </p>
              </div>
              <div className="flex space-x-2">
                <Checkbox size="xs" />
                <p className=" text-xs max-2xl:text-[0.8vw]">Gewerbegebiete</p>
              </div>
            </div>
            <br />
          </Accordion.Item>
        )}
        {!noStatus && (
          <Accordion.Item
            value="Status"
            className="text-xs max-2xl:text-[0.8vw]"
          >
            <Accordion.Control
              value={"Status"}
              className="text-xs max-2xl:text-[0.8vw] last:p-0"
            >
              Status
            </Accordion.Control>
            <Accordion.Panel>
              <div>
                {Object.entries(netzplanninglegend.value)?.map(
                  ([key, item]) => {
                    return (
                      <>
                        <p className="text-xs max-2xl:text-[0.8vw] font-bold my-2">
                          {key}
                        </p>

                        {Object.entries(item)?.map(([key, item]) => {
                          return (
                            <div
                              className="flex py-1 flex-row items-center cursor-pointer hover:bg-neutral-100"
                              onClick={() => {
                                DistrictPhaseLayersVisibility.value = {
                                  ...DistrictPhaseLayersVisibility.value,
                                  [item.key]:
                                    !DistrictPhaseLayersVisibility.value[
                                      item.key
                                    ],
                                };
                              }}
                            >
                              <div
                                className={`w-4 h-4 rounded-full mr-2`}
                                style={{
                                  backgroundColor: DistrictPhaseLayersVisibility
                                    .value[item.key]
                                    ? item.color
                                    : "silver",
                                  color: "blue",
                                }}
                              >
                                {item.symbol}
                              </div>
                              <div className="flex-1" />
                              <p
                                className={`text-xs max-2xl:text-[0.8vw] ${
                                  DistrictPhaseLayersVisibility.value[item.key]
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                {key}
                              </p>
                            </div>
                          );
                        })}
                      </>
                    );
                  }
                )}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Accordion>
    </div>
  );
};

const NetzplanningLegend = () => {
  return <></>;
};
