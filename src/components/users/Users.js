"use client"
import Link from 'next/link'
import { useState, useEffect} from "react";
import { getUsers } from '@/firebase/api/users' 
import InfiniteScroll from 'react-infinite-scroll-component';

function CardUser({user}){
    return(
        <div key={user?.id} className='mx-6 my-6 pb-2 px-2 shadow-lg'>
            <Link type="button"  href={"/users/"+user?.id}>
                <p>{user.name}</p>
                <p>{user.email}</p>
            </Link>
        </div>
    )
}

export default async function Users() {
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
        await getUsers(options)
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
        await getUsers(options)
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
            <div className="flex flex-col justify-center items-center ">
            {render.length?    
                render.map((user) =>
                    <CardUser user = {user}/>)
                :null
            }
            </div>
        </InfiniteScroll>
        </>
    )
}
