"use client"
import { useState, useEffect} from "react";
import SelectCategory from './SelectCategory'

export default function Movies() {
    const [render, setRender]= useState([])
    const [filter, setFilter]= useState({})
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
            <div className="flex flex-row justify-center items-center">
            <label className="">Filtrar por plataforma</label>
            <SelectCategory/>
            <label>Filtrar por genero</label>  
            <SelectCategory/>
            <div className="flex items-center">
                <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Video</label>
            </div>
            </div>
        </>
    )
}
