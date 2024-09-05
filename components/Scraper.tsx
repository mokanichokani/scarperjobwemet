
import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt } from "react-icons/fa";
const Scraper = async ({field , geoid , page}:any) => {

  const staticData = await fetch(`https://api.scrapingdog.com/linkedinjobs/?api_key=66cd81240388ac60968d6b4c&field=${field}&geoid=${geoid}&page=${page}
`, { cache: 'force-cache' })

  const data = await staticData.json();

  return (
    <div className='' >
      {data.map((obj : any)=>(<div key={obj.job_id} className=''>
        <div className='flex gap-2 m-4 border w-[600px] border-black p-3 pr-7 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300'>
      <div className='mt-2'>
        <Image  src={obj.company_logo_url} alt="company logo" className='rounded-full' width={60} height={60}/>
      </div>
      <div className='flex flex-col gap-1'>
      <Link href={`${obj.job_link}`}><h1 className='font-bold text-2xl'>{obj.job_position}</h1></Link>
      <Link href={`${obj.company_profile}`}> <div className='flex items-center gap-1'><p className='text-sm underline'> {obj.company_name} </p><FaExternalLinkAlt className='w-3 h-3' /></div>  </Link>
      <p className='text-sm'>Location : {obj.job_location}</p>
      <p className='text-sm'>Posted on: {obj.job_posting_date}</p>
      <Link href={`${obj.job_link}`}> <div className='flex bg-blue-400 w-fit px-4 py-3 rounded-md text-white font-bold hover:text-black hover:bg-blue-500 items-center gap-1'><p className='text-sm '>Apply now</p><FaExternalLinkAlt className='w-3 h-3' /></div>  </Link>
      </div>
    </div>
      </div>))}

    </div>

  )
}

export default Scraper
