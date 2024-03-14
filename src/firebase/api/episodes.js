import { doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db, storage } from '../firebase';
import axios from 'axios'

export const getEpisodeDetail=  async (id, season, episode)=>{
    //api
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof Number(id) !== 'number'){
            response = { success:false, message:'Id value is not valid' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/tv/'+Number(id)+'/season/'+Number(season)+'/episode/'+Number(episode)+'?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es'
        const request = await axios.get(patch)
        response = { success:true, message:'Detalle del capitulo', data: request.data};
        console.log(response)
        return response
    } catch (error) {  
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const postEpisode=  async (data)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const {id} = data
        data = {...data , updated_date:Timestamp.now(), created_date:Timestamp.now()}
        const selectedDoc = doc(db, `episodes/${id}`);
        const resolved = await setDoc(selectedDoc, data)
        response = { success:true, message:'Capitulo cargado a firebase', data: resolved};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const DeleteEpisode=  async (id)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedDoc = doc(db, `episode/${id}`);
        const resolved = await deleteDoc(selectedDoc)
        response = { success:true, message:'Capitulo eliminado de firebase', data: resolved};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

