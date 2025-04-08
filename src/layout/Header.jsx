import {
  Anchor,
  Avatar,
  Box,
  Breadcrumbs,
  Burger,
  Menu,
  Select,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { route, useRouter } from "preact-router";
import { useContext, useLayoutEffect, useState } from "preact/hooks";

import {
  IconArrowBadgeRightFilled,
  IconChevronRight,
  IconMan,
  IconUserCircle,
} from "@tabler/icons-react";
import appConfig from "../config/appConfig";
import { AuthState } from "../providers/AuthProvider";
import {
  dropvalue,
  regsionListSignal,
  userDataSignal,
  collapsed,
} from "../signals";
import LanguageButton from "../components/LanguageButton";
import { useTranslation } from "react-i18next";
import tenantConfig  from "../../config";

// {
//   "ags": "073310000",
//   "name": "Alzey-Worms",
//   "bezeichnung": "Kreis",
//   "bemerkung": "Kreis",
//   "kreis": null,
//   "groupid": "021_Alzey-Worms"
// }

export default () => {
  const router = useRouter();
  const auth = useContext(AuthState);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [regsionList, setRegsionList] = useState([]);
  const [ags, setAgs] = useState("NULL");
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const unsub = () => {
      dropvalue.subscribe((value) => {
        setAgs(value);
        const parentRoute = router?.[0]?.path?.replace("/:ags", "") || "";
        route(`${parentRoute}?ags=${value}${window.location.hash}`);
      });

      userDataSignal.subscribe((value) => {
        setUserData(value);
      });

      regsionListSignal.subscribe((value) => {
        setRegsionList(
          value
            .filter(
              (item) => item.kreis !== null && item.bezeichnung !== "Kreis"
            )
            .map((item) => ({
              value: item.ags,
              label: `${item.name} (${item.bezeichnung})`,
              group: item.kreis,
            }))
        );
      });
    };

    return unsub();
  }, []);

  const logout = () => {
    localStorage.removeItem(appConfig.localStorageKey);
    auth.setAuth(false);
    window.location.reload();
  };

  return (
    <header className=" z-[100] shadow-lg right-0 left-0 top-0">
      <div className={` items-center  h-12 bg-white flex p-2 `}>
        <div   className={`flex-grow  text-lg font-[500] md:inline-block hidden`}>
          <h6 style={{color:tenantConfig.GlobalConfiguration.bgcolor}} className={window.innerWidth < 768 ? "text-xs" : "text-lg"}>
            <b className="">
              {t(
                router[0].path
                  ?.split(":")?.[0]
                  ?.split("/")?.[1]
                  ?.split("_")?.[0]
                  ?.toUpperCase()
              )}
            </b>{" "}
            {t(
              router[0].path
                ?.split(":")?.[0]
                ?.split("/")?.[1]
                ?.split("_")
                ?.slice(1)
                ?.join(" ")
                ?.toUpperCase()
            )}
          </h6>
        </div>
        <div className="md:invisible visible">
          <Burger
            onClick={() => {
              collapsed.value = !collapsed.value;
            }}
            ml={10}
            opened={collapsed.value}
          />
        </div>
        <div className="flex-1" />

        <Select
          className="ml-4 "
          radius="lg"
          size="xs"
          maxDropdownHeight={"80vh"}
          placeholder="Select AGS"
          searchable
          autoComplete="on"
          data={regsionList}
          color="brand"
          sx={{ width: 350 }}
          classNames={{
            input:`border-${tenantConfig.header.headselect}`,
          }}
          unselectable
          onChange={(value) => {
            dropvalue.value = value;
          }}
          value={ags}
        />
        <div className="ml-4"></div>
        <Menu width={260} position="bottom-end" transition="pop-top-right">
          <Menu.Target>
            <div className={`items-center pr-2 flex cursor-pointer hover:scale-105 transition-all text-${tenantConfig.header.usericoncolor} font-thin`}>
              <IconUserCircle  stroke={1} />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Box className="p-4">
              <div className="flex items-center">
                <Avatar size="md" radius="lg" />
                <div className="ml-4">
                  <h6 className="text-sm font-semibold">
                    {userData?.nachname} {userData?.vorname}
                  </h6>
                  <p className="text-xs text-gray-500">{userData?.email}</p>
                </div>
              </div>
            </Box>
            <Menu.Divider />

            <Menu.Item
              color="red"
              icon={<IconLogout size={14} stroke={1.5} />}
              onClick={logout}
            >
              {t("Logout")}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <span className="max-2xl:text-xs"><LanguageButton /></span>
      </div>
      <div className="pl-2 bg-neutral-100 items-center text-[10px] ">
        <Breadcrumbs
          separator={
            <IconChevronRight size={12} className="text-neutral-500" />
          }
          p={2}
        >
          {router[0].url
            ?.split("?")?.[0]
            ?.split("/")
            .filter((item) => item !== "")
            .map((item, index) => {
              return (
                <Anchor
                  href={getHrefByIndex(router[0].url, index)}
                  className="text-neutral-500 text-xs font-thin max-2xl:text-xs"
                >
                  {t(getLabelFromURI(item).toUpperCase().toLocaleUpperCase("de"))}
                </Anchor>
              );
            })}
        </Breadcrumbs>
      </div>
    </header>
  )
}

const getHrefByIndex = (path, index) => {
  const pathSegments = path
    .split("?")[0]
    .split("/")
    .filter((item) => item !== "");
  // if length is 1, return hash
  if (index == 0) {
    return "#";
  }
  let href = "";
  for (let i = 0; i <= index; i++) {
    href += "/" + pathSegments[i];
  }
  return href;
};

const getLabelFromURI = (uri) => {
  // Decode the URI component to get the original string
  let decoded = decodeURIComponent(uri);
  // Replace underscores with spaces
  let replaced = decoded.split("_").join(" ");
  // Return the final label
  return replaced;
};
