// "use server";
"use  client";

import { ComboboxDemo } from '@/components/ComboboxDemo';
import { ComboboxDemo1 } from '@/components/ComboboxDemo1';
import { MeteorsDemo } from '@/components/MeteorsDemo';
import Scraper from '@/components/Scraper'
import { Meteors } from '@/components/ui/meteors';
import React from 'react'
import {useState} from "react"
const page = () => {

  return (
    <div className='flex'>
      <div className=''>
      <Filter/>
      <MeteorsDemo/>
      </div>
       <div>
        <Scraper field="python" geoid="106164952" page="1"/>
       </div>
    </div>
  )
}


const Filter =()=>{
  return (<div className='border-2 border-gray-300 flex m-3 w-[300px] flex-col  gap-4 p-3 rounded-lg' >
    <h1 className='font-bold'>Select Location</h1>
    <ComboboxDemo/>
    <h1 className='font-bold'>Select field</h1>
    <ComboboxDemo1/>
    <button className='bg-blue-100 hover:bg-blue-400 rounded-md w-fit p-3 '>Search</button>
  </div>
)
}
export default page
