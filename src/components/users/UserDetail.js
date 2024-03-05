"use client"
import { useParams } from "next/navigation";
import { useState, useEffect} from "react";
import {getUserDetail} from '@/firebase/api/users'
import FormUser from "./FormUser";

export default function UserDetail() {
    const {id} = useParams()
    const [state, setState]= useState({
        success: null, 
        message: null,
        data: null
    })
    const [formActive, setFormActive] = useState(false)

    const handleSetState = async ()=>{
        const {success, message, data} = await getUserDetail(id)
        setState({
            success: success, 
            message: message,
            data: data
        })
    }
    useEffect(()=>{
        handleSetState()
        return(()=>{
            setState({
                success: null, 
                message: null,
                data: null
            })
        })
    },[id])
    
    return (
        <>{formActive?<FormUser setFormActive={()=>setFormActive(false)} data={state?state.data:null}/>:
            <div>
                <button onClick={()=>setFormActive(true)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar usuario</button>
                <div className='mb-2'></div>
                    <h1 className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.name?state.data.name:null}</h1>
                    <div className='mb-2'></div>
                    <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">Email: {id.replace("%40",'@')}</p>
                    <div className='mb-2'></div>
                    <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">DNI: {state.data?.dni?state.data.dni:null}</p>
                    <div className='mb-2'></div>
                    <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">Nombre: {state.data?.name?state.data.name:null}</p>
                    <div className='mb-2'></div>
                    <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.nota?'Nota: '+state.data.nota:null}</p>
            </div>}
        </>
    )
}
