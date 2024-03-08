import React, { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiUploadBox } from '@mdi/js';
import { uploadFirebase } from '@/firebase/api/upload'
import { ProgressBar } from "../reusables/ProgressBar";


const UploadFile = ({id}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [state, setState]= useState({
        status:'running',
        progress:0,
    })
    const [activeUpload, setActiveUpload]= useState(false)

    useEffect(()=>{
        if(state.progress==100){
            console.log('finalizado')
            setActiveUpload(false)
        }
    },[state])
  
    const handleFileUpload = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
        setActiveUpload(true)
        uploadFirebase({
            file:selectedFile, 
            id:id, 
            setState:setState, 
            state:state
        })
    };
    return(
       <> 
            <div className="flex flex-row mr-2 justify-center items-center text-white bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600  mt-2">
                <button onClick={handleUpload}><Icon path={mdiUploadBox} size={3} className="bg-blue-700 hover:bg-blue-900 dark:bg-blue-600"/></button>
                <input onChange={handleFileUpload} className="flex flex-row file:p-3 file:border-none file:mr-2 justify-center items-center file:text-base file:font-bold file:text-blue-700 file:hover:text-blue-900 file:bg-white file:focus:ring-4 file:focus:outline-none file:focus:ring-blue-300 file:rounded-lg w-full sm:w-auto px-5 py-2.5 text-center file:dark:bg-white  dark:focus:bg-slate-400 mt-2" type="file" id="file_input"/>
            </div>
            {activeUpload?<ProgressBar state={state} setState={setState} setActive={setActiveUpload} file={selectedFile?.name}/>:null}
        </>
    )
}
export default UploadFile