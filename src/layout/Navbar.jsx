import Logo from "../components/Logo"
import { privateRoutes } from "../config/routesConfig"
import { Link } from 'preact-router'
import { signal } from '@preact/signals'
import { useEffect } from "preact/hooks"

export const collapsed = signal(false)

export default () => {

    useEffect(() => {

        const sidenav = document.getElementById('sidenav')

        if (!collapsed.value) {
            sidenav.classList.remove('w-64')
            sidenav.classList.add('w-20')
        } else {
            sidenav.classList.remove('w-20')
            sidenav.classList.add('w-64')
        }

    }, [collapsed.value])

    return (
        <div id='sidenav' className=" transition-all border-r-2 border-solid border-white duration-300 shadow-xl h-screen bg-components text-white flex flex-col p-2">
            <div>
            <Logo />
            </div>
                
            {/* <div className="flex">
                <div className="flex-1"></div>
            <div className="-mr-6 mt-3 z-20 backdrop-blur-xl shadow-md cursor-pointer hover:scale-95 transition-all p-4 h-14 my-2 text-sky-500 font-bold rounded-full w-14 bg-white aspect-square" onClick={() => collapsed.value = !collapsed.value}>
                
                <p className="flex">
                    { collapsed.value ? <IconChevronRight /> : <IconChevronLeft /> }
                </p>
            </div>
            </div> */}
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
            <div className="flex items-center p-4 h-14 my-2 text-white font-light border-sky-600 transition-all border-b-2 hover:border-white ">
                <p className="flex items-center">
                  {icon} <p className="text-md pl-2">  { collapsed.value && label } </p>
                </p>
            </div>
        </Link>
    )
}
