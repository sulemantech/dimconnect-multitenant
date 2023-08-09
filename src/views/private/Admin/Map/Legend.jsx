
import { Accordion, Checkbox } from "@mantine/core"
import { useDidUpdate } from "@mantine/hooks"
import { useState } from "preact/hooks"
import { useTranslation } from "react-i18next";

import { DistrictPhaseLayersVisibility, DistrictPhaseVisibility, addressPointsStatusVisibility, legendContent, netzplanninglegend } from "../../../../signals"


export default ({ noAddressPoint = false, noStatus = false }) => {
    const {t}=useTranslation()
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
                <NetzplanningLegend />
                {!noAddressPoint && <Accordion.Item value="Address Points" className="text-xs" >
                    <Accordion.Control className="text-xs last:p-0" value={"Address Points"}>Address Points</Accordion.Control>
                    <Accordion.Panel>
                        <div>
                            {
                                Object.entries(legendContent.value)?.map(([key, item]) => {
                                    return <div className="flex py-1 flex-row items-center cursor-pointer hover:bg-neutral-100"
                                        onClick={() => {
                                            addressPointsStatusVisibility.value = {
                                                ...addressPointsStatusVisibility.value,
                                                [item.code]: !addressPointsStatusVisibility.value[item.code]
                                            }
                                        }}
                                    >
                                        <div className={`w-4 h-4 rounded-full mr-2`}
                                            style={{
                                                backgroundColor: addressPointsStatusVisibility.value[item.code] ? item.color : 'silver',

                                            }}
                                        ></div>
                                        <div className="flex-1" />
                                        <p
                                            className={`text-xs ${addressPointsStatusVisibility.value[item.code] ? 'text-gray-900' : 'text-gray-400'}`}
                                        >{key}</p>



                                    </div>


                                })
                            }
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>}
                {!noStatus && <Accordion.Item value="Status" className="text-xs">
                    <Accordion.Control value={'Status'} className="text-xs last:p-0">Status</Accordion.Control>
                    <Accordion.Panel>
                        <div>
                            {
                                Object.entries(netzplanninglegend.value)?.map(([key, item]) => {
                                    return <>
                                        <p className="text-xs font-bold my-2">{key}</p>

                                        {
                                            Object.entries(item)?.map(([key, item]) => {
                                                return <div className="flex py-1 flex-row items-center cursor-pointer hover:bg-neutral-100"
                                                    onClick={() => {
                                                        DistrictPhaseLayersVisibility.value = {
                                                            ...DistrictPhaseLayersVisibility.value,
                                                            [item.key]: !DistrictPhaseLayersVisibility.value[item.key]
                                                        }

                                                    }}
                                                >
                                                    <div className={`w-4 h-4 rounded-full mr-2`}
                                                        style={{
                                                            backgroundColor: DistrictPhaseLayersVisibility.value[item.key] ? item.color : 'silver',
                                                            color: 'blue'
                                                        }}
                                                    >
                                                        {item.symbol}
                                                    </div>
                                                    <div className="flex-1" />
                                                    <p
                                                        className={`text-xs ${DistrictPhaseLayersVisibility.value[item.key] ? 'text-gray-900' : 'text-gray-400'}`}
                                                    >{key}</p>



                                                </div>
                                            })
                                        }
                                    </>
                                })
                            }
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>}
            </Accordion>
        </div>
    )
}

const NetzplanningLegend = () => {
    return <>
    <Accordion.Item value="Netzplanung" className="text-xs">
            <div className="flex flex-row space-x-1">
              <span className="mt-3">
                <Checkbox 
                // checked={checkAll} onChange={handleCheckAll} 
                />
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
                    name="checkbox1"
                    // checked={checkboxState.checkbox1}
                    // onChange={()=>{ addressPointsStatusVisibility.value = {
                    //   ...addressPointsStatusVisibility.value,
                    //   [4]:
                    //     !addressPointsStatusVisibility.value[4],}
                    // }}
                  />
                  <img src="/black.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    name="checkbox2"
                //     checked={checkboxState.checkbox2}
                //     onChange={() => {   
                //       equipmentState.value = !equipmentState.value;
                     
                //   }}
                  />
                  <img src="/yellowtriangle.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    name="checkbox3"
                    // checked={checkboxState.checkbox3}
                    // onChange={() => {
                    //   let lineyellow = data;
                    //   lineyellow[Object.keys(data)[1]] = {
                    //     ...lineyellow[Object.keys(data)[1]],
                    //     visible: !lineyellow[Object.keys(data)[1]].visible,
                    //   };
                    //   visibility.value = JSON.stringify(lineyellow);
                    //   handleCheckboxChange(!checkboxState.checkbox3);
                    //   // Toggle the checkbox state
                    // }}
                  />

                  <img src="/yellowline.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    name="checkbox4"
                    // checked={checkboxState.checkbox4}
                    // onChange={handleCheckboxChange}
                  />
                  <img src="/redsqurewline.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    name="checkbox5"
                    // checked={checkboxState.checkbox5}
                    // onChange={() => {
                    //   let linepurple = data;
                    //   linepurple[Object.keys(data)[6]] = {
                    //     ...linepurple[Object.keys(data)[6]],
                    //     visible: !linepurple[Object.keys(data)[6]].visible,
                    //   };
                    //   visibility.value = JSON.stringify(linepurple);
                    //   setCheckboxState((prev) => ({
                    //     ...prev,
                    //     checkbox5: checked,
                    //   }));
                    //   // handleCheckboxChange(!checkboxState.checkbox5);
                    //   // Toggle the checkbox state
                    // }}
                  />
                  <img src="/redline.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    name="checkbox6"
                    // checked={checkboxState.checkbox6}
                    // onChange={handleCheckboxChange}
                  />
                  <img src="/homeblue.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    name="checkbox7"
                    // checked={checkboxState.checkbox7}
                    // onChange={() => {
                    //   let linepurple = data;
                    //   linepurple[Object.keys(data)[10]] = {
                    //     ...linepurple[Object.keys(data)[10]],
                    //     visible: !linepurple[Object.keys(data)[10]].visible,
                    //   };
                    //   visibility.value = JSON.stringify(linepurple);
                    //   setCheckboxState((prev) => ({
                    //     ...prev,
                    //     checkbox7: checked,
                    //   }));
                    //   // handleCheckboxChange(!checkboxState.checkbox5);
                    //   // Toggle the checkbox state
                    // }}
                  />
                  <img src="/blueline.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    name="checkbox8"
                    // checked={checkboxState.checkbox8}
                    // onChange={handleCheckboxChange}
                  />
                  <img src="/blackline.svg" alt="" />
                </div>
                <div className="flex space-x-2">
                  <Checkbox
                    name="checkbox9"
                    // checked={checkboxState.checkbox9}
                    // onChange={handleCheckboxChange}
                  />
                  <img src="/locationpointerblue.svg" alt="" />
                </div>
                <br />
                <div className="flex space-x-2">
                  <Checkbox />
                  <h4 className=" text-base">Photos</h4>
                </div>
                <div className="flex space-x-2">
                  <Checkbox />
                  <h4 className=" text-base">Barrieren</h4>
                </div>
                <div className="flex space-x-2">
                  <Checkbox />
                  <h4 className=" text-base lowercase">StatusÜbersicht</h4>
                </div>
                <div className="flex space-x-2">
                  <Checkbox />
                  <h4 className=" text-base">Adressen mit Versorgung</h4>
                </div>
                <div className="flex space-x-2">
                  <Checkbox />
                  <h4 className=" text-base">Gewerbegebiete</h4>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
    </>

}