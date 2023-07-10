import { showNotification } from "@mantine/notifications"
import { dropvalue } from "../signals"
import { IconAlertCircle } from "@tabler/icons"
import { useEffect } from "preact/hooks"

export default () => {
    
    useEffect(() => {
        dropvalue.subscribe((value) => {
           
            if(value == 'NULL'){
                showNotification({
                    title: "District not available",
                    message: "This district is not available right now.",
                    color: "red",
                    icon: <IconAlertCircle />,
                    autoClose: 5000,
                })
            }
        })
    }, [])
    

    return null
}