import React from 'react'
import Image from './SICON.png';
import { useTranslation } from "react-i18next";

function Search() {
  const { t } = useTranslation();
  return (
    <>
      <div className='flex mt-2 ml-6 space-x-3'>
        <p className='text-xs mt-0.5'>Find Ticket</p>
        <img src={Image} alt="" className='w-4 h-4 mt-1' />
        <input
          className='border-none pl-10 w-5/12 text-xs'
          type="text"
          placeholder={t('Enter Here Ticket Number,Name of User Or Other Searching Details')} />
      </div>
      {/* <hr className='w-7/12 h-24 ' /> */}
      <div className="border-b-2  border-black w-5/12 ml-6"></div>
    </>
  )
}

export default Search
