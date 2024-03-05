import SelectCategory from './SelectCategory'

export default function Platforms({setPlatform, platform}){

    return (
        <> 
          <SelectCategory
                text={'Plataforma'}
                text2={platform?.name}
                arraySelects={[
                    {id:"Disney +",name:"Disney +"},
                    {id:"Star +",name:"Star +"},
                    {id:"Netflix",name:"Netflix"},
                    {id:"Amazon Prime", name:"Amazon Prime"},
                    {id:"Hbo Max",name:"Hbo Max"},
                    {id:'Ninguna',name:'Ninguna'}
                ]}
                selectFunction={setPlatform}
            />
            <div className="flex flex-row mt-2" >
                {platform?.name === 'Disney +'?<img className='h-16 rounded-lg' src={'https://logowik.com/content/uploads/images/disney5456.jpg'}/>
                :platform?.name === 'Hbo Max'?<img className='h-16 rounded-lg' src={'https://play-lh.googleusercontent.com/1iyX7VdQ7MlM7iotI9XDtTwgiVmqFGzqwz10L67XVoyiTmJVoHX87QtqvcXgUnb0AC8'}/>
                :platform?.name === 'Netflix'?<img className='h-16 rounded-lg' src={'https://w7.pngwing.com/pngs/153/31/png-transparent-netflix-macos-bigsur-icon-thumbnail.png'}/>
                :platform?.name === 'Amazon Prime'?<img className='h-16 rounded-lg' src={'https://w7.pngwing.com/pngs/777/419/png-transparent-amazon-com-amazon-video-streaming-media-amazon-prime-television-prime-logo-television-blue-text-thumbnail.png'}/>
                :platform?.name === 'Star +'?<img className='h-16 rounded-lg' src={'https://logowik.com/content/uploads/images/star2099.jpg'}/>:null}
            </div> 
        </>
    )
}

