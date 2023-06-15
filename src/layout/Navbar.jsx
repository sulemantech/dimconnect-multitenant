import Logo from "../components/Logo"
import { privateRoutes } from "../config/routesConfig"
import { Link } from 'preact-router'
import { useLayoutEffect } from "preact/hooks"
import { Burger, Tooltip } from "@mantine/core"

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
    <div
      id="sidenav"
      className=" transition-all border-r-2 border-solid border-white duration-300 shadow-xl bg-[#0071b9] text-white flex flex-col p-2 "
    >
      <div>
        <Logo />
      </div>
{/* 
        if (!collapsed.value) {
            sidenav.classList.remove('w-64')
            sidenav.classList.add('w-20')
        } else {
            sidenav.classList.remove('w-20')
            sidenav.classList.add('w-64')
        } */}

    {/* }, [collapsed.value]) */}

    return (
        <div id='sidenav' 
        style={{
            backgroundImage : 'url("/vertical blue background.svg")',
        }}
        className=" transition-all border-r-2 border-solid border-white duration-300 shadow-xl  text-white flex flex-col p-2 ">
            <div>
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
                    privateRoutes?.map((route, index) => <PermissionWrapper permission={route.permission} view><RouteComponent path={route.path} label={route.label} icon={route.icon} /></PermissionWrapper>)
                }
            </div>
            {/* Collapse Rounded Button */}


        </div>
        </div>
    )
}

const RouteComponent = ({ path, label, icon }) => {
    return (
        <Link href={path}>
            <Tooltip label={label} openDelay={0} position="right" className="bg-opacity-50" color='brand' py={17} display={collapsed.value ? 'none' : ''}>
                <div className="flex items-center p-4 h-14 my-2 text-white font-light border-white transition-all border-b-2 hover:border-sky-600 hover:bg-[#0071b9]  bg-opacity-50">
                    <p className="flex items-center">
                        {icon} <p className="text-md pl-2">  {collapsed.value && label} </p>
                    </p>
                </div>
            </Tooltip>
        </Link>
    )
}
