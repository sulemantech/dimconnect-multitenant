import {
  ActionIcon,
  Button,
  Chip,
  Flex,
  Input,
  MultiSelect,
  Pagination,
  Paper,
  Text,
  Select,
  Switch,
  Table,
  Title,
  Divider,
  Checkbox,
  Radio,
  ThemeIcon,
} from "@mantine/core";
import {
  closeAllModals,
  openConfirmModal,
  closeModal,
  openModal,
} from "@mantine/modals";
import {
  IconAlertCircle,
  IconArrowDown,
  IconArrowUp,
  IconPaperclip,
  IconPlus,
  IconSearch,
} from "@tabler/icons";
import { useState } from "preact/hooks";
import readXlsxFile from "read-excel-file";
import appConfig from "../config/appConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { closeDrawer, openDrawer } from "../providers/DrawerProvider";
import { useCallback } from "preact/hooks";
import { showNotification } from "@mantine/notifications";
import { isValidElement } from "preact";
import { useTranslation } from "react-i18next";
export default ({
  children,
  title,
  data,
  attributes = [],
  newStruct = {},
  refreshData,
  edit = false,
  remove = false,
  attatchment = false,
  createMethodName
}) => {
  // as {"id":25,"name":"HO1V","min":"25","max":"55"}[]

  const { t } = useTranslation();
  const [sort, setSort] = useState({ field: "name", order: "asc" });
  const [filter, setFilter] = useState("");
  const [submitloading, setsubmitLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [dataInfo, setDataInfo] = useState({ page: 0, count: data.length });
  const [page, setPage] = useState(1);

  const handleSubmit = (e) => {
    setsubmitLoading(true);
    e.preventDefault();
    const creationform = e.target;
    const formdata = new FormData(creationform);

    const values = {};

    for (let i = 0; i < creationform.length; i++) {
      let elem = creationform.elements[i];

      if (creationform[i].getAttribute("data-type") == "array") {
        values[creationform[i].getAttribute("data-key")] = formdata.forEach(
          (value, key) => {}
        );
        // values[creationform[i].getAttribute('data-key')] = formdata.get(creationform[i].getAttribute('data-key')).split(',').map(item => item.trim())
      } else if (creationform[i].getAttribute("data-main-key")) {
        let mainKey = elem.getAttribute("data-main-key");
        let groupKey = elem.getAttribute("data-group-key");
        let groupKeyValue = elem.getAttribute("data-group-key-value");
        let groupValue = elem.getAttribute("data-group-value");

        if (mainKey && groupKey && groupKeyValue && groupValue) {
          if (!values[mainKey]) {
            values[mainKey] = [];
          }

          let index = values[mainKey].findIndex(
            (item) => item[groupKey] === groupKeyValue
          );

          if (index === -1) {
            values[mainKey].push({
              [groupKey]: groupKeyValue,
              [groupValue]: formdata.get(elem.name) === "on" ? true : false,
            });
          } else {
            values[mainKey][index][groupValue] =
              formdata.get(elem.name) === "on" ? true : false;
          }
        }
      } else {
        values[creationform[i].name] =
          formdata.get(creationform[i].name) == "on"
            ? true
            : formdata.get(creationform[i].name);
      }
    }
    // check if each value can be JSON parsed else keep it as it is
    Object.keys(values).forEach((key) => {
      try {
        values[key] = JSON.parse(values[key]);
      } catch (e) {
        values[key] = values[key];
      }
    });

    newStruct
      .createMethod(values)
      .then((res) => {
        setsubmitLoading(false);
        refreshData();
        closeAllModals();
      })
      .catch((err) => {});
  };

  const createNew = useCallback(() => {
    openModal({
      closeOnClickOutside: false,
      title: (
        <div className="flex justify-between p-4 w-[55vw] bg-cover bg-center text-white items-center bg-[url('/Rectangle973.png')] bg-no-repeat">
          <div className="flex flex-row items-center space-x-2">
            <img src="/user2.svg" alt="Title Image" className="title-image" />
            <p>{title}</p>
          </div>
          <button onClick={closeAllModals} className="text-white">
            ✕
          </button>
        </div>
      ),
      closeOnEscape: true,
      children: (
        <div className="p-4">
          <form onSubmit={handleSubmit} id="creationform">
            {Object.keys(newStruct.data)?.map((item) =>
              Array.isArray(newStruct.data[item]) ? (
                item.replace("_", " ").trim().toUpperCase() === "AGS" ? (
                  <div className="flex flex-row mt-4 text-sm justify-center  items-center">
                    <label className="text-sm w-[9vw] text-gray-600">
                      {t(item.replace("_", " ").trim().toUpperCase() ==="AGS" ? "Gemeinde" : item.replace("_", " ").trim().toUpperCase())}
                    </label>
                    <div className="w-[30vw]">
                      <Select
                        variant="filled"
                        searchable
                        data={newStruct?.data[item]}
                        data-type="array"
                        required
                        className="rounded-md p-1 w-[15vw]"
                        name={item}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col text-sm">
                    <label className="text-sm text-gray-600">
                      {t(item.replace("_", " ").trim().toUpperCase())}
                    </label>

                    <MultiSelect
                      searchable
                      data={newStruct?.data[item]}
                      data-type="array"
                      required
                      className="bg-gray-200 rounded-md p-1"
                      name={item}
                    />
                  </div>
                )
              ) : typeof newStruct.data[item] === "boolean" ? (
                <>
                  <div className="flex flex-row text-sm justify-center items-center mt-2">
                    <label className="text-sm text-gray-600 w-[9vw]">
                      {t(
                        item
                          .replace("agreement_signed", "Agreement Signed")
                          .replace("is", "Is")
                          .trim()
                      )}
                    </label>
                    <div className="w-[30vw]">
                      <Checkbox
                        className=" rounded-md  pl-4"
                        name={item}
                        defaultValue={false}
                      />
                    </div>
                  </div>
                </>
              ) : typeof newStruct.data[item] === "object" ? (
                <>
                  {newStruct.data[item].type == "radio" ? (
                    <div className="flex justify-center">
                      {/* AGS right option */}
                      <Radio.Group
                        className="flex flex-row text-sm space-x-[3.8vw] w-[39vw] mt-2"
                        name={item}
                        // by default first option should be selected
                        defaultValue={newStruct.data[item].options[0].value}
                        
                        label={t(
                          item.replace("ags_right", "AGS Right ").trim()
                        )}
                      >
                        {newStruct.data[item].options?.map((option) => (
                          <Radio
                            className=""
                            value={option.value}
                            label={option.label}
                          />
                        ))}
                      </Radio.Group>
                    </div>
                  ) : (
                    <p>{t("Not Supported")}</p>
                  )}
                </>
              ) : (
                <div className="flex flex-row justify-center items-center space-x-4 space-y-3">
                  <label className="text-sm w-[8vw] text-gray-600">
                    {t(
                      item
                        .replace("_", " ")
                        .replace("vorn", "N")
                        .replace("nach", " Sur")
                        .replace("email", "E-mail")
                        .replace("password", "Password")
                        .trim()
                    )}
                  </label>
                  <Input
                    required
                    variant="filled"
                    type={
                      item.toLowerCase().includes("password")
                        ? "password"
                        : item.toLowerCase().includes("email")
                        ? "email"
                        : "text"
                    }
                    className="w-[30vw] rounded-md p-1"
                    name={item}
                  />
                </div>
              )
            )}
            <div className="py-3  ">{children}</div>
            <div className="flex justify-center  mt-2 ">
              <div className="w-[39vw]">
                <Button loading={submitloading} type={"submit"}>
                  {t("Create")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      ),
      size: "55vw",
      padding: "0",
      withCloseButton: false,
    });
  }, [children]);

  const handleEdit = async (item) => {
    try {
      const resp = await newStruct.getMethod(item.id);
      item = {
        ...item,
        ...resp.data,
      };
      const childrenClone = children;
      openModal({
        closeOnClickOutside: false,
        title: (
          <div className="flex justify-between p-4 w-[55vw] bg-cover bg-center text-white items-center bg-[url('/Rectangle973.png')] bg-no-repeat">
            <div className="flex flex-row items-center space-x-2">
              <img src="/user2.svg" alt="Title Image" className="title-image" />
              <p>{title}</p>
            </div>
            <button onClick={closeAllModals} className="text-white">
              ✕
            </button>
          </div>
        ),
        children: (
          <div className="p-4">
            <EditForm
              item={item}
              newStruct={newStruct}
              refreshData={refreshData}
            >
              {childrenClone}
            </EditForm>
          </div>
        ),
        size: "55vw",
        padding: "0",
        withCloseButton: false,
      });
    } catch (err) {
      console.error(err);
      showNotification({
        title: "Error",
        color: "red",
        icon: <IconAlertCircle />,
        message: "Cant fetch data",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col rounded-md bg-white mb-10 ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="flex flex-row  bg-[#f1f5f9] pl-4    space-x-3">
              <img
                className=" border-[1.5px] border-[#0E76BB] w-[22px] rounded-[3px] my-2  p-[0.8px]"
                src="/User.svg"
                alt=""
              />
              <p className="font-bold text-[15px] my-2 text-[#0E76BB]">
                {title}
              </p>
            </div>
            {/* <Divider my={10} /> */}
            <div className="flex p-2 text-neutral-700 text-xs items-center">
              <div className="flex space-x-[2px]">
                <Text
                  color="brand"
                  fw={"bold"}
                  className="bg-[#f1f3f5] flex font-medium text-xs items-center px-10 rounded-sm"
                >
                  {t("Show")}
                </Text>

                <Select
                  style={{ maxWidth: 90 }}
                  data={[
                    {
                      label: "10",
                      value: 10,
                    },
                    {
                      label: "25",
                      value: 25,
                    },
                    {
                      label: "50",
                      value: 50,
                    },
                    {
                      label: "100",
                      value: 100,
                    },
                  ]}
                  onChange={(e) => setLimit(e)}
                  classNames={{
                    input: "rounded-r-[4%]",
                  }}
                  size="sm"
                  value={limit}
                  variant="filled"
                />
              </div>

              <div className="flex space-x-[1px] ml-[6%]">
                <Text
                  color="brand"
                  fw={"bold"}
                  className="bg-[#f1f3f5] flex font-medium text-xs items-center px-10 rounded-sm"
                >
                  {t("Search")}
                </Text>
                <Input
                  type="text"
                  variant="filled"
                  size="sm"
                  radius={"sm"}
                  mr={15}
                  rightSection={
                    <ThemeIcon color="white">
                      <IconSearch color="#0E76BB " size={15} />
                    </ThemeIcon>
                  }
                  className="mr-xs rounded-sm"
                  // placeholder={t("Search")}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                />
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center">
                {newStruct.hasOwnProperty("createMethod") && (
                  <Button
                    className=" bg-[#0E76BB] font-medium text-xs rounded-full"
                    size="sm"
                    leftIcon={<IconPlus size={15} />}
                    onClick={createNew}
                  >
                    {createMethodName}
                  </Button>
                )}
              </div>
            </div>

            <Table
              striped
              highlightOnHover
              horizontalSpacing={"md"}
              verticalSpacing={"sm"}
              className="min-w-full divide-y divide-gray-200 px-2 "
            >
              <thead className="bg-white">
                <tr>
                  {attributes?.map((item) => {
                    return (
                      <th
                        scope="col"
                        key={item}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900  tracking-wider"
                      >
                        <p
                          onClick={() =>
                            setSort({
                              field: item,
                              order: sort.order === "asc" ? "desc" : "asc",
                            })
                          }
                          class={`flex items-center`}
                        >
                          {t(
                            `${item
                              .replace("agreement_signed", "Agreement Signed ")
                              .replace("id", " User ID")
                              .replace("email", " E-Mail")
                              .replace("vorname", " Name")
                              .replace("nachname", "Surname")
                              .replace("roles", "User Role")
                              .replace("permissions", "Permission")
                              .replace("name", "Name")
                              .replace("description", "Description")
                            }`
                          )}
                          {/* <ActionIcon
                            className="text-gray-900"
                            size="xs"
                            variant="white"
                            onClick={() =>
                              setSort({
                                field: item,
                                order: sort.order === "asc" ? "desc" : "asc",
                              })
                            }
                          >
                            {sort.field === item && sort.order === "asc" ? (
                              <IconArrowDown
                                className="text-red-900"
                                size={15}
                              />
                            ) : (
                              <IconArrowUp
                                className="text-gray-600"
                                size={15}
                              />
                            )}
                          </ActionIcon> */}
                        </p>
                      </th>
                    );
                  })}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">{t("Edit")}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ">
                {data
                  ?.filter((obj) => {
                    if (filter === "") return data;
                    return Object.values(obj)
                      .filter(
                        (val) =>
                          typeof val === "string" || typeof val === "number"
                      )
                      .some((val) =>
                        val
                          .toString()
                          .toLowerCase()
                          .includes(filter.toLowerCase())
                      );
                  })
                  .sort((a, b) => {
                    if (sort.order === "asc") {
                      if (a[sort.field] < b[sort.field]) {
                        return -1;
                      }
                      if (a[sort.field] > b[sort.field]) {
                        return 1;
                      }
                      return 0;
                    } else {
                      if (a[sort.field] > b[sort.field]) {
                        return -1;
                      }
                      if (a[sort.field] < b[sort.field]) {
                        return 1;
                      }
                      return 0;
                    }
                  })
                  .slice((page - 1) * limit, page * limit)
                  ?.map((item, index, arr) => (
                    <tr key={item.id}>
                     
                      {attributes?.map((attr) => {
                        let agreement_signed;
                        if(attr === "agreement_signed"){
                          agreement_signed = item[attr] === null ? "" : item[attr].toString() === "true" ? t("Signed") : t("Not Signed")
                        }
                        return (
                          <td
                            key={attr + "hgrui"}
                            className="px-6 text-left py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {
                              attr === "agreement_signed" ? agreement_signed :
                              Array.isArray(item[attr])
                              ? item[attr]?.map((i) => i.name).join(", ")
                              : isObject(item[attr])
                              ? Object.values(item[attr]).join(", ")
                              : typeof item[attr] === 'object' ? item[attr] : item[attr] || '-'

                              }
                          </td>
                        );
                      })}
                      <td className="flex justify-end px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {edit && (
                          <button
                            className="flex flex-row text-[#0E76BB] bg-[#DEE6EF] px-2 mr-6 rounded-md justify-center items-center space-x-5"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit /> <p className="pr-3">{t("Edit")}</p>
                          </button>
                        )}
                        {attatchment && (
                          <ActionIcon
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
                                      <p>Attatchment</p>
                                    </div>
                                    <button
                                      onClick={closeAllModals}
                                      className="text-white"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ),

                                children: (
                                  <div className="p-4">
                                    <AttatchmentForm
                                      item={item}
                                      newStruct={newStruct}
                                    />
                                  </div>
                                ),
                                size: "55vw",
                                padding: "0",
                                withCloseButton: false,
                              });
                            }}
                          >
                            <IconPaperclip />
                          </ActionIcon>
                        )}
                        {remove && (
                          <ActionIcon
                          disabled = {
                            newStruct
                                    .deleteMethod ? false : true
                          }
                            className="mr-10"
                            color="red"
                            onClick={() =>
                              openConfirmModal({
                                title: "Are You Sure?",
                                children: (
                                  <div>This action cannot be undone</div>
                                ),
                                labels: { confirm: "Delete", cancel: "Cancel" },
                                cancelProps: { variant: "default" },
                                onConfirm: () =>
                                  newStruct
                                    .deleteMethod(item.id)
                                    .then((res) => refreshData()),
                              })
                            }
                          >
                            <FaTrash />
                          </ActionIcon>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div className="flex w-full px-6 py-8">
              <p className="text-sm text-neutral-600">
                <span className=" text-[#2784c2]">
                  {page * limit - limit + 1}-{page * limit}
                </span>{" "}
                {t("from")} <span className=" text-[#2784c2]">{dataInfo.count}</span>{" "}
                {t("items")}
              </p>
              {/* <div className="flex-1"></div> */}
              <Pagination
                className="ml-[30%]"
                color="brand"
                total={Math.ceil(dataInfo.count / limit)}
                limit={limit}
                page={page}
                onChange={(page) => setPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditForm = ({ item, newStruct, refreshData }) => {
  const[t]=useTranslation();
  const [form, setForm] = useState(item);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const afterloadform = (e) => {
    e.preventDefault();
    setLoading(true);
    const filteredForm = Object.keys(form)
      .filter((key) => {
        if (typeof form[key] == "object") {
          if (form[key]?.hasOwnProperty("$$typeof")) return false;
          return true;
        }
        return true;
      })
      .reduce((obj, key) => {
        obj[key] = form[key];
        return obj;
      }, {});

    newStruct
      .editMethod(form.id, filteredForm)
      .then((res) => {
        closeAllModals();
        refreshData();
        setLoading(false);
        if (res.status === 200) {
          openModal({
            title: "Success",
            description: "Data updated successfully",
            labels: { confirm: "Ok" },
            onConfirm: () => {
              closeAllModals();
              refreshData();
            },
          });
        } else {
          openModal({
            closeOnClickOutside: false,
            title: "Error",
            description: "Something went wrong",
            labels: { confirm: "Ok" },
            onConfirm: () => {
              closeAllModals();
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  };
  const dataa = newStruct?.data["ags"];
  try {
    return (
      <form className="flex flex-col" onSubmit={afterloadform}>
        <div className="flex flex-col">
          {Object.keys(newStruct.data)?.map((attr) => {
            return (
              // <div key={attr} className="flex flex-col mb-4">
              //     <label className="text-gray-700">{attr.replace('_', ' ').toUpperCase()}</label>
              //     <input
              //         className="bg-gray-200 rounded-md p-2"
              //         value={form[attr]}
              //         name = {attr}
              //         onChange={(e) => setForm({ ...form, [attr]: e.target.value })}
              //     />
              // </div>
              // like create form
              typeof newStruct?.data[attr] === "object" &&
                newStruct.data[attr]?.type === "radio" ? (
                <div
                  key={attr}
                  className=" flex flex-row justify-center text-sm space-y-4 pb-3 items-center"
                >
                  <label className="text-gray-700 mt-3 w-[9vw]">
                    {t(attr.replace("ags_right", "AGS Right "))}
                  </label>
                  <div className="w-[30vw] flex">
                   
                    {/* <Checkbox
                      key={attr}
                      r
                      value={form[attr]}
                      onChange={(value) =>
                        setForm({ ...form, [attr]: value.currentTarget.value })
                      }
                    /> */}
                    {/* this has value as a string with '1' or '2' 1 for viewer and 2 for editor */}
                    {/* add an mantine switch button for this */}
                    <h1
                      className={`${
                        form[attr] === 2 ? "text-gray-500":"text-blue-500"
                      }`}
                    
                    >{t("Viewer")}</h1>
                    <Switch 
                      className="mx-2"
                      key={attr}
                      checked={form[attr] === 2 ? true : false}
                      onChange={(value) =>
                        setForm({ ...form, [attr]: value.currentTarget.checked === true ? 2 : 1 })
                      }
                    />
                    <h1
                      className={`${
                        form[attr] === 1 ? "text-gray-500" : "text-blue-500"
                      }`}

                    >{t("Editor")}</h1>

                  </div>
                </div>
              ) : Array.isArray(newStruct.data[attr]) ? (
                // <div className="flex flex-col mb-5">
                <Input.Wrapper className="my-5 flex flex-row justify-center space-y-4 items-center">
                  <label className="text-sm w-[9vw] mt-3 text-gray-600">
                    {t(attr.replace("_", " ").trim().toUpperCase())}
                  </label>
                  <div className="w-[30vw]">
                    <Select
                      className="w-[15vw]"
                      key={attr}
                      required
                      searchable
                      data={newStruct?.data[attr]}
                      value={form[attr]}
                      onChange={(value) => {
                        setForm({ ...form, [attr]: value });
                      }}
                    />
                  </div>
                </Input.Wrapper>
              ) : typeof newStruct?.data[attr] === "boolean" ? (
                <Input.Wrapper className="flex flex-row justify-center space-y-4 items-center ">
                  {attr === 'isEditor' ? null :<>
                  <Input.Label className="w-[9vw] mt-3">
                    {t(attr
                      .replace("agreement_signed", "Agreement Signed")
                      .replace("isEditor", "IsEditor"))}
                  </Input.Label>
                  <div className="w-[30vw]">
                    <Checkbox
                      key={attr}
                      r
                      // checked={form[attr]} some times value should be true or 'true', and sometimes it should be false or 'false', and incase of isEditor it should be true or 'on' and false or 'off'
                      checked={
                        t(attr === "isEditor"
                          ? form[attr]
                            ? form[attr] === "on" || form[attr] === true
                              ? true
                              : false
                            : false
                          : form[attr] === true
                          ? true
                          : false)

                      }
                      onChange={(value) =>
                        setForm({ ...form, [attr]: value.currentTarget.checked })
                      }
                    />
                  </div>
                  </>
          }
                </Input.Wrapper>
              ) : (!attr.toLowerCase().includes("password") &&
                <Input.Wrapper className="flex flex-row justify-center space-y-4 items-center">
                  <Input.Label className="w-[9vw]">
                    {t(attr
                      .replace("_", " ")
                      .replace("vorn", "N")
                      .replace("nach", " Sur")
                      .replace("email", "E-mail")
                      .replace("password", "Password"))}
                  </Input.Label>
                  <Input
                    key={attr}
                    label={t(attr.replace("_", " ").toUpperCase())}
                    value={form[attr]}
                    required
                    className="w-[30vw]"
                    type={
                      attr.toLowerCase().includes("password")
                        ? "password"
                        : attr.toLowerCase().includes("email")
                        ? "email"
                        : "text"
                    }
                    onChange={(value) =>
                      setForm({ ...form, [attr]: value.currentTarget.value })
                    }
                  />
                </Input.Wrapper>
              )
            );
          })}

          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-center">
            <div className="flex w-[39vw] space-x-5">
              <Button
                // onClick={update}
                type="submit"
              >
                {t("Update")}
              </Button>
              <Button onClick={() => closeAllModals()}>{t("Cancel")}</Button>
            </div>
          </div>
        </div>
      </form>
    );
  } catch (error) {
    console.log(error);
    return (
      <div>
        <h1>Something went wrong</h1>
      </div>
    );
  }
};

const AttatchmentForm = ({ item, newStruct }) => {
  const routeId = item.id;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const upload = () => {
    const geocode = (address) => {
      address = address.replace(" ", "+");
      address = address.replace(",", "+");
      address = address.replace(".", "+");
      address = address.replace("(", "+");
      address = address.replace(")", "+");
      address = address.replace("++", "+");
      address = address.replace("#", "+");
      address = address.replace("?", "+");

      return new Promise((resolve, reject) => {
        const url =
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          address +
          ".json?access_token=" +
          appConfig.mapboxToken;
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            if (res.features.length > 0) {
              const feature = res.features[0];
              resolve({
                address: feature.place_name,
                city: feature.context[1].text,
                postal_code: feature.context[0].text,
                complete_address: address,
                type: feature.place_type[0],
                lat: feature.center[1],
                lng: feature.center[0],
                route_id: routeId,
              });
            } else {
              reject("No results found");
            }
          })
          .catch((err) => reject(err));
      });
    };

    setLoading(true);
    const promises = data?.map((row) => {
      return geocode(row.addr1 + " " + row.city + " " + row.postcode);
    });
    Promise.all(promises)
      .then((res) => {
        setLoading(false);
        newStruct
          .attatchmentMethod(res)
          .then((res) => {
            setLoading(false);
            closeAllModals();
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const readCSV = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (file.type == "text/csv") {
        const text = e.target.result;
        const data = text
          .split("\n")
          .slice(1)
          ?.map((row) => {
            const lastComma = row.lastIndexOf(",");
            const sencondLastComma = row.lastIndexOf(",", lastComma - 1);
            const addr1 = row.substring(0, sencondLastComma);
            const city = row.substring(sencondLastComma + 1, lastComma);
            const postcode = row.substring(lastComma + 1);
            return { addr1, city, postcode };
          });
        setData(data);
        // if xlsx or xls
      } else if (
        file.type == "application/vnd.ms-excel" ||
        file.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        readXlsxFile(file).then((rows) => {
          const data = rows.slice(1)?.map((row) => {
            const addr1 = row[0];
            const city = row[1];
            const postcode = row[2];
            return { addr1, city, postcode };
          });
          setData(data);
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-4">
        <label className="text-gray-700">Upload CSV</label>
        <input
          type="file"
          className="bg-gray-200 rounded-md p-2"
          onChange={readCSV}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-700">Preview</label>
        <table className="table-auto">
          <thead>
            <tr className="text-xs font-bold">
              <th className="px-4 py-2">ADDR1</th>
              <th className="px-4 py-2">CITY</th>
              <th className="px-4 py-2">POSTCODE</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.slice(0, 5)?.map((row, i) => (
                <tr key={i} className="text-xs">
                  <td className="border px-4 py-2">{row.addr1}</td>
                  <td className="border px-4 py-2">{row.city}</td>
                  <td className="border px-4 py-2">{row.postcode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex">
        <Button loading={loading} onClick={upload}>
          Upload
        </Button>
        <Button loading={loading} onClick={() => closeAllModals()}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const isObject = (obj) => {
  // return true or false and check if not react component
  return obj !== null && typeof obj === "object" && !isValidElement(obj);
};
