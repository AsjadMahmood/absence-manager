import moment from 'moment';

type PropType = {
    date:string,
    format: string
}

export function DateFormatter(props:PropType){
    return(
        <span>
            {moment(props.date).format(props.format)}
        </span>
        
    )
}