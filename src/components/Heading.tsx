type PropType = {
    name:string
}

export function Heading(props:PropType){
    return(
        <div className='mb-5'>
          <h1>
            {props.name}
          </h1>
        </div>
        
    )
}