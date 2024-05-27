"use client"
import { useState, useEffect} from "react";
import MovieDetail from '@/components/movies/MovieDetail'

 

export default function MovieIdPage() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true) 
  }, [])

  return (
    <> 
    {isClient ?
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
     <MovieDetail/>
    </main>:null}</>
  )
}
