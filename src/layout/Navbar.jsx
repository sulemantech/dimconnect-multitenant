import Logo from "../components/Logo"
import { privateRoutes } from "../config/routesConfig"
import { Link } from 'preact-router'
import { signal } from '@preact/signals'
import { useLayoutEffect } from "preact/hooks"
import { Tooltip } from "@mantine/core"

export const collapsed = signal(false)

export default () => {

    useLayoutEffect(() => {
        const windowWidth = window.innerWidth
        const sidenav = document.getElementById('sidenav')

        if (windowWidth < 768) {
            if (!collapsed.value) {
                sidenav.classList.remove('w-64')
                sidenav.classList.add('-ml-20')
            } else {
                sidenav.classList.remove('-ml-20')
                sidenav.classList.add('w-64')
            }
            return
        } 
        

        if (!collapsed.value) {
            sidenav.classList.remove('w-64')
            sidenav.classList.add('w-20')
        } else {
            sidenav.classList.remove('w-20')
            sidenav.classList.add('w-64')
        }

    }, [collapsed.value])

    return (
        <div id='sidenav' className=" transition-all border-r-2 border-solid border-white duration-300 shadow-xl bg-[#0071b9] text-white flex flex-col p-2 ">
            <div>
            <Logo />
            </div>
                
           
            <div className="flex-grow">
                {
                    privateRoutes?.map((route, index) => <RouteComponent path={route.path} label={route.label} icon={route.icon}/>)
                }
            </div>
            {/* Collapse Rounded Button */}
          
          
        </div>
    )
}

const RouteComponent = ({ path, label, icon }) => {
    return (
        <Link href={path}>
            <Tooltip label={label} display={collapsed.value ? 'none' : ''}>
            <div className="flex items-center p-4 h-14 my-2 text-white font-light border-sky-600 transition-all border-b-2 hover:border-white ">
                <p className="flex items-center">
                  {icon} <p className="text-md pl-2">  { collapsed.value && label } </p>
                </p>
            </div>
            </Tooltip>
        </Link>
    )
}
