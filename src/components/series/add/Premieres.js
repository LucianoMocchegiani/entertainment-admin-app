"use client"
import Link from 'next/link'
import { useState, useEffect} from "react";
import { getPremieres } from '@/firebase/api/series' 
import InfiniteScroll from 'react-infinite-scroll-component';

function CardMovie({movie}){
    return(
        <div key={movie?.id} className='mx-6 my-6 pb-2 px-2 shadow-lg'>
            <Link type="button"  href={"/add-series/"+movie?.id}>
            <img src={"https://image.tmdb.org/t/p/w500"+movie?.poster_path} className="h-96"/></Link>
        </div>
    )
}

export default  function Movies() {
    const [render, setRender]=useState([])
    const [page, setPage]= useState(1)
    async function fetchData(){
        const options = {
            page:page, 
            setState:setRender, 
            prevState:render,
        }
        await getPremieres(options)
        setPage(page+1)
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <> 
            <InfiniteScroll
                dataLength={render.length}
                next={fetchData}
                hasMore={true} // Replace with a condition based on your data source
                // loader={<p>Cargando...</p>}
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
