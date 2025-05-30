import PageProvider from "../../../../providers/PageProvider";
import CustomTable from "../../../../components/CustomTable";
import {
  Alert,
  Badge,
  Loader,
  MANTINE_COLORS,
  MultiSelect,
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
  getRegionList,
  getUsersCount,
} from "../../../../api";
import { useState, useLayoutEffect } from "preact/hooks";
import { useEffect } from "preact/hooks";
import PermissionWrapper from "../../../../providers/PermissionsProvider";
import { PERMISSIONS } from "../../../../common";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { closeAllModals, openModal } from "@mantine/modals";

// const colors = ["#FF6161","#FF862E","#0E76BB", "#1DAF1A", "#878788"];
const images = [
  "/userred.svg",
  "/userorange.svg",
  "/userblue.svg",
  "/usergreen.svg",
  "/usergray.svg",
];

export default () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [ready, setReady] = useState(false);

  const [usersCountsData, setUsersCountsData] = useState([
    {
      color: "#FF6161",
      count: 0,
      title: "Super Admin",
      percentage: 0,
    },
    {
      color: "#FF862E",
      count: 0,
      title: "TRC Admin",
      percentage: 0,
    },
    {
      color: "#0E76BB",
      count: 0,
      title: "DIM Viewer",
      percentage: 0,
    },
    {
      color: "#1DAF1A",
      count: 0,
      title: "Basic User",
      percentage: 0,
    },
    {
      color: "#878788",
      count: 0,
      title: "Others",
      percentage: 0,
    },
  ]);

  const fetchRegionData = async () => {
    try {
      const response = await getRegionList();
      const regionData = response.data;

      const mappedRegions = regionData.map((region) => ({
        label: region.name,
        value: region.ags,
      }));

      setRegions(mappedRegions);
      // console.log("Fetched region data:", mappedRegions);
    } catch (error) {
      console.error("Error fetching region data:", error);
    }
  };
  const getData = async () => {
    try {
      const rolesx = await getRoles().catch((e) => setRoles([]));
      setRoles(rolesx.data.roles);

      const users = await getUsers().catch((e) => setData([]));

      const usersCount = await getUsersCount();
      // console.log("users count api call data ===================>>>>", usersCount.data)
      // set data respoectively in the array of usersCountsData
      let totalCount =
        usersCount.data.superAdminCount +
        usersCount.data.trcAdminCount +
        usersCount.data.dimViewerCount +
        usersCount.data.basicUserCount +
        usersCount.data.otherRolesCount;
      setUsersCountsData([
        {
          color: "#FF6161",
          count: usersCount.data.superAdminCount,
          title: "Super Admin",
          percentage: Math.round(
            (usersCount.data.superAdminCount / totalCount) * 100
          ),
        },
        {
          color: "#FF862E",
          count: usersCount.data.trcAdminCount,
          title: "TRC Admin",
          percentage: Math.round(
            (usersCount.data.trcAdminCount / totalCount) * 100
          ),
        },
        {
          color: "#0E76BB",
          count: usersCount.data.dimViewerCount,
          title: "DIM Viewer",
          percentage: Math.round(
            (usersCount.data.dimViewerCount / totalCount) * 100
          ),
        },
        {
          color: "#1DAF1A",
          count: usersCount.data.basicUserCount,
          title: "Basic User",
          percentage: Math.round(
            (usersCount.data.basicUserCount / totalCount) * 100
          ),
        },
        {
          color: "#878788",
          count: usersCount.data.otherRolesCount,
          title: "Others",
          percentage: Math.round(
            (usersCount.data.otherRolesCount / totalCount) * 100
          ),
        },
      ]);

      getUserById.assignData(users.data);
      setData(
        users.data.map((user) => ({
          ...user,
          "Assign Role": (
            <button
              className=" border-2 border-[#0E76BB] rounded-md px-1"
              onClick={() => {
                openModal({
                  closeOnClickOutside: false,
                  title: (
                    <div className="flex justify-between p-4 w-[55vw] bg-cover bg-center text-white items-center bg-[url('/Rectangle973.png')] bg-no-repeat">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          src="/user2.svg"
                          alt="Title Image"
                          className="title-image"
                        />
                        <p>{t("Assign Role")}</p>
                      </div>
                      <button onClick={closeAllModals} className="text-white">
                        ✕
                      </button>
                    </div>
                  ),
                  children: (
                    <div className="p-4 text-black">
                      {" "}
                      <AssignRole
                        user={user}
                        roles={rolesx.data.roles}
                        refreshData={refreshData}
                      />
                    </div>
                  ),
                  size: "55vw",
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
                {t("+ Assign Role")}
              </Text>
            </button>
          ),
        }))
      );
      fetchRegionData();
    } catch (err) {}

    setReady(true);
  };
  const refreshData = () => {
    getData();
  };

  useLayoutEffect(() => {
    getData();
  }, [t]);

  return (
    <PermissionWrapper permission={PERMISSIONS["User Management"]} view message>
      <PageProvider>
        <div
          id="scale-down"
          className="flex justify-center max-laptop1:grid max-laptop1:grid-cols-2 max-Mobile:flex max-Mobile:flex-col"
        >
          {usersCountsData.map((color, index) => (
            <div
              key={index}
              className="m-2 h-auto justify-between bg-white text-gray-700 rounded-lg px-3 pt-3 pb-3.5 min-w-fit flex flex-1 "
            >
              <div className="flex flex-col">
              <div className="text-lg  max-2xl:text-base max-2xl:w-[6.7rem] max-md:w-fit break-words font-bold ">
                {t(usersCountsData[index].title)}
              </div>
              
                <div className="flex justify-center items-center w-fit ">
                  <div className=" relative">
                    <svg
                      width="110"
                      height="82"
                      viewBox="0 0 150 82"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.00976562 74.49C0.269766 78.67 3.73977 81.99 7.97977 81.99C12.2198 81.99 15.6998 78.67 15.9498 74.49H0.00976562Z"
                        fill={
                          usersCountsData[index].percentage !== 0 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M5.46 46.15C2.01 54.6 0.06 63.82 0 73.49H16C16.06 65.99 17.57 58.84 20.24 52.27L5.46 46.15Z"
                        fill={
                          usersCountsData[index].percentage > 10 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M21.3501 22.06C14.8101 28.68 9.51008 36.52 5.83008 45.21L20.6101 51.33C23.4801 44.59 27.6001 38.51 32.6601 33.36L21.3501 22.05V22.06Z"
                        fill={
                          usersCountsData[index].percentage > 20 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M33.3703 32.66C38.5203 27.6 44.6003 23.48 51.3403 20.61L45.2203 5.83002C36.5303 9.51002 28.6903 14.82 22.0703 21.35L33.3803 32.66H33.3703Z"
                        fill={
                          usersCountsData[index].percentage > 30 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M52.2596 20.23C58.8296 17.57 65.9896 16.07 73.4896 16V0C63.8196 0.06 54.5896 2 46.1396 5.45L52.2596 20.23Z"
                        fill={
                          usersCountsData[index].percentage > 40 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M74.4902 0V16C81.9902 16.06 89.1502 17.56 95.7202 20.23L101.84 5.45C93.3802 2 84.1502 0.07 74.4902 0Z"
                        fill={
                          usersCountsData[index].percentage > 50 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M102.76 5.83001L96.6396 20.61C103.38 23.48 109.47 27.59 114.62 32.65L125.93 21.34C119.31 14.8 111.46 9.50001 102.77 5.82001L102.76 5.83001Z"
                        fill={
                          usersCountsData[index].percentage > 60 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M126.63 22.06L115.32 33.37C120.38 38.52 124.5 44.6 127.37 51.34L142.15 45.22C138.47 36.53 133.16 28.69 126.63 22.06Z"
                        fill={
                          usersCountsData[index].percentage > 70 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M142.52 46.15L127.74 52.27C130.4 58.84 131.91 65.99 131.98 73.49H147.98C147.92 63.82 145.97 54.6 142.52 46.14V46.15Z"
                        fill={
                          usersCountsData[index].percentage > 80 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                      <path
                        d="M132.01 74.49C132.27 78.67 135.74 81.99 139.98 81.99C144.22 81.99 147.7 78.67 147.95 74.49H132H132.01Z"
                        fill={
                          usersCountsData[index].percentage > 90 &&
                          usersCountsData[index].percentage <= 100
                            ? usersCountsData[index].color
                            : "#F5F7F9"
                        }
                      />
                    </svg>
                  </div>
                  <img
                    className=" w-[25px] 2xl:w-[30px] absolute mr-[1rem] mt-[3rem]  pb-2"
                    src={images[index]}
                    alt=" "
                  />
                </div>
              </div>
              <div className=" flex  "></div>
              <div className="flex flex-col items-end  mt-[2.7rem]">
                <span className=" text-xs ml-2 text-[#0E76BB]">
                  {"+" + usersCountsData[index].percentage}%
                </span>
                <h3 className="text-2xl ">{usersCountsData[index].count}</h3>
                <p className="text-xs w-[85px] max-2xl:text-[9px] font-extralight opacity-70 italic">
                  {t("Last week analytics")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div id="scale-down" className="max-xl:overflow-x-scroll max-xl:w-screen">
          {ready ? (
            <CustomTable
              title={t("Create New User")}
              attributes={[
                "id",
                "roles",
                "email",
                "vorname",
                "nachname",
                "agreement_signed",
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
                  ags: regions,
                  agreement_signed: false,
                  isEditor: false,
                  ags_right: {
                    type: "radio",
                    defaultValue: 0,
                    options: [
                      {
                        label: t("View"),
                        value: 1,
                      },
                      {
                        label: t("Write"),
                        value: 2,
                      },
                    ],
                  },
                  // ags: districts.value?.features?.map((district) => ({
                  //   label: district.properties.n.toString(),
                  //   value: district.properties.c[0],
                  // })),
                },
                createMethod: createUser,
                deleteMethod: false,
                editMethod: editUser,
                getMethod: getUserById.findUserById,
              }}
              createMethodName={t("Add User")}
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
      </PageProvider>
    </PermissionWrapper>
  );
};

const AssignRole = ({ user, roles, refreshData }) => {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState(
    Object.keys(user.roles).map((role) => parseInt(role))
  );
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
      setMessage("Role assigned successfully");
      refreshData();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      closeAllModals();
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
            <div className="flex flex-col space-y-4 ">
              <div className="flex justify-center   items-center h-12">
                <Text className="text-xs w-[9vw] text-left">
                  {t("User ID")}
                </Text>
                <div className=" h-11 w-[30vw] bg-[#F5F7F9] pl-4 rounded-md">
                  <Text color="F5F7F9" className="mt-3 text-xs">
                    {user.id}
                  </Text>
                </div>
              </div>

              <div className="flex justify-center   items-center h-12">
                <Text className="text-xs w-[9vw] text-left">{t("Mail")}</Text>
                <div className=" h-11 w-[30vw] bg-[#F5F7F9] pl-4 rounded-md">
                  <Text color="F5F7F9" className="mt-3 text-xs">
                    {user.email}
                  </Text>
                </div>
              </div>
              <div className="flex justify-center  items-center h-12">
                <Text className="text-xs w-[9vw] text-left">{t("Name")}</Text>
                <div className=" h-11 w-[30vw] bg-[#F5F7F9] pl-4 rounded-md">
                  <Text color="F5F7F9" className="mt-3 text-xs">
                    {user.vorname} {user.nachname}
                  </Text>
                </div>
              </div>
              <div className="flex justify-center  items-center h-12">
                <Text className="text-xs w-[9vw] text-left">
                  {t("Existing Role")}
                </Text>
                <div className=" h-11 w-[30vw] bg-[#F5F7F9] pl-4 rounded-md">
                  <Text color="F5F7F9" className="mt-3 text-xs">
                    {user.roles &&
                      Object.keys(user.roles).map((role, index) => (
                        <Badge color={MANTINE_COLORS[index]}>
                          {user.roles[role]}
                        </Badge>
                      ))}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center mt-4">
            <Text className="text-sm w-[9vw]">{t("Select Role")}</Text>
            <div className="w-[30vw]">
              <MultiSelect
                variant="filled"
                className="mt-1 w-[15vw]"
                data={roles?.map((role, index) => ({
                  value: role.id,
                  label: (
                    <Badge color={MANTINE_COLORS[index]}>{role.name}</Badge>
                  ),
                }))}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 mt-2">
          <button
            className="mt-4 flex flex-1 bg-[#dde4eb] ml-[4vw]  w-[10vw] px-2 py-2 justify-center font-bold shadow-sm shadow-black text-[#0E76BB] rounded-[16px]"
            onClick={assignRole}
          >
            {t("Assign Role")}
          </button>
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
      <div className="flex flex-row mt-4  text-sm justify-center items-center">
        <Title size={"sm"} mt={20} className="w-[9vw]">
          {t("Select Role")}
        </Title>
        <div className="w-[30vw]">
          <input type="hidden" name="roles" value={JSON.stringify(temp)} />
          <MultiSelect
            variant="filled"
            className="mt-1 w-[15vw]"
            data={roles?.map((role, index) => ({
              value: role.id,
              label: <Badge color={MANTINE_COLORS[index]}>{role.name}</Badge>,
            }))}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e)}
          />
        </div>
      </div>
    </>
  );
};
