"use client"
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react'


export default function App() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return (
    <>{isClient ?
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      
     {/* <ReactPlayer 
      url='https://www.youtube.com/watch?v=_w4sPyiNdBY'
      controls
     />  */}
    </main>: null}</>
  )
}
