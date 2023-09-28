import { useState, useEffect } from "preact/hooks";
import { getAllTickets, getMyTickets } from "../../../../api";
import { Table } from "@mantine/core";
import { route } from "preact-router";
import SupportTicketHeader from "./SupportTicketHeader";
import { useTranslation } from "react-i18next";
import PageProvider from "../../../../providers/PageProvider";
export default () => {
    const { t } = useTranslation();
  const [data, setData] = useState([]);
  useEffect(() => {
    getMyTickets().then((res) => {
      setData(res.data);
    });
  }, [t]);

  return (
    <>
        <PageProvider>
        <SupportTicketHeader />
        <div className="flex flex-col p-4 h-screen  overflow-y-auto ">
          <div className="flex flex-row justify-between items-center bg-white rounded-lg shadow-md p-2">
            <h1 className="font-[roboto] text-[#0078BE] font-bold text-[32px]">
              {t("My Tickets")}
            </h1>
            <div className="flex flex-row"></div>
          </div>
          <hr />
          <div className="flex flex-col mt-4 ">
            <Table
              striped
              withBorder
              highlightOnHover
              className="rounded-lg shadow-md bg-white"
            >
              <thead>
                <tr>
                  <th className="text-left">{t("Title")}</th>
                  <th className="text-left">{t("Date")}</th>
                  <th className="text-left">{t("Description")}</th>
                  <th className="text-left">{t("Inbox")}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr
                      onClick={() => {
                        route(`/support_team/my_tickets/${item.id}`);
                      }}
                      className="cursor-pointer hover:bg-gray-100 transition-all"
                      key={index}
                    >
                      <td className="text-left">{item.title}</td>
                      <td className="text-left">{item.created_at}</td>
                      <td className="text-left">{item.description}</td>
                      <td className="text-left">
                        <div className="flex flex-row items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${
                              item?.ticketComments?.length > 0
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <p className="text-sm">
                            {item?.ticketComments?.length > 0
                              ? "Inbox"
                              : "No Inbox"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
        </PageProvider>
    </>
  );
};
