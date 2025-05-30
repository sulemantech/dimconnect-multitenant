import 'maplibre-gl/dist/maplibre-gl.css';

import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import LZString from 'lz-string';
import { Suspense, lazy } from 'preact/compat';
import { feature } from 'topojson-client'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import "./index.css";

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
const path =  window.location.pathname

  const style = path!=='/map'? {transform: 'scale(0.9)'} : {}

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Roboto Condensed, Roboto',
        primaryShade: 4,
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
              loaderProps: {
                color: 'brand',
                size: 'sm',
              },
              radius: 'lg',

              style: {
                boxShadow: '0px 0px 3px 1px rgba(0,0,0,0.25)',
              },
              className: "px-10 text-[#0E76BB] font-semibold capitalize hover:scale-95 active:bg-sky-400 hover:bg-sky-200 bg-[#D8E4EEE5]  justify-self-end items-end hover:shadow-md transition-all duration-200 ease-in-out ripple-bg-sky-50"
            },

          },
          'Title':{
            defaultProps : {
              style : {
                fontWeight : 500,
              }
            }
          },
          'Table' : {
            defaultProps : {
              style : {
                backgroundColor : '#fff',
              }
            }
          },
          LoadingOverlay: {
            defaultProps: {
              color: 'brand',
              loaderProps: {
                variant: 'bars',
                color: 'brand',
                size: 'xl',
              }
            },
          }
        }
      }}

    >



<Trans>

      <Suspense fallback={<LoadingOverlay visible />} >
        
        <ModalsProvider modalProps={{
          overlayProps: {
            style: {
              backdropFilter: 'blur(3px)',
              
            },
          },
          classNames: {
            inner: 'shadow-2xl border-2 border-gray-200 rounded-xl',
            
          },
          lockScroll: false
        
        }}>
          <Notifications />
          <DrawerProvider />

          <div className='select-none antialiased scroll-smooth text-gray-700 '
            // style={style}
          >
            <AuthProvider />
          </div>
        </ModalsProvider>
      </Suspense>
          </Trans>
    </MantineProvider>


  )
}
