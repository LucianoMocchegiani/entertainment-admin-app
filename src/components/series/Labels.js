import SelectCategory from './SelectCategory'

export default function Labels({setLabel, label}){

    return (
        <> 
          <SelectCategory
                text={'Etiqueta'}
                text2={label?.name}
                arraySelects={[
                    {id:"Disney +",name:"Disney +"},
                    {id:"Star +",name:"Star +"},
                    {id:"Netflix",name:"Netflix"},
                    {id:"Amazon Prime", name:"Amazon Prime"},
                    {id:"Hbo Max",name:"Hbo Max"},
                    {id:'Ninguna',name:'Ninguna'}
                ]}
                selectFunction={setLabel}
            />
            <div className="flex flex-row mt-2" >
                {label?.name === 'Disney +'?<img className='h-16 rounded-lg' src={'https://logowik.com/content/uploads/images/disney5456.jpg'}/>
                :label?.name === 'Hbo Max'?<img className='h-16 rounded-lg' src={'https://play-lh.googleusercontent.com/1iyX7VdQ7MlM7iotI9XDtTwgiVmqFGzqwz10L67XVoyiTmJVoHX87QtqvcXgUnb0AC8'}/>
                :label?.name === 'Netflix'?<img className='h-16 rounded-lg' src={'https://w7.pngwing.com/pngs/153/31/png-transparent-netflix-macos-bigsur-icon-thumbnail.png'}/>
                :label?.name === 'Amazon Prime'?<img className='h-16 rounded-lg' src={'https://w7.pngwing.com/pngs/777/419/png-transparent-amazon-com-amazon-video-streaming-media-amazon-prime-television-prime-logo-television-blue-text-thumbnail.png'}/>
                :label?.name === 'Star +'?<img className='h-16 rounded-lg' src={'https://logowik.com/content/uploads/images/star2099.jpg'}/>:null}
            </div> 
        </>
    )
}

