"use client"
import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { postMovie } from "@/firebase/api/movies";
import { alertConfirmation } from '@/components/reusables/alert'
import { useRouter } from "next/navigation";
import Platforms from './Platform'
import Labels from './Labels'
import Upload from './Upload'


export default function FormMovie({setFormActive, data}){
    const [movie, setMovie] = useState(
        {
            id: data.id,
            tmdb_id: data.id,
            imdb_id: data.imdb_id,
            firestore_url_video:'',
            firestore_url_trailer:'',
            title: data.title,
            type: 'movie',
            genres: data.genres,
            tagline: data.tagline,
            overview: data.overview,
            poster_path: data.poster_path,
            platform:  {id:'Ninguna',name:'Ninguna'},
            label: {id:'Ninguna',name:'Ninguna'},
            belongs_to_collection: data.belongs_to_collection,
            release_date: data.release_date,
            runtime: data.runtime,
            status: "Released",
        }
    )
    const router = useRouter()
    const handleSubmit = ()=>{
        alertConfirmation('Actualizar pelicula?', 'Guardara los cambios realizados.', ()=>{
            router.push('/movies')
            // return postMovie(movie)
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                    <input 
                    value={movie.title}
                    type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titulo..." required />
            </div> 
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">id</label>
                    <input value={movie.id} type="text" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Id..." required />
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">imdb id</label>
                    <input value={movie.imdb_id} type="text" id="imdb_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Imdb Id..." />
                </div>  
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tmdb id</label>
                    <input value={movie.tmdb_id} type="text" id="tmdb_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tmdb Id..."  />
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duracion</label>
                    <input value={movie.runtime} type="number" id="runtime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123.." required />
                </div>
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <input value={movie.status} type="text" id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Released" required />
                </div> 
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                    <input value={movie.type} type="text" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movie..." required />
                </div> 
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plataforma</label>
                    <Platforms platform={movie.platform} setPlatform={(e)=>setMovie({...movie, platform:e})}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etiqueta</label>
                    <Labels label={movie.label} setLabel={(e)=>setMovie({...movie, label:e})}/>
                </div>
            </div>
            <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Generos</label>
                    <div className='flex flex-wrap'>
                        {movie?.genres?movie.genres.map((genre)=>
                            <p className=" text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-auto" key={genre.id}>{genre.name}</p>
                        )
                        :null}
                    </div>
                </div> 
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Poster</label>
            </div> 
            <img src={movie?.poster_path?"https://image.tmdb.org/t/p/w500"+movie.poster_path:null}/>
            <div className="mt-6 mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Presentacion</label>
                <textarea value={movie.tagline} type="text" id="tagline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12 resize-none" placeholder="Presentacion..." required/>
            </div>
            <div className="mt-6 mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resumen</label>
                <textarea value={movie.overview} type="text" id="overview" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32  resize-none" placeholder="Resumen..." required/>
            </div>
            <button  onClick={handleSubmit} className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Actualizar</button>
            <Upload id={movie.id}/>
            <button  onClick={handleSubmitTrailer} className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Subir trailer</button>
        </div>  
        </>
    )
}

