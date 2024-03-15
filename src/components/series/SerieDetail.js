"use client"
import { useParams } from "next/navigation";
import { useState, useEffect} from "react";
import {getSerieDetail, DeleteSerie} from '@/firebase/api/series'
import FormSerie from "./FormSerie";
import { alertConfirmation } from '@/components/reusables/alert'
import { useRouter } from "next/navigation";

function SeasonCard({ season, router, serie}) {
    const {name, season_number, id} = season
    return (
        <div className="relative text-left mt-4">
                <button
                    className="btnPrimary w-auto"
                    aria-haspopup="true"
                    id="dropdown-toggle-button"
                    onClick={() =>  router.push(`/series/${serie}/${season_number}?season_id=${id}`)}
                >
                    <p className={` text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-auto`}>{name}</p>
                </button>
        </div>
    );
};

export default function SerieDetail() {
    const {id} = useParams()
    const [state, setState]= useState({
        success: null, 
        message: null,
        data: null
    })
    const [formActive, setFormActive] = useState(false)
    const router = useRouter()
    const handleSetState = async ()=>{
        const {success, message, data} = await getSerieDetail(id)
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
    const  handleDelete = ()=>{
        alertConfirmation('Quiere eliminar la serie?','Se eliminara el video del store',async()=>{
            router.push('/series')
            return await DeleteSerie(id)
        })
    }
    
    return (
        <>{formActive?<FormSerie setFormActive={()=>setFormActive(false)} data={state?state.data:null}/>:
        <div>
            <button onClick={()=>setFormActive(true)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar serie</button>
            <button onClick={()=>handleDelete()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Eliminar Serie</button>
                <h1 className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white">{state.data?.name?state.data.name:null}</h1>
                <div className='mb-2'></div>
                <p className="max-w-lg text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">ID serie: {id}</p>
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
                {state.data?.seasons?
                <div className='flex flex-col'>
                    <p className=" text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-auto">{state.data.seasons.length} Temporadas</p>
                    {
                        state.data.seasons.map((season)=>
                        <SeasonCard season={season} router={router} serie={id}/>)
                    }
                </div>:null}
        </div>}
    </>
    )
}
