import { Title ,Input, Paper, Accordion , createStyles} from "@mantine/core"
import { IconPhoto, IconPrinter, IconCameraSelfie } from '@tabler/icons-react';

import { IconSearch } from "@tabler/icons";

import Vector from "./Vector11.svg";
import New from "./New.svg";
import MessageBox from "./MessageBox.svg";
import TextPen from "./TextPen.svg";
import Ellipse from "./Ellipse.svg";

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
        // <Accordion
            
        //     mx="auto"
        //     variant="filled"
        //     defaultValue="customization"
        //     classNames={classes}
        //     className={classes.root}
        // >
        //     <Accordion.Item value="photos">
        //         <Accordion.Control icon={<IconPhoto size={20} color={'brand'} />}>
        //             Recent photos
        //         </Accordion.Control>
        //         <Accordion.Panel>
        //             <Paper withBorder padding="md">
        //                 jakdjaklsjd
        //             </Paper>
        //         </Accordion.Panel>
        //     </Accordion.Item>

        //     <Accordion.Item value="print">
        //         <Accordion.Control icon={<IconPrinter size={20} color={'brand'} />}>
        //             Print photos
        //         </Accordion.Control>
        //         <Accordion.Panel>Content</Accordion.Panel>
        //     </Accordion.Item>

        //     <Accordion.Item value="camera">
        //         <Accordion.Control icon={<IconCameraSelfie size={20} color={'brand'} />}>
        //             Camera settings
        //         </Accordion.Control>
        //         <Accordion.Panel>Content</Accordion.Panel>
        //     </Accordion.Item>
        // </Accordion>
        <Component />
    );
}



function Component() {
  return (
    <div>
      <Accordion
        className=" rounded-t-md  mt-[20px] border-[#D9D9D9] border-[2px]"
        classNames={{
          control: "px-2",
          chevron: "hidden",
          content: "p-0",
        }}
        defaultValue="customization"
      >
        <Accordion.Item className="w-[100%]" value="customization">
          <Accordion.Control className="bg-[#D8E4EE] h-[1.3rem]">
            <div className="flex space-x-[38px]  ">
              <p>
                <img className=" absolute  ml-2 w-[0.9rem]" src={New} alt="" />
                <img className=" mt-1 w-[1rem]" src={MessageBox} alt="" />
              </p>
              <p className=" flex space-x-2 text-[0.7rem] ">
                <p className=" font-medium">Ticket ID</p>{" "}
                <span className=" font-normal">000007</span>
              </p>{" "}
              <p className=" flex space-x-2 text-[0.7rem] ">
                <p className=" font-medium">Status</p>{" "}
                <span className=" font-normal">Open</span>
              </p>{" "}
              <p className=" flex space-x-2 text-[0.7rem] ">
                <p className=" font-medium">Created</p>{" "}
                <span className=" font-normal">29-5-2023</span>
              </p>{" "}
              <p className=" flex space-x-2 text-[0.7rem] ">
                <p className=" font-medium">Updated</p>{" "}
                <span className=" font-normal">01-06-2023</span>
              </p>{" "}
              <p className=" flex space-x-2 text-[0.7rem] ">
                <img src={TextPen} alt="" />
              </p>
            </div>
          </Accordion.Control>
          <Accordion.Panel className="w-full">
            <p className=" flex flex-col space-y-2 ml-[3.8rem] my-2 text-[0.7rem] ">
              <div className="flex flex-1 space-x-6">
                <p className=" font-medium">Problem Type</p>{" "}
                <span className=" font-normal">Map View</span>
              </div>
              <div className="flex flex-1 space-x-[70px]">
                {" "}
                <p className=" font-medium">Tilte</p>{" "}
                <span className=" font-normal">Map Problem</span>
              </div>
              <div className="flex flex-1 space-x-8">
                {" "}
                <p className=" font-medium">Describtion</p>{" "}
                <span className=" font-normal">
                  Hello! The map does not show a new connection line, but mobile{" "}
                  <br /> applications shows each line correctly..
                </span>
              </div>
            </p>{" "}
            <Accordion.Item value="customization">
              <Accordion
                className=" bg-[#D8E4EE]"
                defaultValue="customization"
                classNames={{
                  chevron: "hidden",
                  content: "p-0",
                }}
              >
                <Accordion.Item className="" value="Inbox">
                  <Accordion.Control className="bg-[#F5F7F9]  h-[1.3rem]">
                    <div className="flex  space-x-[38px]  ">
                      <p>
                        <img
                          className=" absolute  ml-2 mt-1  w-[0.5rem]"
                          src={Ellipse}
                          alt=""
                        />
                      </p>
                      <div className="flex space-x-[18rem]">
                        <p className=" flex space-x-2 text-[0.7rem] ">
                          <p className=" font-medium">Inbox</p>{" "}
                          <span className=" font-medium">0000007</span>
                        </p>{" "}
                        <p className=" flex space-x-2 text-[0.7rem] ">
                          <p className=" font-medium">Updated</p>{" "}
                          <span className=" font-normal">01-06-2023</span>
                        </p>{" "}
                      </div>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <p className=" flex flex-col space-y-2 ml-[3.8rem] my-2 text-[0.7rem] ">
                    Hello! The map does not show a new connection line, but mobile applications shows each line correctly. I tried to reinstall Desktop Application and now system gives me this window (please look at attached file) ried to reinstall Desktop Application and now system gives me this window (please look at attached file)
                    </p>{" "}
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="focus-ring">
                  <Accordion.Control className="bg-[#F5F7F9] h-[1.3rem]">
                    <p>
                      <img
                        className=" absolute  ml-5 mt-1  w-[0.5rem]"
                        src={Vector}
                        alt=""
                      />
                    </p>
                    <div className="flex  ml-[37px] space-x-[38px]  ">
                      <div className="flex space-x-[264px]">
                        <p className=" flex space-x-2 text-[0.7rem] ">
                          <p className=" font-medium">Your Reply</p>{" "}
                          <span className=" font-medium">0000007</span>
                        </p>{" "}
                        <p className=" flex space-x-2 text-[0.7rem] ">
                          <p className=" font-medium">Updated</p>{" "}
                          <span className=" font-normal">01-06-2023</span>
                        </p>{" "}
                      </div>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <p className=" flex flex-col space-y-2 ml-[3.8rem] my-2 text-[0.7rem] ">
                      <div className="flex flex-1 space-x-6">
                        <p className=" font-medium">Problem Type</p>{" "}
                        <span className=" font-normal">Map View</span>
                      </div>
                      <div className="flex flex-1 space-x-[70px]">
                        {" "}
                        <p className=" font-medium">Tilte</p>{" "}
                        <span className=" font-normal">Map Problem</span>
                      </div>
                      <div className="flex flex-1 space-x-8">
                        {" "}
                        <p className=" font-medium">Describtion</p>{" "}
                        <span className=" font-normal">
                          Hello! The map does not show a new connection line,
                          but mobile <br /> applications shows each line
                          correctly..
                        </span>
                      </div>
                    </p>{" "}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Accordion.Item>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}


