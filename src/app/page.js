"use client"
import ReactPlayer from 'react-player'
import FileUploader from '@/components/prueba/FileUploader'
import { useState, useEffect } from 'react'

export default function App() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return (
    <>{isClient ?
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <ReactPlayer
          className='react-player'
          url='http://172.16.38.68//videos/movies/512195.mp4'
          width='80%'
          height='80%'
          controls={true}
        />
    </main>: null}</>
  )
}
