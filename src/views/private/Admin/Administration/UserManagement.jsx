import PageProvider from "../../../../providers/PageProvider";
import CustomTable from "../../../../components/CustomTable";
import {
  ActionIcon,
  Alert,
  BackgroundImage,
  Badge,
  Button,
  Card,
  CardSection,
  Chip,
  Divider,
  Loader,
  MANTINE_COLORS,
  MultiSelect,
  Pagination,
  Select,
  Text,
  Title,
} from "@mantine/core";
import {
  assignRolesToUser,
  createUser,
  deleteUser,
  editUser,
  getRoles,
  getUsers,
  getUserById,
} from "../../../../api";
import { useState, useLayoutEffect } from "preact/hooks";
import { IconUser, IconUserCheck, IconUserPlus } from "@tabler/icons";
import { IconUserCancel } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { closeDrawer, openDrawer } from "../../../../providers/DrawerProvider";
import PermissionWrapper from "../../../../providers/PermissionsProvider";
import { PERMISSIONS } from "../../../../common";
import { useTranslation } from "react-i18next";
import { districts } from "../../../../signals";
import { t } from "i18next";
import { openModal } from "@mantine/modals";

export default () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  const [roles, setRoles] = useState([]);
  const [ready, setReady] = useState(false);

  const getData = async () => {
    try {
      const rolesx = await getRoles().catch((e) => setRoles([]));
      setRoles(rolesx.data.roles);

      const users = await getUsers().catch((e) => setData([]));

      getUserById.assignData(users.data);
      setData(
        users.data.map((user) => ({
          ...user,
          "Assign Role": (
            <button
              className=" border-2 border-[#0E76BB] rounded-md px-1"
              onClick={() => {
                openModal({
                  title: (
                    <div className="flex flex-row p-4 text-white items-center space-x-2 ">
                      <img
                        src="/user2.svg"
                        alt="Title Image"
                        className="title-image"
                      />
                      <p> Assign Role</p>
                    </div>
                  ),
                  children: (
                    <div className="p-4">
                      {" "}
                      <AssignRole
                        user={user}
                        roles={rolesx.data.roles}
                        refreshData={refreshData}
                      />
                    </div>
                  ),
                  padding: "0",
                  withCloseButton: false,
                });
              }}
            >
              <Text
                mt={2}
                // variant="outline"
                color="#0E76BB"
                className=" text-sm font-medium"
              >
                {" "}
                + Assign Role
              </Text>
            </button>
          ),
        }))
      );
    } catch (err) {}

    setReady(true);
  };
  const refreshData = () => {
    getData();
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <PermissionWrapper permission={PERMISSIONS["User Management"]} view message>
      <PageProvider>
        <div className="">
          <div className="flex flex-wrap justify-center">
            <div className=" m-2 bg-white text-gray-700 rounded-lg px-5 pt-3   min-w-[250px] flex-1 flex">
              <div>
                <h2 className="text-lg font-bold">{t("Super Admin")}</h2>
                <div>
                    <div className=" absolute">
                      <svg
                        width="148"
                        height="82"
                        viewBox="0 0 210 82"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M142.52 46.15L127.74 52.27C130.4 58.84 131.91 65.99 131.98 73.49H147.98C147.92 63.82 145.97 54.6 142.52 46.14V46.15Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M126.63 22.06L115.32 33.37C120.38 38.52 124.5 44.6 127.37 51.34L142.15 45.22C138.47 36.53 133.16 28.69 126.63 22.06Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M0.00976562 74.49C0.269766 78.67 3.73977 81.99 7.97977 81.99C12.2198 81.99 15.6998 78.67 15.9498 74.49H0.00976562Z"
                          fill="#FF6161"
                        />
                        <path
                          d="M132.01 74.49C132.27 78.67 135.74 81.99 139.98 81.99C144.22 81.99 147.7 78.67 147.95 74.49H132H132.01Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M5.46 46.15C2.01 54.6 0.06 63.82 0 73.49H16C16.06 65.99 17.57 58.84 20.24 52.27L5.46 46.15Z"
                          fill="#FF6161"
                        />
                        <path
                          d="M102.76 5.83001L96.6396 20.61C103.38 23.48 109.47 27.59 114.62 32.65L125.93 21.34C119.31 14.8 111.46 9.50001 102.77 5.82001L102.76 5.83001Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M74.4902 0V16C81.9902 16.06 89.1502 17.56 95.7202 20.23L101.84 5.45C93.3802 2 84.1502 0.07 74.4902 0Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M52.2596 20.23C58.8296 17.57 65.9896 16.07 73.4896 16V0C63.8196 0.06 54.5896 2 46.1396 5.45L52.2596 20.23Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M33.3703 32.66C38.5203 27.6 44.6003 23.48 51.3403 20.61L45.2203 5.83002C36.5303 9.51002 28.6903 14.82 22.0703 21.35L33.3803 32.66H33.3703Z"
                          fill="#FF6161"
                        />
                        <path
                          d="M21.3501 22.06C14.8101 28.68 9.51008 36.52 5.83008 45.21L20.6101 51.33C23.4801 44.59 27.6001 38.51 32.6601 33.36L21.3501 22.05V22.06Z"
                          fill="#FF6161"
                        />
                      </svg>
                    </div>
                    <img
                      className="w-5  relative ml-[35%] pt-10 pb-2"
                      src="/userred.svg"
                      alt=""
                    />
                  </div>
              </div>

              <div className=" flex flex-1 "></div>
              <div className="flex flex-col items-end mt-[12%]">
                <span className="text-[#0E76BB] text-xs ml-2">+3,5%</span>
                <h3 className="text-2xl">19,860</h3>
                <p className="text-xs font-extralight opacity-70 italic">{t("Last week analytics")}</p>
              </div>
            </div>
            <div className=" m-2 bg-white text-gray-700 rounded-lg px-5 pt-3   min-w-[250px] flex-1 flex">
              <div>
                <h2 className="text-lg font-bold">{t("TRC Admin")}</h2>
                
                  <div>
                    <div className=" absolute">
                      <svg
                        width="148"
                        height="82"
                        viewBox="0 0 210 82"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M142.52 46.15L127.74 52.27C130.4 58.84 131.91 65.99 131.98 73.49H147.98C147.92 63.82 145.97 54.6 142.52 46.14V46.15Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M126.63 22.06L115.32 33.37C120.38 38.52 124.5 44.6 127.37 51.34L142.15 45.22C138.47 36.53 133.16 28.69 126.63 22.06Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M0.00976562 74.49C0.269766 78.67 3.73977 81.99 7.97977 81.99C12.2198 81.99 15.6998 78.67 15.9498 74.49H0.00976562Z"
                          fill="#FF862E"
                        />
                        <path
                          d="M132.01 74.49C132.27 78.67 135.74 81.99 139.98 81.99C144.22 81.99 147.7 78.67 147.95 74.49H132H132.01Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M5.46 46.15C2.01 54.6 0.06 63.82 0 73.49H16C16.06 65.99 17.57 58.84 20.24 52.27L5.46 46.15Z"
                          fill="#FF862E"
                        />
                        <path
                          d="M102.76 5.83001L96.6396 20.61C103.38 23.48 109.47 27.59 114.62 32.65L125.93 21.34C119.31 14.8 111.46 9.50001 102.77 5.82001L102.76 5.83001Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M74.4902 0V16C81.9902 16.06 89.1502 17.56 95.7202 20.23L101.84 5.45C93.3802 2 84.1502 0.07 74.4902 0Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M52.2596 20.23C58.8296 17.57 65.9896 16.07 73.4896 16V0C63.8196 0.06 54.5896 2 46.1396 5.45L52.2596 20.23Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M33.3703 32.66C38.5203 27.6 44.6003 23.48 51.3403 20.61L45.2203 5.83002C36.5303 9.51002 28.6903 14.82 22.0703 21.35L33.3803 32.66H33.3703Z"
                          fill="#FF862E"
                        />
                        <path
                          d="M21.3501 22.06C14.8101 28.68 9.51008 36.52 5.83008 45.21L20.6101 51.33C23.4801 44.59 27.6001 38.51 32.6601 33.36L21.3501 22.05V22.06Z"
                          fill="#FF862E"
                        />
                      </svg>
                    </div>
                    <img
                      className=" w-5  relative ml-[45%] pt-10 pb-2"
                      src="/userorange.svg"
                      alt=""
                    />
                  </div>
                
              </div>

              <div className=" flex flex-1 "></div>
              <div className="flex flex-col items-end mt-[12%]">
                <span className="text-[#0E76BB] text-xs ml-2">+3,5%</span>
                <h3 className="text-2xl ">19,860</h3>
                <p className="text-xs font-extralight opacity-70 italic">{t("Last week analytics")}</p>
              </div>
            </div>
            <div className=" m-2 bg-white text-gray-700 rounded-lg px-5 pt-3   min-w-[250px] flex-1 flex">
              <div>
                <h2 className="text-lg font-bold">{t("DIM Viewer")}</h2>
                <div>
                    <div className=" absolute">
                      <svg
                        width="148"
                        height="82"
                        viewBox="0 0 210 82"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M142.52 46.15L127.74 52.27C130.4 58.84 131.91 65.99 131.98 73.49H147.98C147.92 63.82 145.97 54.6 142.52 46.14V46.15Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M126.63 22.06L115.32 33.37C120.38 38.52 124.5 44.6 127.37 51.34L142.15 45.22C138.47 36.53 133.16 28.69 126.63 22.06Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M0.00976562 74.49C0.269766 78.67 3.73977 81.99 7.97977 81.99C12.2198 81.99 15.6998 78.67 15.9498 74.49H0.00976562Z"
                          fill="#0E76BB"
                        />
                        <path
                          d="M132.01 74.49C132.27 78.67 135.74 81.99 139.98 81.99C144.22 81.99 147.7 78.67 147.95 74.49H132H132.01Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M5.46 46.15C2.01 54.6 0.06 63.82 0 73.49H16C16.06 65.99 17.57 58.84 20.24 52.27L5.46 46.15Z"
                          fill="#0E76BB"
                        />
                        <path
                          d="M102.76 5.83001L96.6396 20.61C103.38 23.48 109.47 27.59 114.62 32.65L125.93 21.34C119.31 14.8 111.46 9.50001 102.77 5.82001L102.76 5.83001Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M74.4902 0V16C81.9902 16.06 89.1502 17.56 95.7202 20.23L101.84 5.45C93.3802 2 84.1502 0.07 74.4902 0Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M52.2596 20.23C58.8296 17.57 65.9896 16.07 73.4896 16V0C63.8196 0.06 54.5896 2 46.1396 5.45L52.2596 20.23Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M33.3703 32.66C38.5203 27.6 44.6003 23.48 51.3403 20.61L45.2203 5.83002C36.5303 9.51002 28.6903 14.82 22.0703 21.35L33.3803 32.66H33.3703Z"
                          fill="#0E76BB"
                        />
                        <path
                          d="M21.3501 22.06C14.8101 28.68 9.51008 36.52 5.83008 45.21L20.6101 51.33C23.4801 44.59 27.6001 38.51 32.6601 33.36L21.3501 22.05V22.06Z"
                          fill="#0E76BB"
                        />
                      </svg>
                    </div>
                    <img
                      className=" relative w-5  ml-[40%] pt-10 pb-2"
                      src="/userblue.svg"
                      alt=""
                    />
                  </div>
              </div>

              <div className=" flex flex-1 "></div>
              <div className="flex flex-col items-end mt-[12%]">
                <span className="text-[#0E76BB] text-xs ml-2">+3,5%</span>
                <h3 className="text-2xl">19,860</h3>
                <p className="text-xs font-extralight opacity-70 italic">{t("Last week analytics")}</p>
              </div>
            </div>
            <div className=" m-2 bg-white text-gray-700 rounded-lg px-5 pt-3   min-w-[250px] flex-1 flex">
              <div>
                <h2 className="text-lg font-bold">{t("Basic User")}</h2>
                <div>
                    <div className=" absolute">
                      <svg
                        width="148"
                        height="82"
                        viewBox="0 0 210 82"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M142.52 46.15L127.74 52.27C130.4 58.84 131.91 65.99 131.98 73.49H147.98C147.92 63.82 145.97 54.6 142.52 46.14V46.15Z"
                          fill="#F57F9"
                        />
                        <path
                          d="M126.63 22.06L115.32 33.37C120.38 38.52 124.5 44.6 127.37 51.34L142.15 45.22C138.47 36.53 133.16 28.69 126.63 22.06Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M0.00976562 74.49C0.269766 78.67 3.73977 81.99 7.97977 81.99C12.2198 81.99 15.6998 78.67 15.9498 74.49H0.00976562Z"
                          fill="#1DAF1A"
                        />
                        <path
                          d="M132.01 74.49C132.27 78.67 135.74 81.99 139.98 81.99C144.22 81.99 147.7 78.67 147.95 74.49H132H132.01Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M5.46 46.15C2.01 54.6 0.06 63.82 0 73.49H16C16.06 65.99 17.57 58.84 20.24 52.27L5.46 46.15Z"
                          fill="#1DAF1A"
                        />
                        <path
                          d="M102.76 5.83001L96.6396 20.61C103.38 23.48 109.47 27.59 114.62 32.65L125.93 21.34C119.31 14.8 111.46 9.50001 102.77 5.82001L102.76 5.83001Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M74.4902 0V16C81.9902 16.06 89.1502 17.56 95.7202 20.23L101.84 5.45C93.3802 2 84.1502 0.07 74.4902 0Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M52.2596 20.23C58.8296 17.57 65.9896 16.07 73.4896 16V0C63.8196 0.06 54.5896 2 46.1396 5.45L52.2596 20.23Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M33.3703 32.66C38.5203 27.6 44.6003 23.48 51.3403 20.61L45.2203 5.83002C36.5303 9.51002 28.6903 14.82 22.0703 21.35L33.3803 32.66H33.3703Z"
                          fill="#1DAF1A"
                        />
                        <path
                          d="M21.3501 22.06C14.8101 28.68 9.51008 36.52 5.83008 45.21L20.6101 51.33C23.4801 44.59 27.6001 38.51 32.6601 33.36L21.3501 22.05V22.06Z"
                          fill="#1DAF1A"
                        />
                      </svg>
                    </div>
                    <img
                      className=" w-5 relative ml-[50%] pt-10"
                      src="/usergreen.svg"
                      alt=""
                    />
                  </div>
              </div>

              <div className=" flex flex-1 "></div>
              <div className="flex flex-col items-end mt-[12%]">
                <span className="text-[#0E76BB] text-xs ml-2">+3,5%</span>
                <h3 className="text-2xl">19,860</h3>
                <p className="text-xs font-extralight opacity-70 italic">{t("Last week analytics")}</p>
              </div>
            </div>
            
            <div className=" m-2 bg-white text-gray-700 rounded-lg px-5 pt-3   min-w-[250px] flex-1 flex">
              <div>
                <h2 className="text-lg font-bold">{t("Others")}</h2>
                 <div>
                    <div className=" absolute">
                      <svg
                        width="148"
                        height="82"
                        viewBox="0 0 210 82"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M142.52 46.15L127.74 52.27C130.4 58.84 131.91 65.99 131.98 73.49H147.98C147.92 63.82 145.97 54.6 142.52 46.14V46.15Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M126.63 22.06L115.32 33.37C120.38 38.52 124.5 44.6 127.37 51.34L142.15 45.22C138.47 36.53 133.16 28.69 126.63 22.06Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M0.00976562 74.49C0.269766 78.67 3.73977 81.99 7.97977 81.99C12.2198 81.99 15.6998 78.67 15.9498 74.49H0.00976562Z"
                          fill="#878788"
                        />
                        <path
                          d="M132.01 74.49C132.27 78.67 135.74 81.99 139.98 81.99C144.22 81.99 147.7 78.67 147.95 74.49H132H132.01Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M5.46 46.15C2.01 54.6 0.06 63.82 0 73.49H16C16.06 65.99 17.57 58.84 20.24 52.27L5.46 46.15Z"
                          fill="#878788"
                        />
                        <path
                          d="M102.76 5.83001L96.6396 20.61C103.38 23.48 109.47 27.59 114.62 32.65L125.93 21.34C119.31 14.8 111.46 9.50001 102.77 5.82001L102.76 5.83001Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M74.4902 0V16C81.9902 16.06 89.1502 17.56 95.7202 20.23L101.84 5.45C93.3802 2 84.1502 0.07 74.4902 0Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M52.2596 20.23C58.8296 17.57 65.9896 16.07 73.4896 16V0C63.8196 0.06 54.5896 2 46.1396 5.45L52.2596 20.23Z"
                          fill="#F5F7F9"
                        />
                        <path
                          d="M33.3703 32.66C38.5203 27.6 44.6003 23.48 51.3403 20.61L45.2203 5.83002C36.5303 9.51002 28.6903 14.82 22.0703 21.35L33.3803 32.66H33.3703Z"
                          fill="#878788"
                        />
                        <path
                          d="M21.3501 22.06C14.8101 28.68 9.51008 36.52 5.83008 45.21L20.6101 51.33C23.4801 44.59 27.6001 38.51 32.6601 33.36L21.3501 22.05V22.06Z"
                          fill="#878788"
                        />
                      </svg>
                    </div>
                    <img
                      className=" w-5 relative ml-[70%] pt-10"
                      src="/usergray.svg"
                      alt=""
                    />
                  </div>
              </div>

              <div className=" flex flex-1 "></div>
              <div className="flex flex-col items-end mt-[12%]">
                <span className="text-[#0E76BB] text-xs ml-2">+3,5%</span>
                <h3 className="text-2xl">19,860</h3>
                <p className="text-xs font-extralight opacity-70 italic">{t("Last week analytics")}</p>
              </div>
            </div>
          </div>

          <div>
            {ready ? (
              <CustomTable
                title={t("Users Management")}
                attributes={[
                  "id",
                  "email",
                  "userRole",
                  "vorname",
                  "nachname",
                  "agreement_signed",
                  "roles",
                  "Assign Role",
                ]}
                remove
                edit
                data={data}
                newStruct={{
                  data: {
                    vorname: "",
                    nachname: "",
                    email: "",
                    password: "",
                    agreement_signed: false,
                    ags_right: {
                      type: "radio",
                      defaultValue: 0,
                      options: [
                        {
                          label: "View",
                          value: 1,
                        },
                        {
                          label: "Write",
                          value: 2,
                        },
                      ],
                    },
                    isEditor: false,
                    ags: districts.value?.features?.map((district) => ({
                      label: district.properties.n.toString(),
                      value: district.properties.c[0],
                    })),
                  },
                  createMethod: createUser,
                  deleteMethod: deleteUser,
                  editMethod: editUser,
                  getMethod: getUserById.findUserById,
                }}
                refreshData={refreshData}
              >
                <RoleSelectOnCreate roles={roles} />
              </CustomTable>
            ) : (
              <div className="min-h-[300px] items-center flex justify-center">
                <Loader color="brand" />
              </div>
            )}
          </div>
        </div>
      </PageProvider>
    </PermissionWrapper>
  );
};

const AssignRole = ({ user, roles, refreshData }) => {
  const { t } = useTranslation();

  const [selectedRole, setSelectedRole] = useState(user.userRole);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const assignRole = async () => {
    const temp = {};
    selectedRole.forEach((role) => {
      temp[role] = roles.find((r) => r.id === role).name;
    });

    setLoading(true);
    try {
      const res = await assignRolesToUser(user.id, temp);
      setSuccess(true);
      setMessage(res.message);
      refreshData();
      closeDrawer();
    } catch (err) {
      setError(true);
      setMessage(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <PermissionWrapper permission={PERMISSIONS["User Management"]} add>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* user details */}

          <div>
            <div className="flex flex-col m-auto">
              <p className="flex justify-between items-center h-10">
                <Text className="text-sm">{t("User ID")}</Text>
                <Text color="brand" className="mt-1">
                  {user.id}
                </Text>
              </p>
              <Divider />
              <p className="flex justify-between items-center h-10">
                <Text className="text-sm">{t("Email")}</Text>
                <Text color="brand" className="mt-1">
                  {user.email}
                </Text>
              </p>
              <Divider />
              <p className="flex justify-between items-center h-10">
                <Text className="text-sm">{t("Name")}</Text>
                <Text color="brand" className="mt-1">
                  {user.vorname} {user.nachname}
                </Text>
              </p>
              <Divider />
              <p className="flex justify-between items-center h-10">
                <Text className="text-sm">{t("Existing Role")}</Text>
                <Text color="brand" className="mt-1">
                  {user.userRole?.join(", ")}
                </Text>
              </p>
              <Divider />
            </div>
          </div>

          <Title size={"sm"} mt={20}>
            {t("Select Role")}
          </Title>

          <MultiSelect
            className="mt-1"
            data={roles?.map((role, index) => ({
              value: role.id,
              label: <Badge color={MANTINE_COLORS[index]}>{role.name}</Badge>,
            }))}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e)}
          />
        </div>
        <div className="flex flex-col mt-2">
          <Button
            onClick={assignRole}
            loading={loading}
            disabled={loading}
            className="mt-2"
            variant="default"
          >
            Assign Role
          </Button>
        </div>
        {error && (
          <div className="mt-2">
            <Alert severity="error">{message}</Alert>
          </div>
        )}
        {success && (
          <div className="mt-2">
            <Alert severity="success">{message}</Alert>
          </div>
        )}
      </div>
    </PermissionWrapper>
  );
};

const RoleSelectOnCreate = ({ roles }) => {
  const [selectedRole, setSelectedRole] = useState([]);
  const temp = {};
  selectedRole.forEach((role) => {
    temp[role] = roles.find((r) => r.id === role).name;
  });
  return (
    <>
      <Title size={"sm"} mt={20}>
        {t("Select Role")}
      </Title>
      <input type="hidden" name="roles" value={JSON.stringify(temp)} />
      <MultiSelect
        className="mt-1"
        data={roles?.map((role, index) => ({
          value: role.id,
          label: <Badge color={MANTINE_COLORS[index]}>{role.name}</Badge>,
        }))}
        value={selectedRole}
        onChange={(e) => setSelectedRole(e)}
      />
    </>
  );
};
