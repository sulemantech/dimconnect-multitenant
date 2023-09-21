import {
  Title,
  Input,
  Paper,
  Accordion,
  createStyles,
  Loader,
} from "@mantine/core";
import { IconPhoto, IconPrinter, IconCameraSelfie } from "@tabler/icons-react";

import { IconSearch } from "@tabler/icons";

import Vector from "./Vector11.svg";
import New from "./New.svg";
import MessageBox from "./MessageBox.svg";
import TextPen from "./TextPen.svg";
import Ellipse from "./Ellipse.svg";
import { useRouter } from "preact-router";
import { useLayoutEffect, useState } from "preact/hooks";
import { getTickets, postComment } from "../../../../api";
import SupportTicketHeader from "./SupportTicketHeader";
export default () => {
  const router = useRouter();
  const [data, setdata] = useState(null);
  const getTicketData = () => {
    const matches = router[0].matches;
    getTickets(matches?.edit_or_check_ticket_status)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    getTicketData();

    return () => { };
  }, []);
  return (
    <>
    <div id="scale-down" className="w-full h-full  bg-white overflow-y-auto">
    <SupportTicketHeader/>
    <div className="w-full h-full  bg-white">
      <div className="p-12">
        <Title order={3} className="mb-8" color="brand">
          Edit or Check Status of your Tickets Here
        </Title>
        <p className="text-xs">
          You can <b>Edit</b> or <b>Delete</b> your Support Ticket easy, before
          it get status <b>SOLVED</b>. Please help us learn your problem by
          better adding new details or objectives.
        </p>
        <section>
          <div className="flex flex-row my-6 items-center justify-between mt-8 text-xs">
            <p>History of your Support Tickets</p>
            <Input icon={<IconSearch size={20} />} variant="filled" />
          </div>
        </section>
        {data ? <TicketDetails data={data} getTicketData={getTicketData} /> : <Loader />}
      </div>
    </div>
    </div>
    </>
  );
};

function TicketDetails({ data, getTicketData }) {
  const [reply, setReply] = useState("");
  const handleSendReply = async () => {
    // create a form data object
    const formData = new FormData();
    // append the body key with value of reply
    formData.append("body", reply);

    const res = await postComment(data.id, formData)
    console.log(res);
    // if (res.status === 200) {
    if (res.status === 200) {
      setReply("");
      getTicketData();
    }
  };

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
          <Accordion.Control className="bg-[#D8E4EE] ">
            <div className="flex space-x-[38px]  ">
              <p className="relative">
                <img className=" absolute  ml-2 w-[0.9rem]" src={New} alt="" />
                <img className=" mt-1 w-[1rem]" src={MessageBox} alt="" />
              </p>
              <p className=" flex space-x-2 text-[0.7rem] ">
                <p className=" font-medium">Ticket ID</p>{" "}
                <span className=" font-normal">{data?.id}</span>
              </p>{" "}
              <p className=" flex space-x-2 text-[0.7rem] flex-1">
                <p className=" font-medium">Status</p>{" "}
                <span className=" font-normal">Open</span>
              </p>{" "}
              <p className=" flex space-x-2 text-[0.7rem] ">
                <p className=" font-medium">Created</p>{" "}
                <span className=" font-normal">
                  {new Date(data?.created_at).toLocaleDateString()}
                </span>
              </p>{" "}
              <p className=" flex space-x-2 text-[0.7rem] ">
                <p className=" font-medium">Updated</p>{" "}
                <span className=" font-normal">
                  {new Date(data?.updated_at).toLocaleDateString()}
                </span>
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
                <span className=" font-normal">{data?.problem_type}</span>
              </div>
              <div className="flex flex-1 space-x-[70px]">
                {" "}
                <p className=" font-medium">Tilte</p>{" "}
                <span className=" font-normal">{data?.title}</span>
              </div>
              <div className="flex flex-1 space-x-8">
                {" "}
                <p className=" font-medium">Description</p>{" "}
                <span className=" font-normal">{data?.description}</span>
              </div>
            </p>{" "}
          </Accordion.Panel>
        </Accordion.Item>

        {/* {data?.ticketComments? sort them by id */}
        {data?.ticketComments
          ?.sort((a, b) => b.id - a.id).reverse()
          .map((comment) => (
            <CommentItem comment={comment} value={comment.id} data={data} />
          ))}
      </Accordion>


      {/* send reply */}
      {data?.ticketComments.length === 0 ? <></> : <div
        className="
      flex  space-x-[38px]  mt-4
      "
      >
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          type="text"
          placeholder="Write a comment"
          className="w-full h-10 border-2 border-gray-300 rounded-md px-4 focus:border-blue-500"
        />
        <button
          className="bg-[#F5F7F9] w-[5rem] h-10 rounded-md hover:bg-[#D8E4EE] hover:text-[#1E86FF]
       "
          onClick={handleSendReply}
        >
          Send
        </button>
      </div>}


    </div>
  );
}

const CommentItem = ({ comment, value, data }) => {
  if (data.user_id === comment.user_id ? false : true)
    return (
      <Accordion.Item
        className=""
        value={typeof value === "number" ? value.toString() : value}
      >
        <Accordion.Control className="bg-[#F5F7F9]  h-[1.3rem]">
          <div className="flex  space-x-[38px]  ">
            <p>
              <img
                className=" absolute  ml-2 mt-1  w-[0.5rem]"
                src={Ellipse}
                alt=""
              />
            </p>
            <div className="flex flex-1">
              <p className=" flex space-x-2 text-[0.7rem] flex-1">
                <p className=" font-medium ">Inbox</p>{" "}
                <span className=" font-medium">
                  {comment.ticket_id}R{comment.id}
                </span>
              </p>{" "}
              <p className=" flex space-x-2 text-[0.7rem] ">
                <p className=" font-medium">Updated</p>{" "}
                <span className=" font-normal">
                  {new Date(comment?.created_at).toLocaleDateString()}
                </span>
              </p>{" "}
            </div>
          </div>
        </Accordion.Control>
        <Accordion.Panel>
          <p className=" flex flex-col space-y-2 ml-[3.8rem] my-2 text-[0.7rem] ">
            {comment?.body}
          </p>{" "}
        </Accordion.Panel>
      </Accordion.Item>
    );

  return (
    <Accordion.Item
      value={typeof value === "number" ? value.toString() : value}
    >
      <Accordion.Control className="bg-[#F5F7F9] h-[1.3rem]">
        <p className="relative">
          <img
            className=" absolute  ml-5 mt-1  w-[0.5rem]"
            src={Vector}
            alt=""
          />
        </p>
        <div className="flex  ml-[37px] space-x-[38px] flex-1 ">
          <div className="flex  flex-1">
            <p className=" flex space-x-2 text-[0.7rem] flex-1">
              <p className=" font-medium">Your Reply</p>{" "}
              <span className=" font-medium">
                {comment.ticket_id}R{comment.id}
              </span>
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

          <div className="flex flex-1 space-x-8">
            {" "}

            <span className=" font-normal">
              {
                comment?.body
              }
            </span>
          </div>
        </p>{" "}
      </Accordion.Panel>
    </Accordion.Item>
  );
};
