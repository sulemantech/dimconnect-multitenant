import { signal } from "@preact/signals"

export const permissible = signal({

    'Admin Map View': {
        componentID: 'Admin Map View',
        read : true,
        write : true,
        delete : true,
    },
    "Address Point Validation": {
        componentID: "Address Point Validation",
        read : true,
        write : true,
        delete : true,
    },
    'Dashboard View': {
        componentID: 'Dashboard View',
        read : true,
        write : true,
        delete : true,
    },
    'Ticket Resolution': {
        componentID: 'Ticket Resolution',
        read : true,
        write : true,
        delete : true,
    },


    
})

export default ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}