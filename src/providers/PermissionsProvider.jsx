import { Alert, LoadingOverlay } from '@mantine/core';
import { Suspense } from 'preact/compat';
import { permissible } from '../signals';
import { IconAlertCircle } from '@tabler/icons';


const checkPermission = (permission) => {
    const p = Object.values(permissible.value).find(p => p.permission == permission)
    return p ? p.allow : false
};

const PermissionWrapper = ({ permission, children }) => {

    const hasPermission = checkPermission(permission);
    
    
    return (
        <Suspense fallback={<LoadingOverlay visible />}>
            {hasPermission ? children : <div className='h-full w-full flex items-center justify-center '>
               <Alert color='red' icon={<IconAlertCircle />}
                    title='Permission Denied'
                    radius={'xl'}
                    className='flex items-center justify-center'
                    description='You do not have permission to access this page'
                    /> 
                </div>}
        </Suspense>
    );
};

export default PermissionWrapper;
