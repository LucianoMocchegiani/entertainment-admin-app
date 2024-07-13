import { doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db, storage } from '../firebase';
import axios from 'axios'
import algoliasearch from 'algoliasearch/lite'

export const searchSeries=  async (search)=>{
    //api
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof search !== 'string'){
            response = { success:false, message:'Search is not string or is undefine' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/search/tv?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es&query='+search
        const request = await axios.get(patch)
        response = { success:true, message:'Series encontradas', data: request.data.results};
            
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
        const patch = 'https://api.themoviedb.org/3/tv/airing_today?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es&page='+page
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

export const searchSeriesAlgolia = async (search) =>{
    let response
    try {
        const APPLICATION_ID = 'K7DJSQSIE8'
        const SEARCH_API_KEY = '8233808a4024df9610f4720a1a15c41d'
        const ALGOLIA_INDEX = 'entertainment-app-serie'
        const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY)
        const index = client.initIndex(ALGOLIA_INDEX)
        const {hits} = await index.search(search, {
            hitsPerPage: 5
        })
        response = { success:true, message: 'Series obtenidas', data:hits};
        console.log(response)
        return response
    } catch(error) {
        response = { success:false, message: error.message };
        console.log(response)
        return response
    }
}

export const getSerieDetail=  async (id)=>{
    //api
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof Number(id) !== 'number'){
            response = { success:false, message:'Id value is not valid' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/tv/'+Number(id)+'?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es'
        const request = await axios.get(patch)
        response = { success:true, message:'Detalle de la serie', data: request.data};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}
export const getSerieDetailFirebase=  async (id)=>{
    //Firebase
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof Number(id) !== 'number'){
            response = { success:false, message:'Id value is not valid' };
            console.log(response);
            return response;
        }
        const selectedDoc = doc(db, 'series/'+id)
        const requestSnapshot = await getDoc(selectedDoc)
        if (requestSnapshot.exists()){
            const serieData = { ...requestSnapshot.data(), id: requestSnapshot.id };
            response = { success:true, message:'Detalle de la serie', data: serieData};
        }else{
            response = { success:false, message:'No existe la serie en la base de datos', data:null};
        }
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}
export const getSeriesLite=  async (
    options = {
        requestType:'generic', 
        value:null,
        value2:null,
        scroll:false, 
        setState:(e)=>console.log(e), 
        prevState:[],
    })=>
    {
    //firebase
    let response
    try {
        const{
            requestType, 
            value,
            value2,
            scroll, 
            setState, 
            prevState,
        }= options
        if(requestType!=='generic'&&requestType!=='where'&&requestType!=='whereArray'&&requestType!=='whereArrayWhere'){
            response = { success:false, message:'Error de requestTypes en getSeries' };
            console.log(response)
            return response
        }else if(requestType==='whereArrayWhere'&& (!value ||!value2)){
            response = { success:false, message:'Error de requestTypes en getSeries, faltan valores' };
            console.log(response)
            return response
        }else if(requestType!=='generic'){
            response = { success:false, message:'Error de requestTypes en getSeries, faltan valores' };
            console.log(response)
            return response
        }
        const selectedCollection = collection(db, `series_faces`);
        const requestTypes = !scroll?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(24))),
            where:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('category_id','==',value))),
            whereArray:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('discount_codes', "array-contains", value))),
            whereArrayWhere: async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('category_id','==',value),where('discount_codes', "array-contains", value2)))
        }:{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),startAfter(prevState[prevState.length-1].name),limit(12))),
            where:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('category_id','==',value),startAfter(prevState[prevState.length-1].name),limit(12))),
            whereArray:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('discount_codes', "array-contains", value),startAfter(prevState[prevState.length-1].name),limit(12))),
            whereArrayWhere: async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('category_id','==',value),where('discount_codes', "array-contains", value2),startAfter(prevState[prevState.length-1].name),limit(12)))
        }
        const requestSnapshot = await requestTypes[requestType]()
        const requestData = requestSnapshot.docs.map((serie) => ({
          ...serie.data(),   
          id:serie.id,
        }));
        response = { success:true, message:'Series obtenidas', data: [...prevState,...requestData]};
        setState([...prevState,...requestData])
        console.log(response)
        return ([...prevState,...requestData])
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
    }
}
export const getSeries=  async (
    options = {
        requestType:'generic', 
        value:null,
        value2:null,
        scroll:false, 
        setState:(e)=>console.log(e), 
        prevState:[],
    })=>
    {
    //firebase
    let response
    try {
        const{
            requestType, 
            value,
            value2,
            scroll, 
            setState, 
            prevState,
        }= options
        if(requestType!=='generic'&&requestType!=='where'&&requestType!=='whereArray'&&requestType!=='whereArrayWhere'){
            response = { success:false, message:'Error de requestTypes en getSeries' };
            console.log(response)
            return response
        }else if(requestType==='whereArrayWhere'&& (!value ||!value2)){
            response = { success:false, message:'Error de requestTypes en getSeries, faltan valores' };
            console.log(response)
            return response
        }else if(requestType!=='generic'){
            response = { success:false, message:'Error de requestTypes en getSeries, faltan valores' };
            console.log(response)
            return response
        }
        const selectedCollection = collection(db, `series`);
        const requestTypes = !scroll?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(24))),
            where:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('category_id','==',value))),
            whereArray:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('discount_codes', "array-contains", value))),
            whereArrayWhere: async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('category_id','==',value),where('discount_codes', "array-contains", value2)))
        }:{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),startAfter(prevState[prevState.length-1].name),limit(12))),
            where:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('category_id','==',value),startAfter(prevState[prevState.length-1].name),limit(12))),
            whereArray:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('discount_codes', "array-contains", value),startAfter(prevState[prevState.length-1].name),limit(12))),
            whereArrayWhere: async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('category_id','==',value),where('discount_codes', "array-contains", value2),startAfter(prevState[prevState.length-1].name),limit(12)))
        }
        const requestSnapshot = await requestTypes[requestType]()
        const requestData = requestSnapshot.docs.map((serie) => ({
          ...serie.data(),   
          id:serie.id,
        }));
        response = { success:true, message:'Series obtenidas', data: [...prevState,...requestData]};
        setState([...prevState,...requestData])
        console.log(response)
        return ([...prevState,...requestData])
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
    }
}

export const postSerie=  async (data)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const {id, poster_path, name, label, platform, genres, status, first_air_date} = data
        data = {...data , updated_date:Timestamp.now(), created_date:Timestamp.now()}
        const dataLite = {
            id: id ,
            poster_path: poster_path,
            name: name,
            label: label, 
            platform: platform,
            genres: genres,
            status: status,
            first_air_date: first_air_date
        }
        const selectedDoc = doc(db, `series/${id}`);
        const selectedDocLite = doc(db, `series_faces/${id}`);
        const resolved = await setDoc(selectedDoc, data)
        const resolvedLite = await setDoc(selectedDocLite, dataLite)
        response = { success:true, message:'Serie cargada a firebase', data: resolved, dataLite: resolvedLite};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const DeleteSerie=  async (id)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedDoc = doc(db, `series/${id}`);
        const selectedDocLite = doc(db, `series_faces/${id}`);
        const resolved = await deleteDoc(selectedDoc)
        const resolvedLite = await deleteDoc(selectedDocLite)
        response = { success:true, message:'Serie eliminada de firebase', data: resolved, dataLite: resolvedLite };
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

