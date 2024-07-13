
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { putMovie } from '@/firebase/api/movies';
import { putEpisode } from '@/firebase/api/episodes'

export function ProgressBar({ id, file, setActive, serverpatch, movieData=null, serieData=null}) {
  const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [fileExtension, setFileExtension] = useState(null)

  const xhrRef = useRef(null);

  useEffect(() => {
    socket.on('uploadProgress', (data) => {
      setProgress(data.progress);
    });
    handleUpload()
    return () => {
      socket.off('uploadProgress');
    };
  },[]);


    const handleUpload = () => {
        let fileExt = null
        if (!file) return;
        switch (file.type) {
          case 'video/mp4':
            setFileExtension('.mp4');
            fileExt = '.mp4'
            break;
          case 'video/webm':
            setFileExtension('.webm');
            fileExt = '.webm'
            break;
          default:
            alert('Tipo de archivo no permitido. Solo se permiten archivos MP4 y WebM.');
            return;
        }
    
        const newFile = new File([file], id+fileExt, { type: file.type });
        const formData = new FormData();
        formData.append('file', newFile );

        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;
        xhr.open('POST', serverpatch, true);
        xhr.setRequestHeader('socket-id', socket.id);

        xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setProgress(percentComplete);
        }
        });

        xhr.onload = () => {
        if (xhr.status === 200) {
            if(movieData){
                putMovie({...movieData, firestore_url_video:id+fileExtension,})
            }else if(serieData){
                putEpisode({...serieData, firestore_url_video:id+fileExtension,})
            }
            console.log('Subida completada');
            alert('Subida completada');
            setIsUploading(false);
        } else {
            console.error('Error en la subida');
            alert('Error en la subida');
        }
        };

    xhr.send(formData);
    setIsUploading(true);
    setIsPaused(false);
  };

    const handlePause = () => {
        if (xhrRef.current) {
        xhrRef.current.abort();
        setIsPaused(true);
        }
    };

    const handleResume = () => {
        if (!file) return;
        let fileExt = null
        if (!file) return;
        switch (file.type) {
          case 'video/mp4':
            setFileExtension('.mp4');
            fileExt = '.mp4'
            break;
          case 'video/webm':
            setFileExtension('.webm');
            fileExt = '.webm'
            break;
          default:
            alert('Tipo de archivo no permitido. Solo se permiten archivos MP4 y WebM.');
            return;
        }
        const newFile = new File([file], id+fileExt, { type: file.type });
        const formData = new FormData();
        formData.append('file', newFile );

        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;
        xhr.open('POST', serverpatch, true);
        xhr.setRequestHeader('socket-id', socket.id);
        xhr.setRequestHeader('Content-Range', `bytes=${progress * file.size / 100}-`);

        xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100 + progress;
            setProgress(percentComplete);
        }
        });

        xhr.onload = () => {
        if (xhr.status === 200) {
            console.log('Subida completada');
            setIsUploading(false);
        } else {
            console.error('Error en la subida');
        }
        };

        xhr.send(formData);
        setIsUploading(true);
        setIsPaused(false);
    };
    const handleCancel =()=>{
        if( progress == 100){
            setActive(false)
            return
        }
        // funcion para cancelar
        setActive(false)
        return
    }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center w-full h-screen bg-white z-10">
     <div className="flex flex-wrap items-center justify-around flex-col bg-white w-3/4 h-250 rounded-25 z-10">
         <p className='text-lg text-black mb-2'>Progreso de subida</p>
         <p className='text-lg text-black mb-2'>{file?.name}</p>
         <div className="w-full bg-gray-200 rounded-full h-auto dark:bg-gray-700">
            <div>{progress}</div>
            <div style={{width:Number(progress)}} className={`bg-blue-600 h-2.5 rounded-full`}></div>
         </div>
         <div className='flex flex-row mt-2'>
            <button className='border-none text-white bg-black rounded p-2 ml-6' onClick={handleCancel}>Cancelar</button>
         </div>      
     </div>
    </div>
  );
}


