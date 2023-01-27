import Logo from "../components/Logo"
import { privateRoutes } from "../config/routesConfig"
import { Link, route } from 'preact-router'
import { signal } from '@preact/signals'
import { useContext, useEffect } from "preact/hooks"
import { AuthState } from "../providers/AuthProvider"
import { IconChevronRight,IconChevronLeft, IconLogout } from "@tabler/icons"

export const collapsed = signal(false)

export default () => {

    useEffect(() => {

        const sidenav = document.getElementById('sidenav')

        if (collapsed.value) {
            sidenav.classList.remove('w-80')
            sidenav.classList.add('w-20')
        } else {
            sidenav.classList.remove('w-20')
            sidenav.classList.add('w-80')
        }

    }, [collapsed.value])

    return (
        <div id='sidenav' className=" transition-all duration-300 shadow-xl h-screen bg-gradient-to-tl from-sky-500 to-sky-700 text-white flex flex-col p-2">
            {collapsed.value}
            <Logo />
            <div className="flex">
                <div className="flex-1"></div>
            <div className="-mr-6 mt-3 z-20 backdrop-blur-xl shadow-md cursor-pointer hover:scale-95 transition-all p-4 h-14 my-2 text-sky-500 font-bold rounded-full w-14 bg-white aspect-square" onClick={() => collapsed.value = !collapsed.value}>
                
                <p className="flex">
                    { collapsed.value ? <IconChevronRight /> : <IconChevronLeft /> }
                </p>
            </div>
            </div>
            <div className="flex-grow">
                {
                    privateRoutes.map((route, index) => <RouteComponent path={route.path} label={route.label} icon={route.icon}/>)
                }
            </div>
            {/* Collapse Rounded Button */}
          
          
        </div>
    )
}

const RouteComponent = ({ path, label, icon }) => {
    return (
        <Link href={path}>
            <div className="flex items-center p-4 h-14 my-2 text-white font-bold  border-b-2 border-white ">
                <p className="flex items-center">
                  {icon} <p className="text-xs pl-2">  { !collapsed.value && label } </p>
                </p>
            </div>
        </Link>
    )
}
