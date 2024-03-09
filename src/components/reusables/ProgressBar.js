import { useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiPauseBox } from '@mdi/js';
import { mdiPlayBox } from '@mdi/js';
import { UploadFile} from '@/firebase/api/upload'

let initUpload = null

export function ProgressBar({ id, file, setActive }){
    
    useEffect(()=>{
        if(!initUpload){
            initUpload = UploadFile( selectedFile , id, 'm-videos/' )
            initUpload.on()
        }
    },[])

    const handleCancel =()=>{
        initUpload.cancel()
        setActive(false)
    }

    return(
        <div className="fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center w-full h-screen bg-white z-10">
            <div className="flex flex-wrap items-center justify-around flex-col bg-white w-3/4 h-250 rounded-25 z-10">
                <p className='text-lg text-black mb-2'>Progreso de subida</p>
                <p className='text-lg text-black mb-2'>{file.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className={"bg-blue-600 h-2.5 rounded-full width:"+initUpload?.progress+'%'}></div>
                </div>
                <div className='flex flex-row mt-2'>
                    {initUpload?.status==='running'?<button className='border-none mr-4' onClick={initUpload.paused()}><Icon path={mdiPauseBox} size={2} /></button>:
                    <button className='border-none mr-4' onClick={initUpload.resume()}><Icon path={mdiPlayBox} size={2} /></button>}
                    <button className='border-none text-white bg-black rounded p-2 ml-6' onClick={handleCancel}>Cancelar</button>
                </div>      
            </div>
        </div>
    )
}