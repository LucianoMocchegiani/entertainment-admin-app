"use client"
import { useState, useEffect} from "react";
import EpisodeDetail from '@/components/series/season/episode/EpisodeDetail'

export default function SerieIdPage() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true) 
  }, [])

  return (
    <> 
    {isClient ?
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
     <EpisodeDetail/>
    </main>:null}</>
  )
}
