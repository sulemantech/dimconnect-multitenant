import { useState, useEffect } from 'preact/hooks';
import { TextInput, Button, Select, Paper, Textarea, Title, Input, Box, Text, FileInput } from '@mantine/core';
import { getTicketPriorities, getTicketsCategories, postTicket } from '../../../../api';
import { showNotification } from '@mantine/notifications';
import { IconFile, IconPaperclip, IconSearch } from '@tabler/icons';


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
    <div className="w-full">
      <div style={{ backgroundImage: 'url("/horizontal blue background.svg")' }} className="flex flex-col pl-20 justify-center h-1/3">

      </div>
      <Paper p='xl' className="space-y-4 px-8">
        <Title order={1} color='brand'>Support Ticket To DIM Team</Title>
        <Title order={5} className='w-1/2' >Please describe your issue in detail, with relevant information including device platform, a version affected, steps taken to reproduce the issue, and any other relevant information.</Title>

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
