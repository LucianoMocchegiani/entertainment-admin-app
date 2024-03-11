import React, { useState, useEffect} from "react";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { postSerie } from "@/firebase/api/series";
import { alertConfirmation } from '@/components/reusables/alert'
import { useRouter } from "next/navigation";
import Platforms from './Platform'
import Labels from './Labels'

export default function FormSerie({setFormActive, data}){
    const [serie, setSerie] = useState(
        {
            id: data.id,
            tmdb_id: data.id,
            name: data.name,
            original_name:data.original_name,
            type: 'serie',
            genres: data.genres,
            tagline: data.tagline,
            overview: data.overview,
            poster_path: data.poster_path,
            platform:  {id:'Ninguna',name:'Ninguna'},
            label: {id:'Ninguna',name:'Ninguna'},
            status: "Released",
            in_production:data.in_production,
            seasons:data.seasons,
            first_air_date:data.first_air_date,
            last_air_date:data.last_air_date,
            next_episode_to_air: null,
        }
    )
    const router = useRouter()
    const handleSubmit = ()=>{
        alertConfirmation('Actualizar Serie?', 'Guardara los cambios realizados.', ()=>{
            router.push('/series')
            // return postSerie(serie)
        })
    }
    const handleSubmitVideo= ()=>{
        console.log('video')
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
                    value={serie.name}
                    type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titulo..." required />
            </div> 
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">id</label>
                    <input value={serie.id} type="text" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Id..." required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tmdb id</label>
                    <input value={serie.tmdb_id} type="text" id="tmdb_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tmdb Id..."  />
                </div>
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <input value={serie.status} type="text" id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Released" required />
                </div> 
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                    <input value={serie.type} type="text" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="serie..." required />
                </div> 
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plataforma</label>
                    <Platforms platform={serie.platform} setPlatform={(e)=>setSerie({...serie, platform:e})}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etiqueta</label>
                    <Labels label={serie.label} setLabel={(e)=>setSerie({...serie, label:e})}/>
                </div>
            </div>
            <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Generos</label>
                    <div className='flex flex-wrap'>
                        {serie?.genres?serie.genres.map((genre)=>
                            <p className=" text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-auto" key={genre.id}>{genre.name}</p>
                        )
                        :null}
                    </div>
                </div> 
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Poster</label>
            </div> 
            <img src={serie?.poster_path?"https://image.tmdb.org/t/p/w500"+serie.poster_path:null}/>
            <div className="mt-6 mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Presentacion</label>
                <textarea value={serie.tagline} type="text" id="tagline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12 resize-none" placeholder="Presentacion..." required/>
            </div>
            <div className="mt-6 mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resumen</label>
                <textarea value={serie.overview} type="text" id="overview" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32  resize-none" placeholder="Resumen..." required/>
            </div>
            <button  onClick={handleSubmit} className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Actualizar</button>
        </div>  
        </>
    )
}

