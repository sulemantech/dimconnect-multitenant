
import { Accordion } from "@mantine/core"
import { useDidUpdate } from "@mantine/hooks"
import { useState } from "preact/hooks"
import { useTranslation } from "react-i18next";

import {
  DistrictPhaseLayersVisibility, DistrictPhaseVisibility, addressPointsStatusVisibility,
  legendContent, statuslegend, netzPlanningLegendContent, netzPlanningStatusVisibility
} from "../../../../signals"

export default ({ noAddressPoint = false, noStatus = false }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('Address Points')
  const [collapsed, setCollapsed] = useState(!noAddressPoint)
  useDidUpdate(() => {
    setTimeout(() => {
      if (value == null) setCollapsed(true)
    }, 500)
  }, [value])
  useDidUpdate(() => {
    if (collapsed == false) setValue('')
  }, [collapsed])

  if (collapsed) return <div className="absolute -left-8 hover:scale-95 transition-all cursor-pointer bottom-24 justify-center rotate-90 font-bold text-lg tracking-wide text-white bg-[#0092c3] shadow-2xl z-40 rounded-md p-2 " onClick={() => setCollapsed(false)}>
    {t('Legend')}
  </div>

  return (
    <div className="relative text-xs flex flex-col p-2 shadow-md rounded-md mt-2 bg-white">
      <h6 className="mb-1"><b>{t('Legend')}</b></h6>
      <hr className="mb-2" />
      <Accordion defaultValue={window.innerWidth > 768 ? 'Address Points' : ''} className="text-xs" onChange={(e) => {
        const params = new URLSearchParams(window.location.search)
        if (!params.get('statusPage')) {
          if (e !== 'Status') {

            DistrictPhaseVisibility.value = false
          } else {
            DistrictPhaseVisibility.value = true
          }
          setValue(e)
        }
      }}>
        {!noAddressPoint && (
          <Accordion.Item value="Address Points" className="text-xs">
            <Accordion.Control className="text-xs last:p-0" value={"Address Points"}>
              Address Points
            </Accordion.Control>
            <Accordion.Panel>
              <div>
                {Object.entries(legendContent.value)?.map(([key, item]) => (
                  <div className="flex py-1 flex-row items-center cursor-pointer hover:bg-neutral-100">
                    <input
                      type="checkbox"
                      checked={addressPointsStatusVisibility.value[item.code]}
                      onChange={() => {
                        addressPointsStatusVisibility.value = {
                          ...addressPointsStatusVisibility.value,
                          [item.code]: !addressPointsStatusVisibility.value[item.code],
                        };
                      }}
                      className="mr-2"
                    />
                    <div
                      className={`w-4 h-4 rounded-full mr-2`}
                      style={{
                        backgroundColor: addressPointsStatusVisibility.value[item.code]
                          ? item.color
                          : 'silver',
                      }}
                    ></div>
                    <div className="flex-1" />
                    <p
                      className={`text-xs ${addressPointsStatusVisibility.value[item.code]
                        ? 'text-gray-900'
                        : 'text-gray-400'
                        }`}
                    >
                      {key}
                    </p>
                  </div>
                ))}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}
        {!noStatus && (
          <Accordion.Item value="Status" className="text-xs">
            <Accordion.Control value={'Status'} className="text-xs last:p-0">
              Status
            </Accordion.Control>
            <Accordion.Panel>
              <div>
                {Object.entries(statuslegend.value)?.map(([key, item]) => (
                  <>
                    <p className="text-xs font-bold my-2">{key}</p>

                    {Object.entries(item)?.map(([key, item]) => (
                      <div className="flex py-1 flex-row items-center cursor-pointer hover:bg-neutral-100">
                        <input
                          type="checkbox"
                          checked={DistrictPhaseLayersVisibility.value[item.key]}
                          onChange={() => {
                            DistrictPhaseLayersVisibility.value = {
                              ...DistrictPhaseLayersVisibility.value,
                              [item.key]: !DistrictPhaseLayersVisibility.value[item.key],
                            };
                          }}
                          className="mr-2"
                        />
                        <div
                          className={`w-4 h-4 rounded-full mr-2`}
                          style={{
                            backgroundColor: DistrictPhaseLayersVisibility.value[item.key]
                              ? item.color
                              : 'silver',
                            color: 'blue',
                          }}
                        >
                          {item.symbol}
                        </div>
                        <div className="flex-1" />
                        <p
                          className={`text-xs ${DistrictPhaseLayersVisibility.value[item.key]
                            ? 'text-gray-900'
                            : 'text-gray-400'
                            }`}
                        >
                          {key}
                        </p>
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        <Accordion.Item value="Netzplanning" className="text-xs">
          <Accordion.Control value={'Netzplanning'} className="text-xs last:p-0">
            Netzplanning
          </Accordion.Control>
          <Accordion.Panel>
            <div>
              {Object.entries(netzPlanningLegendContent.value).map(([key, item]) => (
                <div
                  className="flex py-1 flex-row items-center cursor-pointer hover:bg-neutral-100"
                  key={key}
                >
                  <input
                    type="checkbox"
                    checked={netzPlanningStatusVisibility.value[item.code]}
                    onChange={() => {
                      console.log('netzPlanningStatusVisibility before change:', netzPlanningStatusVisibility.value);
              
                      netzPlanningStatusVisibility.value = {
                        ...netzPlanningStatusVisibility.value,
                        [item.code]: !netzPlanningStatusVisibility.value[item.code],
                      };
                      console.log('netzPlanningStatusVisibility after change:', netzPlanningStatusVisibility.value);
              
                    }}
                    className="mr-2"
                  />
                  <img
                    src={item.image_src}
                    alt={key}
                    className="w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor: netzPlanningStatusVisibility.value[item.code]
                        ? 'color for true state'
                        : 'color for false state',
                    }}
                  />
                  <div className="flex-1" />
                  <p
                    className={`text-xs ${netzPlanningStatusVisibility.value[item.code]
                      ? 'text-gray-900'
                      : 'text-gray-400'
                      }`}
                  >
                    {key}
                  </p>
                </div>
              ))}
            </div>
          </Accordion.Panel>
        </Accordion.Item>

      </Accordion>
    </div>
  )
}