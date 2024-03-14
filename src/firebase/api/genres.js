export const getGenres=  async ()=>{
    //firebase
    let response
    try {
        const selectedCollection = collection(db, `genres`);
        const  requestSnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc')))
        const requestData = requestSnapshot.docs.map((genre) => ({
          ...genre.data(),   
          id: genre.id,
        }));
        response = { success:true, message:'Generos obtenidas', data: [...requestData]};
        setState([...requestData])
        console.log(response)
        return ([...requestData])
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
    }
}
