import { Link } from 'preact-router'
import Logo from '../../../components/Logo'
export default () => {
    return(
        <div className="absolute flex items-center z-50 top-2 left-2 bg-sky-600 right-2 p-2 bg-opacity-30 backdrop-blur-lg border-neutral-100 border-2 border-solid rounded-lg shadow-lg">
            <div className='relative' >
            <Logo width={65} height={65}/>
            </div>
            <div className="flex-1" />
            
        </div>
    )
}