import { signal } from "@preact/signals"

export const permissible = signal({

    'Admin Map View': {
        componentID: 'Admin Map View',
        allow : true,
        children: {
            'Admin Map View - Edit Address Point': {
                componentID: 'Admin Map View - Edit Address Point',
                allow : true,
            },
            'Admin Map View - Create Address Point': {
                componentID: 'Admin Map View - Create Address Point',
                allow : true,
            },
            'Admin Map View - Delete Address Point': {
                componentID: 'Admin Map View - Delete Address Point',
                allow : true,
            },
        },
    },
    'Dashboard View': {
        componentID: 'Dashboard View',
        allow : true,
    },


    
})

export default ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}