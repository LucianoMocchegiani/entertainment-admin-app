import React, { useState, useEffect} from "react";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { postEpisode } from "@/firebase/api/episodes";
import { alertConfirmation } from '@/components/reusables/alert'
import { useRouter } from "next/navigation";
import Upload from './Upload'

export default function FormEpisode({setFormActive, data}){
    const [episode, setEpisode] = useState(
        {
            id: data.id,
            firestore_url_video:"",
            firestore_url_trailer:'',
            name: data.name,
            type: 'episode',
            runtime: data.runtime?data.runtime:null,
            overview: data.overview?data.overview:null,
            still_path:data.still_path?data.still_path:null,
            poster_path: data.poster_path?data.poster_path:null,
            episode_number: data.episode_number?data.episode_number:null,
            vote_average: data.vote_average?data.vote_average:null,
            air_date:data.air_date?data.air_date:null,
            created_date: data.created_date?data.created_date:null,
        }
    )
    const router = useRouter()
    const handleSubmit = ()=>{
        alertConfirmation('Actualizar capitulo?', 'Guardara los cambios realizados.', ()=>{
            // router.back()
            // return postEpisode(episode)
            return{success: false, message:'Funcion desabilitada'}
        })
    }
    const handleSubmitTrailer= ()=>{
        console.log('trailer')
    }
    return (
        <> 
        <div className="shadow-xl p-8">
        <Icon onClick={()=>setFormActive()} type="button" path={mdiArrowLeft} size={1} color={'black'} className="mb-10"/>
            <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input 
                    value={episode.name}
                    type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titulo..." required />
            </div> 
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">id</label>
                    <input value={episode.id} type="text" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Id..." required />
                </div>
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <input value={episode.status} type="text" id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Released" required />
                </div> 
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                    <input value={episode.type} type="text" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="episode..." required />
                </div> 
            </div>      
            <div className="mt-6 mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resumen</label>
                <textarea value={episode.overview} type="text" id="overview" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32  resize-none" placeholder="Resumen..." required/>
            </div>
            <Upload id={data.id} data={{...data, ...episode}} path={process.env.NEXT_PUBLIC_UPLOAD_HOST_SERIES}/>
            <button  onClick={handleSubmit} className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Actualizar</button>
        </div>  
        </>
    )
}

