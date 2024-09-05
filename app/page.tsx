"use client"
import { FaCity, FaBookOpen, FaRegFileAlt } from 'react-icons/fa';
import { FaComputer } from "react-icons/fa6";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt } from "react-icons/fa";
import "../app/globals.css";
const indianCities = [
  { name: "Mumbai", geoid: 90009639 },
  { name: "Delhi", geoid: 106187582 },
  { name: "Bengaluru", geoid: 105214831 },
  { name: "Hyderabad", geoid: 105556991 },
  { name: "Ahmedabad", geoid: 104990346 },
  { name: "Chennai", geoid: 106888327 },
  { name: "Kolkata", geoid: 111795395 },
  { name: "Pune", geoid: 114806696 },
  { name: "Jaipur", geoid: 101716408 },
  { name: "Lucknow", geoid: 102335936 }
];

const Scraper = () => {
  const [field1, setField1] = useState('');
  const [geoid1, setGeoid1] = useState('');
  const [city, setCity] = useState('');
  const [page1, setPage1] = useState('');
  const [data, setData] = useState([]);

  
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cityName = e.target.value;
    setCity(cityName);

    const cityData = indianCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (cityData) {
      setGeoid1(cityData.geoid.toString());
    } else {
      setGeoid1(''); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const staticData = await fetch(`https://api.scrapingdog.com/linkedinjobs/?api_key=66cd81240388ac60968d6b4c&field=${field1}&geoid=${geoid1}&page=${page1}`, { cache: 'force-cache' });
    const fetchedData = await staticData.json();
    setData(fetchedData);
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="mb-5 flex gap-2">
<div className="space-y-4">
      {/* Field Input */}
      <div className="flex items-center border border-black rounded-lg p-3">
        <FaComputer className="mr-2 text-gray-600" />
        <input
          type="text"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
          placeholder="Field (e.g., Python)"
          className="flex-1 outline-none"
        />
      </div>

      {/* City Input */}
      <div className="flex items-center border border-black rounded-lg p-3">
        <FaCity className="mr-2 text-gray-600" />
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="City (e.g., Mumbai)"
          className="flex-1 outline-none"
        />
      </div>

      {/* Page Input */}
      <div className="flex items-center border border-black rounded-lg p-3">
        <FaRegFileAlt className="mr-2 text-gray-600" />
        <input
          type="text"
          value={page1}
          onChange={(e) => setPage1(e.target.value)}
          placeholder="Page (e.g., 3)"
          className="flex-1 outline-none"
        />
      </div>
    </div>
        <div><button type="submit" className=" bg-blue-400 p-3 rounded-lg  text-white">Search</button></div>
      </form>

      <div>
        {data.map((obj: any) => (
          <div key={obj.job_id} className='flex gap-2 m-4 border w-[600px] border-black p-3 pr-7 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300'>
            <div className='mt-2'>
              <Image src={obj.company_logo_url} alt="company logo" className='rounded-full' width={60} height={60} />
            </div>
            <div className='flex flex-col gap-1'>
              <Link href={obj.job_link}><h1 className='font-bold text-2xl'>{obj.job_position}</h1></Link>
              <Link href={obj.company_profile}> 
                <div className='flex items-center gap-1'>
                  <p className='text-sm underline'>{obj.company_name}</p>
                  <FaExternalLinkAlt className='w-3 h-3' />
                </div>
              </Link>
              <p className='text-sm'>Location: {obj.job_location}</p>
              <p className='text-sm'>Posted on: {obj.job_posting_date}</p>
              <Link href={obj.job_link}>
                <div className='flex bg-blue-400 w-fit px-4 py-3 rounded-md text-white font-bold hover:text-black hover:bg-blue-500 items-center gap-1'>
                  <p className='text-sm'>Apply now</p>
                  <FaExternalLinkAlt className='w-3 h-3' />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scraper;
