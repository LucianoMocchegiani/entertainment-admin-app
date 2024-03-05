import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';

import './SelectCategory.css'

const Touchable = (text='Select a option',onPress)=>{
    const TouchableComponent = ()=>{
      return (
        <button 
          onClick={onPress}
          className='selectTouch-Select'>
          <p className='selectTextOne-Select'>{text}</p>
          <Icon path={mdiChevronRight} size={1} color={"black"}/>
        </button>
      )
    }
    return {TouchableComponent}
  }
  const Option =(item, value ,selected,onPress) =>{
    const OptionComponent =()=>{
      return (
        <button className={'selectContainer-Select'} onClick={()=>onPress()}>
          <p className={'selectText-Select'}>{item?item[value]:null}</p>
        </button>
      )
    }
    return {OptionComponent}
  }
function Select (
    { 
      touchableComponent = Touchable,
      optionComponent=Option,
      touchableText = 'Select a option',  
      title ="",
      data=[],
      objKey ='id',
      objValue="identifier",
      selectFunction
    }
  ){
    const [visible,setVisible] = useState(false)
    const {TouchableComponent}=touchableComponent(touchableText,()=> setVisible(true));
    const [selected,setSelected] = useState(null)
    function renderOption(item){
        const {OptionComponent}=optionComponent(item,objValue,selected, ()=>toggleSelect(item))
        return <OptionComponent key={item.id}/>
    }
    function toggleSelect(item){
        if(item?.[objKey] === selected?.[objKey]){
            setSelected(item?.[objKey])
            selectFunction(item)
        }else{
            
            selectFunction(item)
            setVisible(false)
        }
    }
    return(
      <>
       <TouchableComponent/>  
       {visible&&<div className="modal-Select">
       <div className="container1-Select">
           <div className='container-Select'>
             <button onClick={()=> setVisible(false)} className='buttonBack-Select'>
             <Icon path={mdiArrowLeft} size={1.5} />
             </button>
            <p className='titleCategorias-Select'>{title}</p>
           </div>
           <div className='container-items-Select'>
            {data.map(item=>renderOption(item))}
           </div>
       </div>
       </div>}
      </>
    )
}


export default function ModalSelect({text='Seleccionar',text2='', objValue, arraySelects,selectFunction}){

    return(
        <>
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg dark:bg-stone-700 mr-4 p-4 mt-3">
        <div className='containerButtonActive-Select'>
          <p className='title-Select'>{text}</p>
          <Select touchableText = {text2}
            title="Selecciona una opcion" 
            objKey='id' 
            objValue= {objValue?objValue:'name'}
            data={arraySelects} 
            selectFunction={selectFunction}/>
        </div>
        </div>
      </>
    )
}



 /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

 
 
 