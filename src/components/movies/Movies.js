"use client"
import Link from 'next/link'
import { useState, useEffect} from "react";
import { getMovies } from '@/firebase/api/movies' 
import InfiniteScroll from 'react-infinite-scroll-component';

function CardMovie({movie}){
    return(
        <div key={movie?.id} className='mx-6 my-6 pb-2 px-2 shadow-lg'>
            <Link type="button"  href={"/movies/"+movie?.id}>
            <img src={"https://image.tmdb.org/t/p/w500"+movie?.poster_path} className="h-96"/></Link>
        </div>
    )
}

export default function Movies() {
    const [render, setRender]=useState([])
    async function fetchDataOnScroll(){

        const options = {
            requestType:'generic', 
            value:null, 
            value2:null,
            scroll:true, 
            setState:setRender, 
            prevState:render,
        }
        await getMovies(options)
    }
    async function fetchData(){
        const options = {
            requestType:'generic', 
            value:null,
            value2:null,
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
