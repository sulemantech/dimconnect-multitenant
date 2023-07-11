import { Alert, LoadingOverlay } from '@mantine/core';
import { Suspense } from 'preact/compat';
import { permissible } from '../signals';
import { IconAlertCircle } from '@tabler/icons';


const checkPermission = (permission, type) => {
    const p = permissible.value.find(p => p.activity == permission)
    return p ? p[type] : false
};

const PermissionWrapper = ({ permission, children, add = false, edit = false, view = false, del = false, showError = false, message = false }) => {

    // const hasPermission = checkPermission(permission);
    let hasPermission = false
    if (add) {
        hasPermission = checkPermission(permission, 'add')
    } else if (edit) {
        hasPermission = checkPermission(permission, 'edit')
    } else if (view) {
        hasPermission = checkPermission(permission, 'view')
    } else if (del) {
        hasPermission = checkPermission(permission, 'delete')
    }



    return (
        <>
            {
                hasPermission ? children : <>
                    {showError ? <div className='h-full w-full flex items-center justify-center '>
                        <Alert color='red' icon={<IconAlertCircle />}
                            title='Permission Denied'
                            radius={'xl'}
                            className='flex items-center justify-center'
                            description='You do not have permission to access this page'
                        />
                    </div>
                        :
                        message ? <div className='h-full w-full flex items-center justify-center '>
                            <Alert color='red' icon={<IconAlertCircle />}
                                title='Permission Denied'
                                radius={'xl'}
                                className='flex items-center justify-center'
                                description={message}
                            />
                        </div>
                            : null}


                </>
            }
        </>
    );
};

export default PermissionWrapper;
