import { Title ,Input, Paper} from "@mantine/core"
import { IconPhoto, IconPrinter, IconCameraSelfie } from '@tabler/icons-react';
import { Accordion,createStyles } from '@mantine/core';
import { IconSearch } from "@tabler/icons";


export default () => {
    return (
        <div className="w-full h-full overflow-y-auto bg-white">
            <div className="p-12">

                <Title order={3} className="mb-8" color="brand">Edit or Check Status of your Tickets Here</Title>
                <p className="text-xs">
                    You can <b>Edit</b> or <b>Delete</b> your Support Ticket easy, before it get status <b>SOLVED</b>.
                    Please help us learn your problem by better adding new details or objectives.

                </p>
                <section>
                    <div className="flex flex-row my-6 items-center justify-between mt-8 text-xs">
                        <p>
                        History of your Support Tickets

                        </p>
                        <Input 
                            icon={
                                <IconSearch size={20} />
                            }
                            variant="filled"
                        />
                    </div>
                </section>
                <TicketDetails />
            </div>
        </div>
    )
}


const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderRadius: theme.radius.sm,
    },

    item: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        border: `1rem solid transparent`,
        position: 'relative',
        zIndex: 0,
        transition: 'transform 150ms ease',

        '&[data-active]': {
            transform: 'scale(1.03)',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            boxShadow: theme.shadows.md,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            zIndex: 1,
        },
    },

    chevron: {
        '&[data-rotate]': {
            transform: 'rotate(-90deg)',
        },
    },
}));

function TicketDetails() {
    const { classes } = useStyles();
    return (
        <Accordion
            
            mx="auto"
            variant="filled"
            defaultValue="customization"
            classNames={classes}
            className={classes.root}
        >
            <Accordion.Item value="photos">
                <Accordion.Control icon={<IconPhoto size={20} color={'brand'} />}>
                    Recent photos
                </Accordion.Control>
                <Accordion.Panel>
                    <Paper withBorder padding="md">
                        jakdjaklsjd
                    </Paper>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="print">
                <Accordion.Control icon={<IconPrinter size={20} color={'brand'} />}>
                    Print photos
                </Accordion.Control>
                <Accordion.Panel>Content</Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="camera">
                <Accordion.Control icon={<IconCameraSelfie size={20} color={'brand'} />}>
                    Camera settings
                </Accordion.Control>
                <Accordion.Panel>Content</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}