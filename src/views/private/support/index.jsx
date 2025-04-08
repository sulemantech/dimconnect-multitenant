import { Button, Card, CardSection, Divider, Pagination, Switch, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons";
import React, { useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { openDrawer } from "../../../providers/DrawerProvider";
import PageProvider from "../../../providers/PageProvider";
import { permissible } from "../../../signals";
import InfoCard from "./Card";

export default () => {
  const [limit, setLimit] = useState(10);
  const [role, setRole] = useState({ id: 1, name: 'Admin', description: 'Admin' })
  const [data, setData] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Admin",
      permissions: <Button leftIcon={<IconEye />} size="xs" radius={'xl'}
        onClick={() => {
          openDrawer({
            title: 'Permissions',
            children: <PermissionList id={role.id} name={role.name} description={role.description} />
          })
        }}
      >View</Button>,
    },
    {
      id: 2,
      name: "User",
      description: "User",
      permissions: <Button leftIcon={<IconEye />} size="xs" radius={'xl'}
        onClick={() => {
          openDrawer({
            title: 'Permissions',
            children: <PermissionList id={role.id} name={role.name} description={role.description} />
          })
        }}
      >View</Button>
    },
    {
      id: 3,
      name: "Guest",
      description: "Guest",
      permissions: <Button leftIcon={<IconEye />} size="xs" radius={'xl'}
        onClick={() => {
          openDrawer({
            title: 'Permissions',
            children: <PermissionList id={role.id} name={role.name} description={role.description} />
          })
        }}
      >View</Button>
    },
  ]);
  const [dataInfo, setDataInfo] = useState({ page: 0, count: 10 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)


  const [cards, setCards] = useState([
    {
      id: 0,
      title: "Open",
      count: 10,
      color: "blue",
      active: true,
    },
    {
      id: 1,
      title: "In Progress",
      count: 10,
      color: "yellow",
      active: false,
    },
    {
      id: 2,
      title: "Closed",
      count: 10,
      color: "green",
      active: false,
    },
  ]);

  const cardClickHandler = (id) => {
    setCards((cards) =>
      cards.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            active: true,
          };
        } else {
          return {
            ...card,
            active: false,
          };
        }
      })
    );
  };
  return (
    <PageProvider>
      <div className="h-[83vh]">
        <div className="flex items-center justify-between">
          {/* <Card /> */}
          {cards.map((card) => (
            <InfoCard
              key={card.id}
              id={card.id}
              title={card.title}
              count={card.count}
              color={card.color}
              active={card.active}
              handleClick={cardClickHandler}
            />
          ))}
        </div>
        <div className="flex flex-col bg-white rounded-xl shadow-lg p-4 w-full mt-4">
          <Card>
            <CardSection className="p-2">
              <h6 className="font-bold text-neutral-700 tracking-wider">
                Support Tickets Overview
              </h6>
              <Divider />
            </CardSection>

            <CustomTable
              attributes={["name", "description", "permissions"]}
              remove
              edit
              data={data}
              setLimit={setLimit}
              newStruct={{
                data: {
                  name: "",
                  description: "",
                },
                // createMethod: createRole,
                // deleteMethod: deleteRole,
                // editMethod: editRole,
              }}
            // refreshData={refreshData}
            >
              <Text>Permissions</Text>
              <Divider />

              <Table striped withBorder className="relative max-w-[100%]">
                <thead className="text-[10px]">
                  <tr>
                    {/* <td></td> */}
                    <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">
                      Component
                    </td>
                    <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                      Read
                    </td>
                    <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                      Write
                    </td>
                    <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                      Delete
                    </td>
                  </tr>
                </thead>
                <tbody className="text-[10px]">
                  {/* <tr>
                <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">
                    Select All
                    <ActionIcon
                        onClick={() => {
                            const elements = document.getElementsByClassName('PermissionsManagement__table')
                            elements.forEach(element => {
                                element.checked = true
                            })
                        }}
                    >
                        <IconCheck />
                    </ActionIcon>
                </td>
            </tr> */}


                  {Object.keys(permissible.value).map((key, index) => (
                    <tr key={index}>
                      <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">
                        {key}
                      </td>
                      <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                        <Switch
                          type={"checkbox"}
                          color="blue"
                          name={key + "__read"}
                          defaultChecked={permissible.value[key].read}
                          data-group="permissions"
                          data-group-value={key + "__read"}
                        />
                      </td>
                      <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                        <Switch
                          defaultChecked={permissible.value[key].write}
                          color="green"
                          name={key + "__write"}
                          data-group="permissions"
                          data-group-value={key + "__write"}
                        />
                      </td>
                      <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                        <Switch
                          defaultChecked={permissible.value[key].delete}
                          color="red"
                          name={key + "__delete"}
                          radioGroup="delete"
                          data-group="permissions"
                          data-group-value={key + "__delete"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CustomTable>

            <div className="flex w-full px-6 py-8">
              <p className="text-sm text-neutral-600">
                Showing {page * limit - limit + 1} to {page * limit} of{" "}
                {dataInfo.count} entries
              </p>
              <div className="flex-1"></div>
              <Pagination
                color={tenantConfig.GlobalConfiguration.bgcolor}
                total={Math.ceil(dataInfo.count / limit)}
                limit={limit}
                page={page}
                onChange={(page) => setPage(page)}
              />
            </div>
          </Card>
        </div>
      </div>
    </PageProvider>
  );
};
