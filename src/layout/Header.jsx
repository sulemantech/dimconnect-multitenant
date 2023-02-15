import { Avatar, Group, Input, Menu, Text, Select, Burger } from "@mantine/core"
import { IconChevronDown, IconLogout, IconSearch } from "@tabler/icons"
import { useContext } from "preact/hooks"
import { AuthState } from "../providers/AuthProvider"
import { signal } from '@preact/signals'
import { collapsed } from "./Navbar"
import { useRouter } from "preact-router"
import { districts } from "../app"
export const dropvalue = signal('')


const tilesAvailable = [
  { label: 'Bad Neuenahr-Ahrweiler', value: '071310007' },
  { label: 'Maifield', value: '071375002' },
  { label: 'Lambrecht (Pfalz)', value: '073325005' },
  { label: 'Hachenburg', value: '071435002' },
  { label: 'Vordereifel (Verbandsgemeinde)', value: '071375003' },
  { label: 'bad Breisig', value: '071315003' },
  { label: 'Bobenheim-Roxheim', value: '073380004' },
  { label: 'Baumholder (Verbandsgemeinde)', value: '071345001' },
  { label: 'Rhein-Mosel (Verbandsgemeinde)', value: '071375009' },
  { label: 'Alzey-Land (Verbandsgemeinde)', value: '073315001' },
  { label: 'Budenheim (Verbandsfreie Gemeinde)', value: '073390009' },
  { label: 'Kirchen (Sieg) (Verbandsgemeinde)', value: '071325007' },
  { label: 'Maikammer (Verbandsgemeinde)', value: '073375006' },
  { label: 'Monsheim (Verbandsgemeinde)', value: '073315003' },
  { label: 'Otterbach-Otterberg (Verbandsgemeinde)', value: '073355010' },
  { label: 'Pellenz (Verbandsgemeinde)', value: '071375001' },
  { label: 'Mayen (Verbandsfreie Gemeinde)', value: '071370068' },
  { label: 'Annweiler am Trifels (Verbandsgemeinde)', value: '073375001' },
  { label: 'Maxdorf (Verbandsgemeinde)', value: '073385004' },
  { label: 'Lambsheim-Heßheim (Verbandsgemeinde)', value: '073385006' },
  { label: 'Freinsheim (Verbandsgemeinde)', value: '073325002' },
  { label: 'Grünstadt (Verbandsfreie Gemeinde)', value: '073320024' },
  { label: 'Herxheim (Verbandsgemeinde)', value: '073375004' },
  { label: 'Haßloch (Verbandsfreie Gemeinde)', value: '073320025' },
  
]

export default () => {
  const route = useRouter()
  const auth = useContext(AuthState)
  const logout = () => {
    sessionStorage.removeItem('hf8f8fj3dj193jf913fj91f91jf9')
    auth.setAuth(false)
  }
  return (
    <div className="absolute shadow-lg border-white border-solid border-2 items-center right-0 left-0 m-2 rounded-2xl top-0 z-10 h-20  flex px-4 bg-components-horizontal backdrop-blur-2xl">
      <Burger 
        onClick={() => {
          collapsed.value = !collapsed.value
        }}
        className="mr-4"
        color="white"
        size="sm"
        opened={collapsed.value}
      />
      
      <div className="flex-grow font-thin text-white text-lg">
        <h6>
          {route[0].url.replace('/', '').toUpperCase() || 'DASHBOARD'}
        </h6>
        </div>
    

        <Select
          className="ml-4"
          radius="xl"
          size="sm"
          placeholder="Select"
          searchable
          autoComplete="on"
          data={tilesAvailable}
          sx={{ width: 200 }}
          defaultValue={dropvalue.value}
          onChange={(value) => {
            dropvalue.value = value
          }}
        />
<div className="ml-4">
        </div>
<Menu
        width={260}
        position="bottom-end"
        transition="pop-top-right"

      >
        <Menu.Target> 
          <div className="items-center flex cursor-pointer hover:scale-105 transition-all">
            <Group color="white" spacing={7}>
              <Avatar size='md' radius="xl"  />
            
             
            </Group>
          </div>
        </Menu.Target>
        <Menu.Dropdown>

          <Menu.Item color="red" icon={<IconLogout size={14} stroke={1.5} />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      

    </div>
  )
}