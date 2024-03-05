"use client"
import { searchSeriesAlgolia  } from '@/firebase/api/series'
import { useState } from 'react'
import Link from 'next/link' 

function CardMovie({movie}){
    return(
        <div key={movie?.id} className='mx-2 my-2 pb-2 px-2 shadow-lg'>
            <Link type="button"  href={"/movies/"+movie?.objectID}>
            <div className=' flex flex-row w-64'>
            <img src={"https://image.tmdb.org/t/p/w500"+movie?.poster_path} className="h-20 mr-2"/>
            <p>{movie.title}</p>
            </div>
            </Link>
        </div>
    )
}

export default function SearchMovie() {
    const [state, setState]=useState(null)
    const handleChange = async (e) => {    
        if (!e.target.value.length){
            setState(null)
        }else{
            setState(await searchSeriesAlgolia(e.target.value))
        }
    }
    return (
        <>
        <div >
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required onChange={(e) => handleChange(e)}/>
            </div>
        </div>
        <div className='mb-2'></div>
        {state?.data?.length?  
        <div className="flex flex-col bg-white shadow-xl overflow-auto max-h-96">
            {state.data.map((movie) =>
            <CardMovie movie={movie}/>)}    
        </div>:null
        }
        </>
    )
}
