import { Avatar, Group, Input, Menu, Text , Select } from "@mantine/core"
import { IconChevronDown, IconLogout, IconSearch } from "@tabler/icons"
import { useContext } from "preact/hooks"
import { AuthState } from "../providers/AuthProvider"
import { signal } from '@preact/signals'
export const dropvalue = signal(false)
export default () => {
    const auth = useContext(AuthState)
    return (
        <div className="sticky m-2 rounded-2xl top-0 z-10 h-20 flex px-4 bg-gradient-to-r from-sky-600 to-sky-800">

            {/* Search Bar */}
            <div className="flex-grow flex items-center shadow-lg">
                <Input placeholder="Search" icon={<IconSearch />} variant="filled" radius={'xl'} />
            </div>
 {/* Search Bar */}
 <div className="flex-grow flex items-center shadow-lg">
 <Select
     
      placeholder="Pick one"
      data={[
        { value: '071435002', label: ' 071435002' },
        { value: '071310007 ', label: '071310007 ' },
        { value: '073325005 ', label: '073325005 ' },
     
      ]}
      onChange = {data=>{
       
        dropvalue.value = data ;
        console.log(dropvalue)
      }}
    />
            </div>
            <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
      
          >
            <Menu.Target>
              <div className="items-center flex cursor-pointer hover:scale-105 transition-all">
                <Group spacing={7}>
                  <Avatar  radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    Username
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
                </div>
            </Menu.Target>
            <Menu.Dropdown>
              
              <Menu.Item color="red" icon={<IconLogout size={14} stroke={1.5} />} onClick={()=>auth.setAuth(false)}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

        </div>
    )
}