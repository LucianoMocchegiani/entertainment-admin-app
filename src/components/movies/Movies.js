"use client"
import Link from 'next/link'
import { useState, useEffect} from "react";
import { getMovies } from '@/firebase/api/movies' 
import InfiniteScroll from 'react-infinite-scroll-component';
import Filters from './Filters'

function CardMovie({movie}){
    return(
        <div key={movie?.id} className='mx-6 my-6 pb-2 px-2 shadow-lg'>
            <Link type="button"  href={"/movies/"+movie?.id}>
            <img src={"https://image.tmdb.org/t/p/w500"+movie?.poster_path} className="h-96"/></Link>
        </div>
    )
}

export default function Movies() {
    const [render, setRender]= useState([])
    const [platform, setPlatform]=useState({id:'ninguna',name:'ninguna'})
    const [genre, setGenre]=useState({id:'ninguna',name:'ninguna'})
    const [label, setLabel]=useState({id:'ninguna',name:'ninguna'})
    const [video, setVideo]=useState({id:'todas',name:'todas'})
    async function fetchDataOnScroll(){
        const options = {
            requestType:'generic', 
            platform:platform,
            genre:genre,
            label:label,
            video:video,
            scroll:true, 
            setState:setRender, 
            prevState:render,
        }
        await getMovies(options)
    }
    async function fetchData(){
        const options = {
            requestType:'generic', 
            platform:platform,
            genre:genre,
            label:label,
            video:video,
            scroll:false, 
            setState:setRender, 
            prevState:render,
        }
        await getMovies(options)
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <>
        <Filters/>
        <InfiniteScroll
            dataLength={render.length}
            next={fetchDataOnScroll}
            hasMore={true} // Replace with a condition based on your data source
            // loader={<p>Cargando...</p>}
            // endMessage={<p>No hay peliculas</p>}
        >
            <div className="flex flex-wrap justify-center items-center">
            {render?.length?    
                render.map((movie) =>
                    <CardMovie movie = {movie}/>)
                :null
            }
            </div>
        </InfiniteScroll>
        </>
    )
}
