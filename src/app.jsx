import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import LZString from 'lz-string';
import { feature } from 'topojson-client'
import { Notifications } from '@mantine/notifications';
import { Suspense, lazy } from 'preact/compat';

const DrawerProvider = lazy(() => import('./providers/DrawerProvider'));
const AuthProvider = lazy(() => import('./providers/AuthProvider'));

import { districts } from './signals';

fetch('/german.json.lz').then(res => res.text()).then(res => {
  const uncompressed = JSON.parse(LZString.decompressFromBase64(res))

  const parsed = feature(uncompressed, uncompressed?.objects?.german)

  districts.value = parsed

})

export function App() {

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Greycliff CF, sans-serif',
        colors: {
          brand: '#0071b9',

        },
        // hover color
        primaryColor: 'brand',
        components: {
          'Button': {
            defaultProps: {
              variant: 'filled',
              mx: 5,
              className: "bg-[#0071b9] hover:bg-sky-800 hover:scale-95 transition-all duration-200 ease-in-out"
            }
          },
        }
      }}

    >
      
      <Suspense fallback={<LoadingOverlay visible />} >
        <ModalsProvider modalProps={{
          overlayProps: {
            style: {
              backdropFilter: 'blur(3px)'
            }
          },
          lockScroll: false

        }}>
          <Notifications />
          <DrawerProvider />

          <div className='select-none antialiased text-gray-700 ='>
            <AuthProvider />
          </div>
        </ModalsProvider>
      </Suspense>
    </MantineProvider>


  )
}
