"use client"
import { useParams } from "next/navigation";
import { useState, useEffect} from "react";
import {getSeasonDetail, getSeasonDetailFirebase, postSeason} from '@/firebase/api/seasons'
import { alertConfirmation } from '@/components/reusables/alert'
import FormSeason from "./FormSeason";
import { useRouter, useSearchParams } from "next/navigation";

function EpisodeCard({ episode, season, serie, router}) {
    const {episode_number, name, id} = episode
    return (
        <div className="relative text-left mt-4 w-auto">
                <button
                    className="btnPrimary w-auto"
                    aria-haspopup="true"
                    id="dropdown-toggle-button"
                    onClick={() =>  router.push(`/series/${serie}/${season}/${episode_number}?episode_id=${id}`)}
                >
                    <p className={`text-auto text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-auto`}>Capitulo {episode_number}: {name}</p>
                </button>
         </div> 
    );
};

export default function SeasonDetail() {
    const {id , season} = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [state, setState]= useState({
        success: null,
        message: null,
        data: null
    })
    const [formActive, setFormActive] = useState(false)

    const handleSetState = async ()=>{
        const seasonID = searchParams.get('season_id')
        const {success, message, data} = await getSeasonDetailFirebase(seasonID)
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
            const {success, message, data} = await getSeasonDetail(id,season)
            const postResponse = await postSeason(data)
            if(postResponse.success && success){
                const getResponse = await getSeasonDetailFirebase(data.id)
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
        <>{formActive?<FormSeason setFormActive={()=>setFormActive(false)} data={state?state.data:null}/>:
            <div>
                {state.data?<button onClick={()=>setFormActive(true)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar temporada</button>
                :state.message==='agregar'?<button onClick={()=>alertConfirmation('Agregar season','se agregara la season a la base de datos automaticamente.',()=>handleSetStateApi())} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar desde la api</button>:null}
                <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">Temporada: {season}</p>
                <h1 className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.name?state.data.name:null}</h1>
                <div className='mb-2'></div>
                <div className='mb-2'></div>
                <img src={state.data?.poster_path?"https://image.tmdb.org/t/p/w500"+state.data.poster_path:null}/>
                <div className='mb-2'></div>
                <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.overview?state.data.overview:null}</p>
                <div className='mb-2'></div>
                {state.data?.episodes?
                <div className='flex flex-col'>
                    <p className=" text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-auto">{state.data.episodes.length} Capitulos</p>
                    {
                        state.data.episodes.map((episode)=>
                        <EpisodeCard episode={episode} season={season} router={router} serie={id}/>)
                    }
                </div>:null}
            </div>}
        </>
    )
}
