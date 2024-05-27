"use client"
import { useParams } from "next/navigation";
import { useState, useEffect} from "react";
import {getEpisodeDetail, getEpisodeDetailFirebase, postEpisode} from '@/firebase/api/episodes'
import FormEpisode from "./FormEpisode";
import { alertConfirmation } from '@/components/reusables/alert'
import { useSearchParams } from "next/navigation";

export default function EpisodeDetail() {
    const {id , season, episode} = useParams()
    const [state, setState]= useState({
        success: null,
        message: null,
        data: null
    })
    const searchParams = useSearchParams()
    const [formActive, setFormActive] = useState(false)
    const handleSetState = async ()=>{
        const episodeID = searchParams.get('episode_id')
        console.log(episodeID)
        const {success, message, data} = await getEpisodeDetailFirebase(episodeID)
        if(!data){
            setState({...state, message:'agregar'})
            return
        }else{
            setState({  
                success: success, 
                message: message,
                data: data
            })
        }
    }
    const handleSetStateApi = async ()=>{
        try{
            const {success, message, data} = await getEpisodeDetail(id, season, episode)
            const postResponse = await postEpisode({...data, serie_id:id})
            if(postResponse.success && success){
                const getResponse = await getEpisodeDetailFirebase(data.id)
                setState({ 
                    success: getResponse.success, 
                    message: getResponse.message,
                    data: getResponse.data
                })
                return(getResponse)
            }
            else{
                return {success: false, message:message+'. '+postResponse.message}
            }

        }
        catch(error){
            return {success: false, message:error.message}
        }
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

    return (
        <>{formActive?<FormEpisode setFormActive={()=>setFormActive(false)} data={state?state.data:null}/>:
            <div>
                {state.data?<button onClick={()=>setFormActive(true)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar capitulo</button>
                :state.message==='agregar'?<button onClick={()=>alertConfirmation('Agregar capitulo','se agregara el capitulo a la base de datos automaticamente.',()=>handleSetStateApi())} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar desde la api</button>:null}
                <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">Capitulo: {episode}</p>
                <h1 className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.name?state.data.name:null}</h1>
                <div className='mb-2'></div>
                <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.overview?state.data.overview:null}</p>
                <div className='mb-2'></div>
                <img src={state.data?.still_path?"https://image.tmdb.org/t/p/w500"+state.data.still_path:null}/>
                <div className='mb-2'></div>
            </div>}
        </>
    )
}
