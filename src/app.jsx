import './app.css'
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './providers/AuthProvider';
import { ModalsProvider } from '@mantine/modals';

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
