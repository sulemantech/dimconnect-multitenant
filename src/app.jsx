import 'maplibre-gl/dist/maplibre-gl.css';

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
  // 1a7fc0	338dc7	4d9cce	66aad5 0071b9	0066a7	005a94	004f82	00446f
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Roboto Condensed, Roboto',
        primaryShade : 4,
        colors: {
          brand: ['#0E76BB', '#0E76BB', '#0E76BB', '#0E76BB', '#0E76BB', '#0E76BB', '#0E76BB', '#0E76BB', '#0E76BB'],
          
        },
        // hover color
        primaryColor: 'brand',
        components: {
          'Button': {
            defaultProps: {
              variant: 'filled',
              uppercase: true,
              size: 'lg',
              style: {
                boxShadow: '0px 0px 3px 1px rgba(0,0,0,0.25)',
              },
              className: "text-[#0E76BB] font-semibold capitalize hover:scale-95 active:bg-sky-400 hover:bg-sky-200 bg-sky-100 rounded-2xl justify-self-end items-end hover:shadow-md transition-all duration-200 ease-in-out"
            },
            styles:{
              leftIcon:{
                backgroundColor: '#0E76BB',
                borderRadius: '50%',
              },
              label:{
                fontSize: '16px',
                margin : '1rem 2rem',
              }
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

          <div className='select-none antialiased scroll-smooth text-gray-700 '>
            <AuthProvider />
          </div>
        </ModalsProvider>
      </Suspense>
    </MantineProvider>


  )
}
