import axios from 'axios'
import { getFirestore, doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL} from 'firebase/storage';


export const searchMovies=  async (search)=>{
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof search !== 'string'){
            response = { success:false, message:'Search is not string or is undefine' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/search/movie?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es&query='+search
        const request = await axios.get(patch)
        response = { success:true, message:'Peliculas encontradas', data: request.data.results};
            
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}