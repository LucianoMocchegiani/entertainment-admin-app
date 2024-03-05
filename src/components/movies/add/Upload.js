import React, { useState, useEffect} from "react";

export default function UploadMovie({ movie, setMovie }){
   
    const [archive, setArchive]= useState(false)
    const uploadArchive = (e)=>{
        setArchive(e);
    }
   
    const  loadImageFromGalery = async ()=>{
        const response = {status:false, image:null}
        const permission = await ImagePicker.requestCameraPermissionsAsync()
        if(permission.status === 'denied'){
            Alert.alert('Aviso','Debes permitir el acceso para subir imagenes.')
            return 
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[4,4]
        })
        if(result.canceled){
            return response
        }
        response.status =true
        response.image = result.assets
        return response
    }
    const uploadImage = async (e)=>{
        const response = await loadImageFromGalery()
        if(!response.status){
            Alert.alert('Error','No has selecionado ninguna imagen.')
        }
        const transform = response.image.map(e=> {return e.uri})
        setMovie({
            ...product,
           image: response.image[0].uri
        })


    }

    return (
        <div>
            <input
                type="file"
                name="files"
                onChange={(e)=>uploadArchive(e.target.files)}    
            />
                 
        </div>       
    )
}

