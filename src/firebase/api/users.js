import { doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db } from '../firebase';

export const getUsers=  async (
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
            response = { success:false, message:'Error de requestTypes en getMovies' };
            console.log(response)
            return response
        }else if(requestType==='whereArrayWhere'&& (!value ||!value2)){
            response = { success:false, message:'Error de requestTypes en getMovies, faltan valores' };
            console.log(response)
            return response
        }else if(requestType!=='generic'){
            response = { success:false, message:'Error de requestTypes en getMovies, faltan valores' };
            console.log(response)
            return response
        }
        const selectedCollection = collection(db, `users`);
        const requestTypes = !scroll?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21))),
            where:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('category_id','==',value))),
            whereArray:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('discount_codes', "array-contains", value))),
            whereArrayWhere: async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('category_id','==',value),where('discount_codes', "array-contains", value2)))
        }:{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),startAfter(prevState[prevState.length-1].title),limit(12))),
            where:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('category_id','==',value),startAfter(prevState[prevState.length-1].title),limit(12))),
            whereArray:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('discount_codes', "array-contains", value),startAfter(prevState[prevState.length-1].title),limit(12))),
            whereArrayWhere: async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('category_id','==',value),where('discount_codes', "array-contains", value2),startAfter(prevState[prevState.length-1].title),limit(12)))
        }
        const requestSnapshot = await requestTypes[requestType]()
        const requestData = requestSnapshot.docs.map((user) => ({
          ...user.data(),   
          id: user.id,
        }));
        response = { success:true, message:'Usuarios obtenidos', data: requestData};
        setState([...prevState,...requestData])
        console.log(response)
        return ([...prevState,...requestData])
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
    }
}

export const searchUsers=  async (value)=>
    {
    //firebase
    let response
    try {
        const selectedCollection = collection(db, `user`);
        const search = await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(21),where('name','==',value)))
        let requestData = search.docs.map((user) => ({
          ...user.data(),   
          id: user.id,
        }));
        if(!requestData.length){
            const searchTwo = await getDocs(query(selectedCollection, orderBy("email",'asc'),limit(21),where('email','==',value)))
            requestData = searchTwo.docs.map((user) => ({
                ...user.data(),   
                id: user.id,
            }));
        }else if(!requestData.length){
            const searchThree = await getDocs(query(selectedCollection, orderBy("id",'asc'),limit(21),where('id','==',value)))
            requestData = searchThree.docs.map((user) => ({
                ...user.data(),   
                id: user.id,
            }));
        }
        response = { success:true, message:'Usuarios obtenidas', data: requestData};
        setState([...requestData])
        console.log(response)
        return ([...requestData])
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
    }
}

export const postUser=  async (data)=>{
    //firebase
    let response = { success:false, message:'Reintente nuevamente en unos momentos' };
    data = {...data , updated_date:Timestamp.now(), created_date:Timestamp.now()}
    const selectedDoc = doc(db, `users/`+data.email);
    const resolved = await setDoc(selectedDoc, data)
    response = { success:true, message:'Usuario cargado a firebase', data: resolved};
    console.log(response)
    return response
}
export const getUserDetail=  async (id)=>{
    try {
        console.log(id)
        id = id.replace("%40",'@')
        console.log(id)
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedDoc = doc(db, 'users/'+id)
        const requestSnapshot = await getDoc(selectedDoc)
        console.log(requestSnapshot)
        if (requestSnapshot.exists()){
            const salesData = { ...requestSnapshot.data(), id: requestSnapshot.id };
            response = { success:true, message:'Detalle del usuario', data: salesData};
        }else{
            response = { success:true, message:'No existe usuario', data:null};
        }
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}