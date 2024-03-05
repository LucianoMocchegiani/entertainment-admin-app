"use client"
import { useParams } from "next/navigation";
import { useState, useEffect} from "react";
import {getMovieDetail} from '@/firebase/api/movies'
import FormMovie from "./FormMovie";

export default function MovieDetail() {
    const {id} = useParams()
    const [state, setState]= useState({
        success: null, 
        message: null,
        data: null
    })
    const [formActive, setFormActive] = useState(false)

    const handleSetState = async ()=>{
        const {success, message, data} = await getMovieDetail(id)
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
        <>{formActive?<FormMovie setFormActive={()=>setFormActive(false)} data={state?state.data:null}/>:
            <div>
                <button onClick={()=>setFormActive(true)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar pelicula</button>
                    <h1 className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.title?state.data.title:null}</h1>
                    <div className='mb-2'></div>
                    <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">ID pelicula: {id}</p>
                    <div className='mb-2'></div>
                    <img src={state.data?.poster_path?"https://image.tmdb.org/t/p/w500"+state.data.poster_path:null}/>
                    <div className='mb-2'></div>
                    <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.overview?state.data.overview:null}</p>
                    <div className='mb-2'></div>
                    <div className='flex flex-wrap'>
                        {state.data?.genres?state.data.genres.map((genre)=>
                            <p className=" text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-auto" key={genre.id}>{genre.name}</p>
                        )
                        :null}
                    </div>
                    <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.belongs_to_collection?'Dentro de una coleccion':null}</p>
            </div>}
        </>
    )
}
