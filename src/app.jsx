import './app.css'
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './providers/AuthProvider';
import { ModalsProvider } from '@mantine/modals';
import { signal } from '@preact/signals';
import LZString from 'lz-string';
import {feature} from 'topojson-client'

export const districts = signal({})

fetch('/german.json.lz').then(res => res.text()).then(res => {
const uncompressed = JSON.parse( LZString.decompressFromBase64(res))

const parsed = feature(uncompressed,uncompressed?.objects?.german)

districts.value = parsed

})

export function App() {

  return (

    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
        <AuthProvider />
        </ModalsProvider>
      </MantineProvider>
    </>

  )
}
