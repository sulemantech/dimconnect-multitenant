import { Burger, HoverCard, Tooltip } from "@mantine/core"
import { Link } from 'preact-router'
import { useLayoutEffect } from "preact/hooks"
import Logo from "../components/Logo"
import { privateRoutes } from "../config/routesConfig"

import PermissionWrapper from "../providers/PermissionsProvider"
import { collapsed } from "../signals"
import { useTranslation } from "react-i18next"

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
        <nav id='sidenav'
            style={{
                backgroundImage: 'url("/vertical blue background.svg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className=" transition-all w-fit duration-300 shadow-xl  text-white flex flex-col ">
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


        </nav>
        // </div>
    )
}

const RouteComponent = ({ path, label, icon, subroutes, isSubRoute = false }) => {
    const {t} = useTranslation()
    if (subroutes) {

        return (
            <HoverCard position="right-start">
                <HoverCard.Target>

                <div className={`flex  border-[#ffffff3d] border-b-[1px] hover:bg-brand backdrop-blur-sm items-center hover:border-b-2  py-[30px] max-lg:py-[20px] px-6 h-[73.5px] max-lg:h-[66px] ${!isSubRoute ? "text-white  border-[#ffffff3d] border-b-[1px] hover:bg-opacity-10" : "text-brand hover:border-white hover:text-white  border-neutral-200 border-b-[1px] h-[78.2px] bg-white hover:bg-brand"} font-light  transition-all    `}>

                        <p className="flex justify-center items-center text-center">
                            {icon}   {collapsed.value && <p className="text-sm pl-4 truncate font-[400]"> {t(label)} </p>}
                        </p>
                    </div>

                </HoverCard.Target>
                <HoverCard.Dropdown   className="rounded-r-3xl -ml-2  p-0 bg-opacity-70 backdrop-blur-sm">
                   

                        <div className={`flex  items-center justify-center h-[73.5px] max-lg:h-[66px] ${collapsed.value ? 'px-6' : 'px-4'}  text-[#0E76BB]  font-light border-neutral-200 transition-all border-b-[1px]   `}>

                            <p className="flex justify-center items-center text-center ">
                                {/* first word bold */}
                                <p className="text-sm pl-4 truncate font-[500]"><b>{t(label.split(" ")[0])}</b> {t(label.split(" ").slice(1).join(" ").toUpperCase())}</p>
                            </p>
                        </div>

                        {
                            subroutes.map((route, index) => <PermissionWrapper permission={route.permission} view><RouteComponent path={route.path} label={route.label} icon={<route.icon />} subroutes={route.subroutes} isSubRoute /></PermissionWrapper>)
                        }
                 
                </HoverCard.Dropdown>



            </HoverCard>
        )
    }


    return (
        <Link href={path}>
            <Tooltip disabled={collapsed.value || isSubRoute} label={<div className="flex  flex-1 items-center text-sm mx-2 truncate font-[400]">{icon} <p className="text-sm pl-[40px] text-center justify-center flex  flex-1 truncate font-[400]"> {t(label)}</p></div>} openDelay={0} position="right" classNames={{
                tooltip: 'flex items-center justify-start bg-opacity-80 backdrop-blur-sm  bg-[#0E76BB]  border-b-2 border-[#0000005e] text-white rounded-r-3xl rounded-l-none -ml-[100px] pl-[30px] h-[73.5px] max-lg:h-[66px] min-w-[200px]',
            }} color='brand' py={20} display={collapsed.value ? 'none' : ''}>
                <div className={`flex  hover:bg-brand backdrop-blur-sm items-center hover:border-b-2   px-6 h-[73.5px] max-lg:h-[66px] ${!isSubRoute ? "text-white  border-[#ffffff3d] border-b-[1px] hover:bg-opacity-10" : "text-brand hover:border-white hover:text-white  border-neutral-200 border-b-[1px] h-[73.5px] bg-transparent hover:bg-brand hover:bg-opacity-80"} font-light  transition-all    `}>
                    <p className="flex justify-center items-center text-center">
                        {icon}  {(collapsed.value || isSubRoute) && <p className="text-sm pl-4 truncate font-[400]"> {t(label)}</p>}
                    </p>
                </div>
            </Tooltip>
        </Link>
    )
}
