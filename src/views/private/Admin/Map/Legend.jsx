import { Accordion } from "@mantine/core";
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
} from "../../../../signals";

export default ({
  noAddressPoint = false,
  noStatus = false,
  noNetzplanung = false,
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
  useDidUpdate(() => {
    if (collapsed == false) setValue("");
  }, [collapsed]);

  if (collapsed)
    return (
      <div
        className="absolute -left-8 hover:scale-95 transition-all cursor-pointer bottom-24 justify-center rotate-90 font-bold text-lg tracking-wide text-white bg-[#0092c3] shadow-2xl z-40 rounded-md p-2 "
        onClick={() => setCollapsed(false)}
      >
        {t("Legend")}
      </div>
    );

  return (
    <div className="relative text-xs flex flex-col p-2 shadow-md rounded-md mt-2 bg-white overflow-scroll">
      <h6 className="mb-1">
        <b>{t("Legend")}</b>
      </h6>
      <hr className="mb-2" />
      <Accordion
        defaultValue={window.innerWidth > 768 ? "Address Points" : ""}
        className="text-xs"
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
        {!noAddressPoint && (
          <Accordion.Item value="Address Points" className="text-xs">
            <div className="flex flex-1 space-x-4 ">
              <span className="mt-3 ">
                <Checkbox
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
                className="text-xs last:p-0"
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

        {!noAddressPoint && (
          <Accordion.Item value="Background" className="text-xs">
            <div className="flex flex-1 space-x-4 ">
              <span className="mt-3 "></span>
              <Accordion.Control
                className="text-xs last:p-0"
                value={"Background"}
              >
                Background
              </Accordion.Control>
            </div>
            <Accordion.Panel>
              <div>
                {["Aerial View", "RP Properties"].map((item) => (
                  <div className="flex py-1 space-x-1 flex-row items-center cursor-pointer hover:bg-neutral-100">
                    <Checkbox
                      checked={
                        item === "Aerial View"
                          ? aerialViewVisibility.value
                          : PRpropertiesVisibility.value
                      }
                      onChange={() => {
                        item === "Aerial View"
                          ? (aerialViewVisibility.value =
                              !aerialViewVisibility.value)
                          : (PRpropertiesVisibility.value =
                              !PRpropertiesVisibility.value);
                      }}
                    />

                    <p className="text-xs font-bold ">{item}</p>
                  </div>
                ))}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        {!noNetzplanung && (
          <Accordion.Item value="Netzplanung" className="text-xs">
            <div className="flex flex-row space-x-1">
              <span className="mt-3">
                <Checkbox checked={netzplanningCheckbox} onChange={checkAll} />
              </span>
              <Accordion.Control
                className="text-xs last:p-0"
                value={"Netzplanung"}
              >
                Netzplanung
              </Accordion.Control>
            </div>
            <Accordion.Panel>
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-2">
                  <Checkbox
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
                  checked={photoVisibility.value}
                  onChange={() => {
                    photoVisibility.value = !photoVisibility.value;
                  }}
                />
                <p className=" text-xs">Photos</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox
                  checked={videoVisibility.value}
                  onChange={() => {
                    videoVisibility.value = !videoVisibility.value;
                  }}
                />
                <p className=" text-xs ">Videos</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox
                  checked={BarrierState.value}
                  onChange={() => {
                    BarrierState.value = !BarrierState.value;
                  }}
                />
                <p className=" text-xs">Barrieren</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox
                  checked={roadandwaterstate.value}
                  onChange={() => {
                    roadandwaterstate.value = !roadandwaterstate.value;
                  }}
                />
                <p className=" text-xs">Roads and Waterways</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox />
                <p className=" text-xs">StatusÜbersicht</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox />
                <p className=" text-xs">Adressen mit Versorgung</p>
              </div>
              <div className="flex space-x-2">
                <Checkbox />
                <p className=" text-xs">Gewerbegebiete</p>
              </div>
            </div>
            <br />
          </Accordion.Item>
        )}
        {!noStatus && (
          <Accordion.Item value="Status" className="text-xs">
            <Accordion.Control value={"Status"} className="text-xs last:p-0">
              Status
            </Accordion.Control>
            <Accordion.Panel>
              <div>
                {Object.entries(netzplanninglegend.value)?.map(
                  ([key, item]) => {
                    return (
                      <>
                        <p className="text-xs font-bold my-2">{key}</p>

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
                                className={`text-xs ${
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
