
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://192.168.0.81:3000');

function UploadComponent() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const xhrRef = useRef(null);

  useEffect(() => {
    socket.on('uploadProgress', (data) => {
      setProgress(data.progress);
    });

    return () => {
      socket.off('uploadProgress');
    };
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setProgress(0);
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.open('POST', 'http://192.168.0.81:3000/upload/movies', true);
    xhr.setRequestHeader('socket-id', socket.id);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
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

  const handlePause = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.open('POST', 'http://localhost:3000/upload/movies', true);
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

  return (
    <div className="App">
      <h1>Subida de Video</h1>
      <input type="file" onChange={handleFileChange} />
      {!isUploading && <button onClick={handleUpload}>Subir</button>}
      {/* {isUploading && !isPaused && <button onClick={handlePause}>Pausar</button>}
      {isPaused && <button onClick={handleResume}>Reanudar</button>} */}
      <progress value={progress} max="100"></progress>
    </div>
  );
}
export default UploadComponent;

