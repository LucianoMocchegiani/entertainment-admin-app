import { doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db, storage } from '../firebase';
import axios from 'axios'

export const getSeasonDetail=  async (id, season)=>{
    //api
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof Number(id) !== 'number'){
            response = { success:false, message:'Id value is not valid' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/tv/'+Number(id)+'/season/'+Number(season)+'?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es'
        const request = await axios.get(patch)
        response = { success:true, message:'Detalle de la temporada', data: request.data};
        console.log(response)
        return response
    } catch (error) {  
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const postSeason=  async (data)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const {id} = data
        data = {...data , updated_date:Timestamp.now(), created_date:Timestamp.now()}
        const selectedDoc = doc(db, `seasons/${id}`);
        const resolved = await setDoc(selectedDoc, data)
        response = { success:true, message:'Temporada cargada a firebase', data: resolved};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const DeleteSeason=  async (id)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedDoc = doc(db, `seasons/${id}`);
        const resolved = await deleteDoc(selectedDoc)
        response = { success:true, message:'Temporada eliminada de firebase', data: resolved};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const getSeasonDetailFirebase=  async (id)=>{
    //Firebase
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof Number(id) !== 'number'){
            response = { success:false, message:'Id value is not valid' };
            console.log(response);
            return response;
        }
        const selectedDoc = doc(db, 'seasons/'+id)
        const requestSnapshot = await getDoc(selectedDoc)
        if (requestSnapshot.exists()){
            const seasonData = { ...requestSnapshot.data(), id: requestSnapshot.id };
            response = { success:true, message:'Detalle de la temporada', data: seasonData};
        }else{
            response = { success:false, message:'No existe la temporada en la base de datos', data:null};
        }
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}