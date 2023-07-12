import Logo from "../components/Logo"
import { privateRoutes } from "../config/routesConfig"
import { Link } from 'preact-router'
import { useLayoutEffect } from "preact/hooks"
import { Burger, HoverCard, Menu, Tooltip } from "@mantine/core"

import { collapsed } from "../signals"
import PermissionWrapper from "../providers/PermissionsProvider"

export default () => {
    useLayoutEffect(() => {
        const windowWidth = window.innerWidth;
        const sidenav = document.getElementById("sidenav");

        if (windowWidth < 768) {
            if (!collapsed.value) {
                sidenav?.classList.remove("w-64");
                sidenav?.classList.add("-ml-20");
            } else {
                sidenav?.classList.remove("-ml-20");
                sidenav?.classList.add("w-64");
            }
            return;
        }

        if (!collapsed.value) {
            sidenav?.classList.remove("w-64");
            sidenav?.classList.add("w-20");
        } else {
            sidenav?.classList.remove("w-20");
            sidenav?.classList.add("w-64");
        }
    }, [collapsed.value]);


    return (
        <div id='sidenav'
            style={{
                backgroundImage: 'url("/vertical blue background.svg")',
            }}
            className=" transition-all duration-300 shadow-xl  text-white flex flex-col ">
            <div className={` ${collapsed.value ? 'p-6' : 'p-2'} pt-4`}>
                <Logo />
            </div>

            <div className={`flex items-center justify-center py-4  text-white font-light border-sky-600 transition-all border-b-[2px] hover:border-sky-600 hover:bg-sky-600`}>


                <Burger
                    onClick={() => {
                        collapsed.value = !collapsed.value
                    }}

                    color="white"

                    opened={collapsed.value}
                />
            </div>

            <div className="flex-grow">
                {
                    privateRoutes?.map((route, index) => <PermissionWrapper key={index} permission={route.permission} view><RouteComponent path={route.path} label={route.label} icon={<route.icon />} subroutes={route.subroutes} /></PermissionWrapper>)
                }
            </div>
            {/* Collapse Rounded Button */}


        </div>
        // </div>
    )
}

const RouteComponent = ({ path, label, icon, subroutes, isSubRoute = false }) => {

    if (subroutes) {

        return (
            <HoverCard position="right-start">
                <HoverCard.Target>

                    <div className={`flex items-center py-[30px] px-6 h-[86px] my-2 text-white font-light border-sky-600 transition-all border-b-[2px] hover:border-sky-600 hover:bg-[#0E76BB]`}>

                        <p className="flex justify-center items-center text-center">
                            {icon}   {collapsed.value && <p className="text-sm pl-4 truncate font-[400]"> {label} </p>}
                        </p>
                    </div>

                </HoverCard.Target>
                <HoverCard.Dropdown className="rounded-r-xl -ml-2 -mt-2 p-0 bg-white  ">
                    <div>

                        <div className={`flex  items-center justify-center h-[86px] ${collapsed.value ? 'px-6' : 'px-4'}  text-[#0E76BB]  font-light border-neutral-200 transition-all border-b-[1px]   `}>

                            <p className="flex justify-center items-center text-center ">
                                <p className="text-sm pl-4 truncate font-[500]"> {label} </p>
                            </p>
                        </div>

                        {
                            subroutes.map((route, index) => <PermissionWrapper permission={route.permission} view><RouteComponent path={route.path} label={route.label} icon={<route.icon />} subroutes={route.subroutes} isSubRoute /></PermissionWrapper>)
                        }
                    </div>
                </HoverCard.Dropdown>



            </HoverCard>
        )
    }


    return (
        <Link href={path}>
            <Tooltip disabled={isSubRoute} label={<p className="text-sm mx-2 truncate font-[400]"> {label}</p>} openDelay={0} position="right" classNames={{
                tooltip: 'bg-sky-600 bg-opacity-80 bg-sky-600 backdrop-blur-sm border-b-2 border-[#0000005e] text-white rounded-r-xl -ml-2',
            }} color='brand' py={20} display={collapsed.value ? 'none' : ''}>
                <div className={`flex  hover:bg-[#0E76BB] hover:backdrop-blur-sm items-center hover:border-b-2  py-[30px] px-6 h-[86px] my-2 ${!isSubRoute ? "text-white hover:border-sky-600 border-sky-600 border-b-[2px] " : "text-[#0E76BB] hover:border-white hover:text-white  border-neutral-200 border-b-[1px]"} font-light  transition-all   hover:bg-sky-600  `}>
                    <p className="flex justify-center items-center text-center">
                        {icon}  {(collapsed.value || isSubRoute) && <p className="text-sm pl-4 truncate font-[400]"> {label}</p>}
                    </p>
                </div>
            </Tooltip>
        </Link>
    )
}
