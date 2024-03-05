import React, { useState, useEffect} from "react";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { postUser } from "@/firebase/api/users";
import { alertConfirmation } from '@/components/reusables/alert'
import { useRouter } from "next/navigation";

export default function FormUser({setFormActive, data}){
    const [user, setUser] = useState(
        {
            id: data.id,
            name: data.name,
            email: data.email,
            location: data.location,
            plan:'ninguno',
            active:false,
            online:false,
            profiles:[],
            fatture:[],
            whaching_now:[],
            finishied:[],
            rented:[],
            last_date_conection:null,
        }
    )
    const router = useRouter()
    const handleSubmit = ()=>{
        alertConfirmation('Actualizar usuario?', 'Actualiza los cambios realizados', ()=>{
            router.push('/users')
            return postUser(user)
        })
    }
    return (
        <> 
        <div className="shadow-xl p-8">
        <Icon onClick={()=>setFormActive()} type="button" path={mdiArrowLeft} size={1} color={'black'} className="mb-10"/>
            <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input 
                    value={user.name}
                    type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name..." required />
            </div> 
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                    <input value={user.id} type="text" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ID..." required />
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input value={user.email} type="text" id="email" className="bg-gray-50 bordere border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." />
                </div>  
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input value={user.location} type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Location..."  />
                </div>
            </div>       
            <button  onClick={handleSubmit} className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Actualizar</button>
        </div>  
        </>
    )
}

