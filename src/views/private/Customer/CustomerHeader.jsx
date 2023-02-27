import { Link } from 'preact-router'
import Logo from '../../../components/Logo'
export default () => {
    return(
        <div className="absolute flex items-center z-50 top-2 left-2 right-2 bg-components p-2 rounded-lg shadow-lg">
            <div className='relative' >
            <Logo width={65} height={65}/>
            </div>
            <div className="flex-1" />
            <Link href="/login">
                <div className="flex cursor-pointer hover:scale-105 transition-all items-center">
                    <div className="text-xl font-bold text-white">Login</div>
                </div>
            </Link>
        </div>
    )
}