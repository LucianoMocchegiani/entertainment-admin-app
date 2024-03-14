"use client"
import { useState, useEffect} from "react";
import SeasonDetail from '@/components/series/season/SeasonDetail'

export default function SerieIdPage() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true) 
  }, [])

  return (
    <> 
    {isClient ?
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">

     {/* <ReactPlayer 
      url='https://www.youtube.com/watch?v=_w4sPyiNdBY'
      controls
     />  */}
     <SeasonDetail/>
    </main>:null}</>
  )
}
