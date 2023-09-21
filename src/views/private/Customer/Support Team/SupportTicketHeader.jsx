import React from 'react'
import { useTranslation } from "react-i18next";

const SupportTicketHeader = () => {
  const { t } = useTranslation();
  
  return (
    <div>
       <div
        style={{ backgroundImage: 'url("/BGFAQ2.svg")' }}
        className="flex flex-col pl-20 justify-center h-[77px]"
      >
        <div className="flex space-x-10  ">
          <a className=" font-bold text-white hover:underline focus:underline" href="/support_team/support_ticket">
            {t('Create New')}
          </a>
          <a className=" font-bold text-white hover:underline focus:underline" href="/support_team/my_tickets">
            {t('Manage Status')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default SupportTicketHeader
