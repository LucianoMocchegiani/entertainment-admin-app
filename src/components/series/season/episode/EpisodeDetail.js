"use client"
import { useParams } from "next/navigation";
import { useState, useEffect} from "react";
import {getEpisodeDetail} from '@/firebase/api/episodes'
import FormEpisode from "./FormEpisode";
import { alertConfirmation } from '@/components/reusables/alert'
import { useRouter } from "next/navigation";

export default function EpisodeDetail() {
    const {id , season, episode} = useParams()
    const router = useRouter()
    const [state, setState]= useState({
        success: null,
        message: null,
        data: null
    })
    const [formActive, setFormActive] = useState(false)
    const handleSetState = async ()=>{
        const {success, message, data} = await getEpisodeDetail(id,season,episode)
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
    },[season])
    useEffect(()=>{
       console.log(state.data)
    },[state])
    return (
        <>{formActive?<FormEpisode setFormActive={()=>setFormActive(false)} data={state?state.data:null}/>:
            <div>
                <button onClick={()=>setFormActive(true)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar capitulo</button>
                <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">Temporada: {season}</p>
                <h1 className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.name?state.data.name:null}</h1>
                <div className='mb-2'></div>
                <div className='mb-2'></div>
                <img src={state.data?.poster_path?"https://image.tmdb.org/t/p/w500"+state.data.poster_path:null}/>
                <div className='mb-2'></div>
                <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.overview?state.data.overview:null}</p>
                <div className='mb-2'></div>
            </div>}
        </>
    )
}
