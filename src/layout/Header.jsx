import { Avatar, Group, Input, Menu, Text, Select, Burger } from "@mantine/core"
import { IconChevronDown, IconLogout, IconSearch } from "@tabler/icons"
import { useContext } from "preact/hooks"
import { AuthState } from "../providers/AuthProvider"
import { signal } from '@preact/signals'
import { collapsed } from "./Navbar"
import { useRouter } from "preact-router"
import { districts } from "../app"
export const dropvalue = signal('071310007')
export default () => {
  const route = useRouter()
  const auth = useContext(AuthState)
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
          // searchable={!dropvalue.value ? false : true}
          data={districts.value?.features?.map((district) => {
            return {
              label: district.properties.n,
              value: district.properties.c
            }
          }) || []}
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

          <Menu.Item color="red" icon={<IconLogout size={14} stroke={1.5} />} onClick={() => auth.setAuth(false)}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      

    </div>
  )
}