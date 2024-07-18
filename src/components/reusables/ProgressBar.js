import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { putMovie } from '@/firebase/api/movies';
import { putEpisode } from '@/firebase/api/episodes';

export function ProgressBar({ id, file, setActive, serverpatch, movieData = null, serieData = null }) {
  const socket = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileExtension, setFileExtension] = useState(null);

  const xhrRef = useRef(null);

  useEffect(() => {
    console.log(serverpatch)
    console.log(process.env.NEXT_PUBLIC_SERVER_URL)
    socket.current = io(process.env.NEXT_PUBLIC_SERVER_URL);

    socket.current.on('uploadProgress', (data) => {
      setProgress(data.progress);
    });

    return () => {
      socket.current.off('uploadProgress');
      socket.current.disconnect();
    };
  }, []);

  const handleUpload = () => {
    if (!file) {
      console.error('No se ha seleccionado ningún archivo para subir.');
      return;
    }

    let fileExt = null;
    switch (file.type) {
      case 'video/mp4':
        setFileExtension('.mp4');
        fileExt = '.mp4';
        break;
      case 'video/webm':
        setFileExtension('.webm');
        fileExt = '.webm';
        break;
      default:
        alert('Tipo de archivo no permitido. Solo se permiten archivos MP4 y WebM.');
        return;
    }

    const newFile = new File([file], id + fileExt, { type: file.type });
    const formData = new FormData();
    formData.append('file', newFile);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.open('POST', serverpatch, true);
    xhr.setRequestHeader('socket-id', socket.current.id);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete);
      }
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        if (movieData) {
          putMovie({ ...movieData, firestore_url_video: id + fileExtension });
        } else if (serieData) {
          putEpisode({ ...serieData, firestore_url_video: id + fileExtension });
        }
        console.log('Subida completada');
        alert('Subida completada');
      } else {
        console.error('Error en la subida');
        alert('Error en la subida');
      }
      setIsUploading(false); // Se desactiva la carga después de completar o fallar
      setActive(false); // Cierra el modal después de completar o fallar
    };

    xhr.send(formData);
    setIsUploading(true); // Se activa la carga al iniciar
  };

  const handleToggleUpload = () => {
    if (isUploading) {
      if (xhrRef.current) {
        xhrRef.current.abort();
      }
      setIsUploading(false); // Se desactiva la carga al cancelar
      setProgress(0); // Reinicia el progreso al cancelar
    } else {
      handleUpload();
    }
  };

  const handleCancel= ()=>{
    if (xhrRef.current) {
      xhrRef.current.abort();
    }
    setIsUploading(false); // Se desactiva la carga al cancelar
    setProgress(0);
    setActive(false)
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center w-full h-screen bg-white z-10">
      <div className="flex flex-wrap items-center justify-around flex-col bg-white w-3/4 h-250 rounded-25 z-10">
        <p className='text-lg text-black mb-2'>Progreso de subida</p>
        <p className='text-lg text-black mb-2'>{file?.name}</p>
        <div className="w-full bg-gray-200 rounded-full h-auto dark:bg-gray-700">
          <div>{progress}%</div>
          <div style={{ width: `${progress}%` }} className="bg-blue-600 h-2.5 rounded-full"></div>
        </div>
        <div className='flex flex-row mt-2'>
          <button className='border-none text-white bg-black rounded p-2 ml-6' onClick={() => handleCancel()}>
            Cancelar
          </button>
          <button className='border-none text-white bg-black rounded p-2 ml-6' onClick={handleToggleUpload}>
            {isUploading ? 'Pausar' : 'Subir'}
          </button>
        </div>
      </div>
    </div>
  );
}
