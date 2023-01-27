import './app.css'
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './providers/AuthProvider';

export function App() {

  return (

    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AuthProvider />
      </MantineProvider>
    </>

  )
}
