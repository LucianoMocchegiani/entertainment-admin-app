import { doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios'
import algoliasearch from 'algoliasearch/lite'

export const searchMovies=  async (search)=>{
    //api
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

export const getPremieres=  async ( 
    options = {
        page:1, 
        setState:(e)=>console.log(e), 
        prevState:[],
    })=>
    {
    //api
    try {
        const{ page, setState, prevState}=options
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const patch = 'https://api.themoviedb.org/3/movie/now_playing?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es&page='+page
        const request = await axios.get(patch)
        response = { success:true, message:'Estrenos encontrados', data: request.data.results};
        setState([...prevState, ...request.data.results])
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}


export const searchMoviesAlgolia = async (search) =>{
    let response
    try {
        const APPLICATION_ID = 'K7DJSQSIE8'
        const SEARCH_API_KEY = '8233808a4024df9610f4720a1a15c41d'
        const ALGOLIA_INDEX = 'entertainment-app-movie'
        const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY)
        const index = client.initIndex(ALGOLIA_INDEX)
        const {hits} = await index.search(search, {
            hitsPerPage: 5
        })
        response = { success:true, message: 'Peliculas obtenidas', data:hits};
        console.log(response)
        return response
    } catch(error) {
        response = { success:false, message: error.message };
        console.log(response)
        return response
    }
}

export const getMovieDetail=  async (id)=>{
    //api
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof Number(id) !== 'number'){
            response = { success:false, message:'Id value is not valid' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/movie/'+Number(id)+'?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es'
        const request = await axios.get(patch)
        response = { success:true, message:'Detalle de la pelicula', data: request.data};
        console.log(response)
        return response
    } catch (error){
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}
export const getMovies=  async (
    options = {
        requestType:'generic', 
        platform:null,
        genre:null,
        label:null,
        scroll:false, 
        setState:(e)=>console.log(e), 
        prevState:[],
        videoExist:null
    })=>
    {
    //firebase
    let response
    console.log(options)
    try {
        const{
            requestType, 
            platform,
            genre,
            label,
            scroll, 
            setState, 
            prevState,
            videoExist,
        }= options
        if(requestType!=='generic'&&requestType!=='where'&&requestType!=='whereArray'&&requestType!=='whereArrayWhere'){
            response = { success:false, message:'Error de requestTypes en getMovies' };
            console.log(response)
            return response
        }else if(requestType==='genres'&& !genre){
            response = { success:false, message:'Error de requestTypes en getMovies, faltan valores' };
            console.log(response)
            return response
        }else if(requestType==='platforms'&& !platform){
            response = { success:false, message:'Error de requestTypes en getMovies, faltan valores' };
            console.log(response)
            return response
        }else if(requestType==='genres'&& !genre){
            response = { success:false, message:'Error de requestTypes en getMovies, faltan valores' };
            console.log(response)
            return response
        }
        // }else if(requestType!=='generic'){
        //     response = { success:false, message:'Error de requestTypes en getMovies, faltan valores' };
        //     console.log(response)
        //     return response
        // }
        const selectedCollection = collection(db, `movies`);
        const video = (!videoExist?null:videoExist=='sin video'?"==":videoExist=='con video'?"!=":null)
        const requestTypes = !scroll&&video?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('firestore_url_video', video, ""),limit(24))),
            genres:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('genres', "array-contains", genre),where('firestore_url_video', video, ""),limit(24))),
            platforms:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('platform', "array-contains", platform),where('firestore_url_video', video, ""),limit(24))),
            labels:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('labels', "array-contains", label),where('firestore_url_video', video, ""),limit(24))),
            platformAndGenres: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('platform', "array-contains", platform),where('genres', "array-contains", genre),where('firestore_url_video', video, ""),limit(24))),
            platformAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('plarform', "array-contains", platform),where('labels', "array-contains", label),where('firestore_url_video', video, ""),limit(24))),
            genresAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('genres', "array-contains", genre),where('labels', "array-contains", label),where('firestore_url_video', video, ""),limit(24))),
        }:!scroll&&!video?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),limit(24))),
            genres:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('genres', "array-contains", genre),limit(24))),
            platforms:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('platform', "array-contains", platform),limit(24))),
            labels:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('labels', "array-contains", label),limit(24))),
            platformAndGenres: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('platform', "array-contains", platform),where('genres', "array-contains", genre),limit(24))),
            platformAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('plarform', "array-contains", platform),where('labels', "array-contains",label),limit(24))),
            genresAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('genres', "array-contains", genre),where('labels', "array-contains", label),limit(24))),
        }:scroll&&!video?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),startAfter(prevState[prevState.length-1].title),limit(12))),
            genres:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('genres', "array-contains", genre),startAfter(prevState[prevState.length-1].title),limit(21))),
            platforms:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('platform', "array-contains", platform),startAfter(prevState[prevState.length-1].title),limit(21))),
            labels:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('labels', "array-contains", label),startAfter(prevState[prevState.length-1].title),limit(21))),
            platformAndGenres: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('platform', "array-contains", platform),where('genres', "array-contains", genre),startAfter(prevState[prevState.length-1].title),limit(21))),
            platformAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('plarform', "array-contains", platform),where('labels', "array-contains", label),startAfter(prevState[prevState.length-1].title),limit(21))),
            genresAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('genres', "array-contains", genre),where('labels', "array-contains", label),startAfter(prevState[prevState.length-1].title),limit(21))),
        }:scroll&&video?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].title),limit(12))),
            genres:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('genres', "array-contains", genre),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].title),limit(21))),
            platforms:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('platform', "array-contains", platform),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].title),limit(21))),
            labels:async ()=> await getDocs(query(selectedCollection, orderBy("title",'asc'),where('labels', "array-contains", label),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].title),limit(21))),
            platformAndGenres: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('platform', "array-contains", platform),where('genres', "array-contains", genre),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].title),limit(21))),
            platformAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('plarform', "array-contains", platform),where('labels', "array-contains", label),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].title),limit(21))),
            genresAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("title",'asc'),where('genres', "array-contains", genre),where('labels', "array-contains", label),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].title),limit(21))),
        }:null
        const requestSnapshot = await requestTypes[requestType]()
        const requestData = requestSnapshot.docs.map((movie) => ({
          ...movie.data(),   
          id: movie.id,
        }));
        response = { success:true, message:'Peliculas obtenidas', data: [...prevState,...requestData]};
        setState([...prevState,...requestData])
        console.log(response)
        return ([...prevState,...requestData])
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
    }
}

export const postMovie=  async (data)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const {id} = data
        data = {...data , updated_date:Timestamp.now(), created_date:Timestamp.now()}
        const selectedDoc = doc(db, `movies/${id}`);
        const resolved = await setDoc(selectedDoc, data)
        response = { success:true, message:'Pelicula cargada a firebase', data: resolved};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const putProduct= async(data)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const {id} = data
        data = {...data , updated_date:Timestamp.now() }
        const selectedDoc = doc(db, `movies/${id}`);
        setDoc(selectedDoc, data)
        response = { success:true, message:'Pelicula actualizada', data: request.data};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}
export const DeleteMovie=  async (id)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedDoc = doc(db, `movies/${id}`);
        const resolved = await deleteDoc(selectedDoc)
        response = { success:true, message:'Pelicula eliminada de firebase', data: resolved};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}


