"use client"
import { useState } from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar(){
    const pathname = usePathname()
    const [hidden, setHidden] = useState(true)
    const handleHidden =()=>{
        setHidden(!hidden)
    }
    return (
        <div className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Movie Nigth</span>
                </Link>
                <button onClick={handleHidden} data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
                </button>
                <div className= {hidden?"hidden w-full":"w-full"} id="navbar-hamburger">
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <li>
                     <Link href="/movies" className={pathname==="/movies"? "block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} aria-current="page">Peliculas</Link>
                    </li>
                    <li>
                    <Link href="/series"className={pathname==="/series"? "block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}>Series</Link>
                    </li>
                    <li>
                    <Link href="/users" className={pathname==="/users"? "block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}>Usuarios</Link>
                    </li>
                </ul>
                </div>
            </div>
        </div>
        
    )
}

