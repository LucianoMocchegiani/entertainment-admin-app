import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebase';

export class UploadFile {
  constructor( file, id, patch ){
    this.file = file
    this.id = id
    this.path = patch
    this.storageRef = ref(storage, patch + id);
    this.metadata = {
      contentType: file.type
    };
    this.uploadTask = uploadBytesResumable(this.storageRef,this.file,this.metadata);
    this.status = null
    this.progress = 0 
  }
  on(){
    this.uploadTask.on('state_changed',
    (snapshot) => {
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log({status:this.status, progress:this.progress})
      switch (snapshot.state) {
        case 'paused':
          this.status='paused'
          console.log('Upload is paused');
          break;
        case 'running':
          this.status='running'
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    }, 
    )
  }
  paused (){
    this.uploadTask.pause()
  }
  resume(){
    this.uploadTask.resume()
  }
  cancel(){
    this.uploadTask.cancel()
  }
}


