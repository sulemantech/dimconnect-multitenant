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
        sidenav.classList.remove("w-64");
        sidenav.classList.add("-ml-20");
      } else {
        sidenav.classList.remove("-ml-20");
        sidenav.classList.add("w-64");
      }
      return;
    }

    if (!collapsed.value) {
      sidenav?.classList.remove("w-64");
      sidenav.classList.add("w-20");
    } else {
      sidenav.classList.remove("w-20");
      sidenav.classList.add("w-64");
    }
  }, [collapsed.value]);


    return (
        <div id='sidenav'
            style={{
                backgroundImage: 'url("/vertical blue background.svg")',
            }}
            className=" transition-all border-r-2 border-solid border-white duration-300 shadow-xl  text-white flex flex-col p-2 ">
            <div className={` ${collapsed.value ? 'p-6' : 'p-0'}`}>
                <Logo />
            </div>

            <div className="flex justify-center items-center mt-4">


                <Burger
                    onClick={() => {
                        collapsed.value = !collapsed.value
                    }}

                    color="white"
                    size="sm"
                    opened={collapsed.value}
                />
            </div>

            <div className="flex-grow">
                {
                    privateRoutes?.map((route, index) => <PermissionWrapper permission={route.permission} view><RouteComponent path={route.path} label={route.label} icon={route.icon} subroutes={route.subroutes} /></PermissionWrapper>)
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
                   
                        <div className={`flex items-center py-8 ${collapsed.value ? 'px-6' : 'px-4'} h-14 my-2 text-white font-light border-sky-600 transition-all border-b-[2px] hover:border-sky-600 hover:bg-[#0071b9]  bg-opacity-50`}>

                            <p className="flex justify-center items-center text-center">
                                {icon} <p className="text-sm pl-4 truncate font-[400]">  {collapsed.value && label} </p>
                            </p>
                        </div>
                    
                </HoverCard.Target>
                <HoverCard.Dropdown className="rounded-r-xl p-0 bg-transparent backdrop-blur-md">
                    <div>
                        <Link href={path}>
                        <div className={`flex items-center py-8 ${collapsed.value ? 'px-6' : 'px-4'} h-14 my-2 text-[#0071b9] hover:text-white font-light border-neutral-200 transition-all border-b-[1px] hover:border-sky-600 hover:bg-[#0071b9]  bg-opacity-50`}>

                            <p className="flex justify-center items-center text-center ">
                                 <p className="text-sm pl-4 truncate font-[500]"> {label} </p>
                            </p>
                        </div>
                        </Link>
                        {
                            subroutes.map((route, index) => <PermissionWrapper permission={route.permission} view><RouteComponent path={route.path} label={route.label} icon={route.icon} subroutes={route.subroutes} isSubRoute /></PermissionWrapper>)
                        }
                    </div>
                </HoverCard.Dropdown>



            </HoverCard>
        )
    }


    return (
        <Link href={path}>
            <Tooltip disabled={isSubRoute} label={label} openDelay={0} position="right" className="bg-opacity-50" color='brand' py={17} display={collapsed.value ? 'none' : ''}>
                <div className={`flex items-center py-8 ${(collapsed.value || isSubRoute) ? 'px-6' : 'px-4'} h-14 my-2 ${!isSubRoute?"text-white hover:border-sky-600 border-sky-600 border-b-[2px] ":"text-[#0071b9] hover:border-white hover:text-white  border-neutral-200 border-b-[1px]"} font-light  transition-all   hover:bg-[#0071b9] bg-opacity-50 `}>
                    <p className="flex justify-center items-center text-center">
                        {icon} <p className="text-sm pl-4 truncate font-[400]">  {(collapsed.value || isSubRoute) && label} </p>
                    </p>
                </div>
            </Tooltip>
        </Link>
    )
}
