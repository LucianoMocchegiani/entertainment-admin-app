import swal from "sweetalert";
import './alert.css';

export  function alertConfirmation(question, text, functionAlert){  
    swal({
        title: question,
        text: text,
        icon: "warning",
        buttons: ["No","Yes"],
    })
    .then(async res =>{
        if(res){
            if(functionAlert){
                const response = await functionAlert()
                if(!response.success){
                    swal({
                        text: response.message,
                        icon: 'error',
                        timer: "4000",
                    })
                }else if(response.success){
                    swal({
                        text: response.message,
                        icon: "success",
                        timer: "4000",
                    })
                }else{
                    swal({
                        text: 'Accion Invalida',
                        icon: 'error',
                        timer: "4000",
                    })
                }
            }else{
                swal({
                    text: 'Accion Invalida',
                    icon: 'error',
                    timer: "4000",
                })
            }
        }
    })
}
export  function alertInformation(title,text,title2,text2){
    swal({
        title:title,
        text:text,
        icon:"info",
        buttons:["Ok","Next"],
    })
    .then(res=>{
        if(res){
            swal({
                icon:"info",
                title:title2,
                text:text2,
            })          
        }
    })
}
export  function alertBasic(title,text){
    swal({
        title:title,
        text:text,
        icon:'error',
        buttons:["Cancel","Ok"],
        timer: "4000",
    })
    .then(res=>{
       return
    })
}
export  function  alertForm(title, text, checkOk, placeholder="Write the name of your company"){
    swal({
        title:title,
        text:text,
        icon:"warning",
        content: {
            element: "input",
            attributes: {
              placeholder: placeholder,
            },
        },
        buttons:["Cancel","Ok"],
        
    })
    .then(async(res) => {
        if(res){
            const valueRes = await checkOk(res)
            if(valueRes.value || valueRes.success){
                swal({
                    icon:"success",
                }) 
            }else{
                swal({
                    title:valueRes.error,
                    icon:"error",
                })  
            }        
        }else if(res===null){
        }
        else{
            swal({
                title:'Completa el campo',
                icon:"error",
            })  
        }
    })
}