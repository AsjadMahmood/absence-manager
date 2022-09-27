type PropType = {
    name:string
}

export function Heading(props:PropType){
    return(
        <div className='mb-4'>
          <h1>
            {props.name}
          </h1>
        </div>
        
    )
}