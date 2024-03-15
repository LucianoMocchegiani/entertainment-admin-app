import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiPauseBox } from '@mdi/js';
import { mdiPlayBox } from '@mdi/js';
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebase/firebase';

let uploadTask = null

export function ProgressBar({ id, file, setActive, patch}){
    const[progress, setProgress] = useState(0)
    const[status, setStatus] = useState('running')

    useEffect(()=>{
        if(!uploadTask){
            const metadata = {contentType: file.type}
            patch = patch? patch :'m-videos/'
            const storageRef = ref(storage, patch + id)
            uploadTask = uploadBytesResumable(storageRef, file, metadata)
            uploadTask.on('state_changed', (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                switch (snapshot.state) {
                    case 'paused':
                        setStatus('paused')
                        console.log('Upload is paused');
                    break;
                    case 'running':
                        setStatus('running')
                        console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                    break;
                    case 'storage/canceled':
                    break;
                    case 'storage/unknown':
                    break;
                }
            }, )
        } 
    },[])

    useEffect(()=>{
        console.log('use  '+ progress)
        console.log(status)
    },[progress, status])

    const handleCancel =()=>{
        if( progress == 100){
            setActive(false)
            return
        }
        uploadTask.cancel()
        setActive(false)
        return
    }
    const handlePause = () => {
        if (uploadTask) {
          uploadTask.pause();
          setStatus('paused');
        }
    };
    
    const handleResume = () => {
        if (uploadTask) {
          uploadTask.resume();
          setStatus('running');
        }
    };

    return(
        <div className="fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center w-full h-screen bg-white z-10">
            <div className="flex flex-wrap items-center justify-around flex-col bg-white w-3/4 h-250 rounded-25 z-10">
                <p className='text-lg text-black mb-2'>Progreso de subida</p>
                <p className='text-lg text-black mb-2'>{file?.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-auto dark:bg-gray-700">
                    <div>{progress}</div>
                    <div>{Math.round(Number(progress))+' %'}</div>
                    <div className={`bg-blue-600 h-2.5 rounded-full w-${Math.round(Number(progress))}`}></div>
                </div>
                <div className='flex flex-row mt-2'>
                    {status==='running'?<button className='border-none mr-4' onClick={handlePause}><Icon path={mdiPauseBox} size={2} /></button>:
                    <button className='border-none mr-4' onClick={handleResume}><Icon path={mdiPlayBox} size={2} /></button>}
                    <button className='border-none text-white bg-black rounded p-2 ml-6' onClick={handleCancel}>Cancelar</button>
                </div>      
            </div>
        </div>
    )
}