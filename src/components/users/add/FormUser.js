"use client"
import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { postUser} from "@/firebase/api/users";
import { alertConfirmation } from '@/components/reusables/alert'
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function FormUser({setFormActive, data}){
    const { signup }= useAuth()
    const [user, setUser] = useState(
        {
            name: "",
            email: "",
            dni:"",
            location: "",
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
        alertConfirmation('Agregar Usuario?', 'Agregara el usuario a la base de datos y creara una cuenta', async ()=>{
            let response
            try{
                await signup(user.email, user.dni)
                await postUser(user)
                router.push('/users')
                response = {success:true, message:'Cuenta de usuario creada'}
                console.log(response)
                return (response)
                
            }catch(error){
                response = {success:false, message:error.message}
                console.log(response)
                return (response)
            }
        })
    }
    const handleChange = (e)=>{
        setUser(
           { ...user,
            [e.target.id]:e.target.value}
        )
    }
    return (
        <> 
        <div className="shadow-xl p-8">
        <Icon onClick={()=>router.back()} type="button" path={mdiArrowLeft} size={1} color={'black'} className="mb-10"/>
            <div className="mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input  onChange={(e)=>handleChange(e)} value={user.email} type="text" id="email" className="bg-gray-50 bordere border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." />
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input onChange={(e)=>handleChange(e)} value={user.name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name..." required />
                </div> 
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI</label>
                    <input onChange={(e)=>handleChange(e)} value={user.dni} type="text" id="dni" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name..." required />
                </div> 
            </div> 
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input onChange={(e)=>handleChange(e)} value={user.location} type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Location..."  />
                </div>
            </div>       
            <button  onClick={handleSubmit} className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Agregar</button>
        </div>  
        </>
    )
}

