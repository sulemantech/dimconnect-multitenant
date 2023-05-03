import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './providers/AuthProvider';
import { ModalsProvider } from '@mantine/modals';
import { signal } from '@preact/signals';
import LZString from 'lz-string';
import { feature } from 'topojson-client'
import { Notifications } from '@mantine/notifications';

export const districts = signal({})

fetch('/german.json.lz').then(res => res.text()).then(res => {
  const uncompressed = JSON.parse(LZString.decompressFromBase64(res))

  const parsed = feature(uncompressed, uncompressed?.objects?.german)

  districts.value = parsed

})

export const mapClickBindings = signal({})

export function App() {

  return (

    <>
      <MantineProvider theme={{ fontFamily: 'Greycliff CF, sans-serif' }}>
        <ModalsProvider modalProps={{
          overlayProps: {
            style : {
              backdropFilter: 'blur(3px)'
            }
          },
          lockScroll:false
          
        }}>
          <Notifications />
            
            <div className='select-none antialiased text-gray-700 ='>
              <AuthProvider />
            </div>
         
        </ModalsProvider>
      </MantineProvider>
    </>

  )
}
