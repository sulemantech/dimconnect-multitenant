import { useState, useEffect } from "preact/hooks";
import { useTranslation } from "react-i18next";

import {
  TextInput,
  Button,
  Select,
  Paper,
  Textarea,
  Title,
  Box,
  Text,
  FileInput,
  Container,
  Flex,
  Stack,
  Image,
  Loader,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import {
  getTicketPriorities,
  getTicketsCategories,
  postTicket,
} from "../../../../api";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconFile, IconPaperclip, IconSearch } from "@tabler/icons";
import { openModal } from "@mantine/modals";
import { Link } from "preact-router";
import { closeAllModals } from "@mantine/modals";
import SupportTicketHeader from "./SupportTicketHeader";

export default function TicketCreationPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [error, setError] = useState(null);
  const { t } = useTranslation()

  useEffect(() => {
    const fetchTicketData = async () => {
      const [categories, priorities] = await Promise.all([
        getTicketsCategories(),
        getTicketPriorities(),
      ]);

      setCategories(categories.data);
      setPriorities(priorities.data);
    };
    fetchTicketData();
  }, []);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const files = formData.getAll("file");

    // check all files are less than 512kb
    for (let i = 0; i < files.length; i++) {
      if(files[i].size > 5120000){
        setError(t("File size must be less than 512MB"));
        setLoading(false);
        return;
      }
    }

    // check if category is selected
    // check if priority is selected

    if (!formData.get("category_id") || !formData.get("priority_id")) {
      setError(t('Please select a category and priority'));
      setLoading(false);
      return;
    }

    // local urls of each file
    const fileUrls = [];
    for (let i = 0; i < files.length; i++) {
      fileUrls.push(URL.createObjectURL(files[i]));
    }

    // log files type and size
    const fileTypes = [];
    for (let i = 0; i < files.length; i++) {
      fileTypes.push(files[i].type);
    }

    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name);
    }

    // if there no file and file size is zero then remove file from form data
    for (let i = 0; i < files.length; i++) {
      if (files[i].size === 0) {
        formData.delete("file");
        fileUrls.splice(i, 1);
        fileTypes.splice(i, 1);
        fileNames.splice(i, 1);
      }
    }


    try {
      const ticketPosted = await postTicket(formData);

      openModal({
        title: <></>,

        size: "xl",
        classNames: {
          title: "hidden",
          header: "bg-brand py-1",
          body: "p-0",
        },
        children: (
          <ThanksModalContent
            ticketNumber={ticketPosted.data.id}
            currentStatus={"open"}
            date={new Date().toLocaleDateString()}
            problemType={
              categories.find(
                (category) => category.id === ticketPosted.data.category_id
              ).name
            }
            title={ticketPosted.data.title}
            description={ticketPosted.data.description}
            attatchedFiles={fileUrls}
            filesType={fileTypes}
            fileNames={fileNames}
          />
        ),
      });
      return;
    } catch (err) {
      console.log(err);
      setError(err.message);

      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="scale-down" className=" h-full overflow-y-scroll flex-grow ">
      <SupportTicketHeader/>
      <Paper className="space-y-4 px-20 py-4">
        <Title
          order={2}
          color="brand"
          className=" font-[roboto] text-[0078BE] font-bold text-[32px]"
        >
          {t('Support Ticket To DIM Team')}
        </Title>
        <Title
          order={5}
          className="w-2/3 font-[roboto] text-[3E3F3F] font-normal text-[16px]"
        >
          {t('Please describe your issue in detail, with relevant information including device platform, a version affected, steps taken to reproduce the issue, and any other relevant information.')}
        </Title>
        <form onSubmit={handleTicketSubmit}>
          <div className="flex flex-1 w-full">
            <div className=" w-[75%]">
                {/* added error boundry to show form validation error */}
                {
                  error && 
                    <Alert color="red" icon={<IconAlertCircle />}>
                      <Text color="red">{error}</Text>
                    </Alert>
                }
              <Paper
                className="flex-grow flex mt-12"
                radius={"10px"}
                withBorder
              >
                
                <Box
                  className="rounded-l-full flex-1 items-center justify-center"
                  display="flex"
                >
                  <Text color="brand" className="font-bold text-sm">
                    {t('Problem Type')}
                  </Text>
                </Box>
                <Select
                  classNames={{
                    input: "rounded-r-[10px] relative",
                  }}
                  required
                  name="category_id"
                  size="sm"
                  variant="filled"
                  className="flex-[3]"
                  data={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
              </Paper>
              <Paper
                className="flex-grow flex mt-12"
                radius={"10px"}
                withBorder
              >
                <Box
                  className="rounded-l-full flex-1 items-center justify-center"
                  display="flex"
                >
                  <Text color="brand" className="font-bold text-sm">
                    {t('Title')}
                  </Text>
                </Box>
                <TextInput
                  placeholder={t('Enter Map Problem')}
                  className="flex-[3]"
                  variant="filled"
                  classNames={{
                    input: "rounded-r-[10px] relative",
                  }}
                  size="sm"
                  name="title"
                  required
                />
              </Paper>
              <Paper
                className="flex-grow flex mt-12"
                radius={"10px"}
                withBorder
              >
                <Box
                  className="rounded-l-lg flex-1 items-center justify-center"
                  display="flex"
                >
                  <Text color="brand" className="font-bold text-sm">
                    {t('Description')}
                  </Text>
                </Box>
                <Textarea
                  variant="filled"
                  className="flex-[3]"
                  classNames={{
                    input: "rounded-r-[10px] relative",
                  }}
                  size="sm"
                  placeholder={t('Please describe your issue in detail, with any relevant information including device platform aa version affected, steps taken leading to the issue, which period of time this proble is go on etc.')}
                  name="description"
                  multiline
                  required
                />
              </Paper>
              <Paper
                className="flex-grow flex mt-12"
                radius={"10px"}
                withBorder
              >
                <Box
                  className="rounded-l-full flex-1 items-center justify-center"
                  display="flex"
                >
                  <Text color="brand" className="font-bold text-sm">
                    {t('Priority')}
                  </Text>
                </Box>
                <Select
                  variant="filled"
                  placeholder={t('Select priority')}
                  className="flex-[3]"
                  classNames={{
                    input: "rounded-r-[10px] relative",
                  }}
                  size="sm"
                  data={priorities.map((priority) => ({
                    value: priority.id,
                    label: priority.name,
                  }))}
                  name="priority_id"
                  required
                />
              </Paper>

              <Paper
                className="flex-grow flex mt-12"
                radius={"10px"}
                withBorder
              >
                <Box
                  className="rounded-l-full flex-1 items-center justify-center"
                  display="flex"
                >
                  <Text color="brand" className="font-bold text-sm">
                    {t('Attachments')}
                  </Text>
                </Box>
                <FileInput
                  // label='Max file size 512KB'
                  labelProps={{ className: "text-[10px]" }}
                  icon={<IconPaperclip size={23} className="text-sky-600" />}
                  size="sm"
                  placeholder= {t('Attach File Or Drop Files Here To Upload')}
                  multiple
                  name="file"
                  // error={error}
                  variant="filled"
                  className="flex-[3] bg-[#F5F7F9]"
                  classNames={{ input: "rounded-r-[10px] relative" }}
                  // accept="image/png,image/jpeg"
                />
              </Paper>
              <p className="text-xs mt-4 ml-[2px]">
                {t('To protect your privacy, please do not include Any personal information in your request. Review our ')} 
                <a href="#" className="text-sky-600">
                  {t('privacy statement')}
                </a>{" "}
                {t('for more information.')}
              </p>
              <div className="justify-end items-end flex">
                <Button type="submit" loading={loading}>
                  {t('Submit')}
                </Button>
              </div>
            </div>
            <div className="w-[25%] ml-12 mt-10">
              <h2 className=" font-bold text-[16px] text-[#0E76BB]">{t('Popular Topics From FAQS Library')}</h2>
              <ul className="list-without-bullets max-h-[355px] font-thin  space-y-5 text-[15px] ml-8 mt-5 scroll text-left pl-2 pt-[1px]">
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('How to reload your Map views')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('Main reason of map bags')} </a></li>
                <li><a className=" hover:text-blue-400 hover:font-bold" href="">{t('In Mobile Application Application Works Correctly But in Desktop Application Does Not')} </a></li>
              
               
              </ul>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export const ThanksModalContent = ({
  ticketNumber,
  currentStatus,
  date,
  problemType,
  title,
  description,
  attatchedFiles,
  filesType,
  fileNames
}) => {
  return (
    <div>
      <Container bg={"brand"} className="text-white">
        <div className="space-y-4 px-20 pb-4 flex-grow ">
          <Title order={2} className="text-center">
            Thank you!
          </Title>
          <Text className="text-center text-xs font-light">
            We are about to recieve your support ticket
          </Text>
          <Text className="text-center text-xs font-light">
            Just let us see it and we will come back with fast and easy solution
          </Text>
          <Text className="text-center text-xs font-light">
            DIM SUPPORT TEAM appreciates your patience. Take care!
          </Text>
        </div>
      </Container>
      <Container className="px-12 py-4">
        <Flex justify="space-between">
          <Stack className="space-y-2">
            <Flex>
              <Text size={"xs"} mr={15}>
                TICKET NUMBER
              </Text>
              <Text size={"xs"} fw={"bold"}>
                {ticketNumber}
              </Text>
            </Flex>
            <Flex>
              <Text size={"xs"} mr={15}>
                TITLE
              </Text>
              <Text size={"xs"} fw={"bold"}>
                {title.toUpperCase()}
              </Text>
            </Flex>
          </Stack>
          <Stack>
            <Flex>
              <Text size={"xs"} mr={15}>
                CURRENT STATUS
              </Text>
              <Text size={"xs"} fw={"bold"}>
                {currentStatus.toUpperCase()}
              </Text>
            </Flex>
            <Flex>
              <Text size={"xs"} mr={15}>
                PROBLEM TYPE
              </Text>
              <Text size={"xs"} fw={"bold"}>
                {problemType.toUpperCase()}
              </Text>
            </Flex>
          </Stack>

          <Text size={"xs"} fw={"bold"}>
            {date}
          </Text>
        </Flex>
        <Text mt={20} className="text-neutral-600" size={"xs"}>
          {description}
        </Text>
        {attatchedFiles.length > 0 && (
          <>
            <Text mt={20} className="text-neutral-700" size={"xs"}>
              {attatchedFiles.length} Attatched Files
            </Text>
            <Flex mt={20}>
              {attatchedFiles.map((file, index) => (
                <div className="flex flex-col items-center justify-center mr-4">
                  {
                  filesType[index].includes("image")
                  ? (
                    <Image
                      src={file}
                      alt={"Uploaded Attatchment"}
                      width={100}
                      height={100}
                      mr={15}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <IconFile size={50} />
                      <Text size={"xs"}>{fileNames[index]}</Text>
                    </div>
                  )}
                </div>
              ))}
            </Flex>
          </>
        )}
      </Container>
      <div
        style={{ backgroundImage: 'url("/horizontal blue background.svg")' }}
        className="w-full py-8"
      >
        <div className="bg-white flex text-center text-xs p-2 justify-center">
          You can{" "}
         
          <Link
          onClick={
            // close all modal and open my tickets page
            ()=>{
              closeAllModals();
            }
          }
            href={`/support_team/my_tickets/${ticketNumber}`}
            className="text-sky-600 px-1"
          >
            {" "}
            Check Status{" "}
          </Link>{" "}
          of your ticket anytime!
        </div>
      </div>
    </div>
  );
};
