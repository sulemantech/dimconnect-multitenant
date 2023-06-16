import { useState, useEffect } from 'preact/hooks';
import { TextInput, Button, Select, Paper, Textarea } from '@mantine/core';
import { getTicketPriorities, getTicketsCategories, postTicket } from '../../../../api';
import { showNotification } from '@mantine/notifications';


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
    <div className="p-4 w-full">
      <Paper p='lg' className="space-y-4">
        <TextInput
          label="Title"
          placeholder="Enter title"
          name="title"
          value={ticketData.title}
          onChange={handleInputChange}
        />
        <Textarea
          label="Description"
          placeholder="Enter description"
          name="description"
          multiline
          value={ticketData.description}
          onChange={handleInputChange}
        />
        
        <Select
          label="Category"
          data={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }) )}
          value={ticketData.category_id}
          onChange={(value) => setTicketData({ ...ticketData, category_id: value })}
        />
        <Select
          label="Priority"
          data={
            priorities.map((priority) => ({
                value: priority.id,
                label: priority.name,
                }))
          }
          value={ticketData.priority_id}
          onChange={(value) => setTicketData({ ...ticketData, priority_id: value })}
        />
        <Button onClick={handleTicketSubmit}>Create Ticket</Button>
      </Paper>
    </div>
  );
}
