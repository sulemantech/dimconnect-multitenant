import { Box, Text } from "@mantine/core"
import {useState} from "preact/hooks"
import { useTranslation } from "react-i18next";
export default () => {
    const {t} = useTranslation()
    return (
        <Box className="absolute bottom-0 right-0 left-0 flex flex-col flex-1 bg-neutral-50 text-xs py-2 border-t-2 border-white border-solid mt-2">
            <Text>  {new Date().getFullYear() + " © " + " Dim Connect"}</Text>
        </Box>
    )
}