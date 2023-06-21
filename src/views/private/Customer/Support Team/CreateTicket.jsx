import { useState, useEffect } from 'preact/hooks';
import { TextInput, Button, Select, Paper, Textarea, Title, Input, Box, Text, FileInput, Container, Flex, Stack, Image } from '@mantine/core';
import { getTicketPriorities, getTicketsCategories, postTicket } from '../../../../api';
import { showNotification } from '@mantine/notifications';
import { IconFile, IconPaperclip, IconSearch } from '@tabler/icons';
import { openModal } from '@mantine/modals';


export default function TicketCreationPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    status: 1,
    category_id: '',
    priority_id: '',
  });

  useEffect(() => {
    const fetchTicketData = async () => {
      const [categories, priorities] = await Promise.all([
        getTicketsCategories(),
        getTicketPriorities(),
      ]);


      setCategories(categories.data);
      setPriorities(priorities.data?.data);
    };
    fetchTicketData();
  }, []);

  const handleInputChange = (event) => {
    setTicketData({ ...ticketData, [event.target.name]: event.target.value });
  };

  const handleTicketSubmit = async () => {
    openModal({
      title: <></>,

      size: 'xl',
      classNames: {
        title: 'hidden',
        header: 'bg-brand py-1',
        body: 'p-0',
      },
      children: <ThanksModalContent ticketNumber={1103891} currentStatus={'sent'} date={'May 29, 2023'} name="elon musk" problemType="mapView" title="map Problem" description="The map does not show a new connection line"
        attatchedFiles={['file1.png', 'file2.png']}
      />,
    });
    return;
    setLoading(true);
    postTicket(ticketData).then((res) => {
      showNotification({
        title: 'Ticket created',
        message: 'Ticket has been created successfully',
        color: 'green',
      });
      setLoading(false);
    }).catch((err) => {
      showNotification({
        title: 'Ticket creation failed',
        message: 'Something went wrong',
        color: 'red',
      });
      setLoading(false);
    });

  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div style={{ backgroundImage: 'url("/horizontal blue background.svg")' }} className="flex flex-col pl-20 justify-center h-1/6">

      </div>
      <Paper className="space-y-6 px-20 py-10 flex-grow ">
        <Title order={2} color='brand'>Support Ticket To DIM Team</Title>
        <Title order={5} className='w-1/2 font-light' >Please describe your issue in detail, with relevant information including device platform, a version affected, steps taken to reproduce the issue, and any other relevant information.</Title>

        <Paper className="flex-grow flex mt-8" radius={'xl'} withBorder>
          <Box className="rounded-l-full flex-1 items-center justify-center" display='flex'>
            <Text color='brand' className='font-bold'>
              Problem Type
            </Text>
          </Box>
          <Select
            classNames={{
              input: 'rounded-r-full relative',
            }}
            size='md'
            variant='filled'
            className='flex-[3]'
            data={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            value={ticketData.category_id}
            onChange={(value) => setTicketData({ ...ticketData, category_id: value })}
          />
        </Paper>
        <Paper className="flex-grow flex mt-8" radius={'xl'} withBorder>
          <Box className="rounded-l-full flex-1 items-center justify-center" display='flex'>
            <Text color='brand' className='font-bold'>
              Title
            </Text>
          </Box>
          <TextInput
            placeholder="Enter Map Problem"
            className='flex-[3]'
            variant='filled'
            classNames={{
              input: 'rounded-r-full relative',
            }}
            size='md'
            name="title"
            value={ticketData.title}
            onChange={handleInputChange}
          />
        </Paper>
        <Paper className="flex-grow flex mt-8" radius={'xl'} withBorder>
          <Box className="rounded-l-full flex-1 items-center justify-center" display='flex'>
            <Text color='brand' className='font-bold'>
              Description
            </Text>
          </Box>
          <Textarea
            variant='filled'
            className='flex-[3]'
            classNames={{
              input: 'rounded-r-full relative',
            }}
            placeholder="Enter description"
            name="description"
            multiline
            value={ticketData.description}
            onChange={handleInputChange}
          />
        </Paper>
        <Paper className="flex-grow flex mt-8" radius={'xl'} withBorder>
          <Box className="rounded-l-full flex-1 items-center justify-center" display='flex'>
            <Text color='brand' className='font-bold'>
              Priority
            </Text>
          </Box>
          <Select
            variant='filled'
            placeholder="Select priority"
            className='flex-[3]'
            classNames={{
              input: 'rounded-r-full relative',
            }}
            data={
              priorities.map((priority) => ({
                value: priority.id,
                label: priority.name,
              }))
            }
            value={ticketData.priority_id}
            onChange={(value) => setTicketData({ ...ticketData, priority_id: value })}
          />
        </Paper>

        <Paper className="flex-grow flex mt-8" radius={'xl'} withBorder>
          <Box className="rounded-l-full flex-1 items-center justify-center" display='flex'>
            <Text color='brand' className='font-bold'>
              Attachments
            </Text>
          </Box>
          <FileInput
            icon={<IconPaperclip size={23} className='text-sky-600' />}
            size='md'
            placeholder='Attatch files'
            multiple
            variant='filled'
            className='flex-[3]'
            classNames={{ input: 'rounded-r-full relative' }} />

        </Paper>
        <p className='text-xs'>
          To protect your privacy, please do not include Any personal information in your request. Review our <a href="#" className="text-sky-600">privacy statement</a> for more information.
        </p>
        <div className='justify-end items-end flex'>
          <Button
            loading={loading}
            onClick={handleTicketSubmit}>Submit</Button>

        </div>
      </Paper>
    </div>
  );
}


export const ThanksModalContent = ({ ticketNumber, currentStatus, date, name, problemType, title, description, attatchedFiles }) => {
  return (
    <div>

      <Container bg={'brand'} className='text-white'>
        <div className='space-y-4 px-20 pb-4 flex-grow '>

          <Title order={2} className="text-center">Thank you!</Title>
          <Text className="text-center text-xs font-light">We are about to recieve your support ticket</Text>
          <Text className="text-center text-xs font-light">Just let us see it and we will come back with fast and easy solution</Text>
          <Text className="text-center text-xs font-light">DIM SUPPORT TEAM appreciates your patience. Take care!</Text>

        </div>


      </Container>
      <Container className='px-12 py-4' >
        <Flex justify='space-between' >

          <Stack className='space-y-2'>
            <Flex>
              <Text size={'xs'} mr={15}>TICKET NUMBER</Text><Text size={'xs'} fw={'bold'}>{ticketNumber}</Text>
            </Flex>
            <Flex>
              <Text size={'xs'} mr={15}>NAME</Text><Text size={'xs'} fw={'bold'}>{name.toUpperCase()}</Text>
            </Flex>
            <Flex>
              <Text size={'xs'} mr={15}>TITLE</Text><Text size={'xs'} fw={'bold'}>{title.toUpperCase()}</Text>
            </Flex>
          </Stack>
          <Stack>
            <Flex>
              <Text size={'xs'} mr={15}>CURRENT STATUS</Text><Text size={'xs'} fw={'bold'}>{currentStatus.toUpperCase()}</Text>
            </Flex>
            <Flex>
              <Text size={'xs'} mr={15}>PROBLEM TYPE</Text><Text size={'xs'} fw={'bold'}>{problemType.toUpperCase()}</Text>
            </Flex>
          </Stack>

          <Text size={'xs'} fw={'bold'}>{date}</Text>

        </Flex>
        <Text mt={20} className='text-neutral-600' size={'xs'}>
          {description}
        </Text>
        {attatchedFiles.length > 0 &&
          <>
            <Text mt={20} className='text-neutral-700' size={'xs'}>
              {attatchedFiles.length} Attatched Files
            </Text>
            <Flex mt={20}>

              {
                attatchedFiles.map((file) => (
                  <Image src={file.url} alt={file.name} width={100} height={100} mr={15} />
                ))
              }
            </Flex>
          </>
        }
      </Container>
      <div style={{ backgroundImage: 'url("/horizontal blue background.svg")' }} className="w-full py-8" >
        <div className='bg-white flex text-center text-xs p-2 justify-center'>
          You can <a href="#" className="text-sky-600 px-1"> Edit </a> or <a href="#" className="text-sky-600 px-1"> Check Status </a> of your ticket anytime!
        </div>

      </div>


    </div>

  );
}