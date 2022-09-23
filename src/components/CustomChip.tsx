import Chip from '@mui/material/Chip';
import './Chip.css';

type PropType = {
    label: string,
    filled: boolean,
    hasDelete: boolean,
    handleClick: (e:React.MouseEvent<HTMLDivElement>)=>void
}

export function CustomChip(props: PropType) {

    const handleDelete = ()=>{

    }


    return (
        <div>
        <Chip
            label={props.label}
            variant={props.filled ?  'filled': 'outlined'}
            onClick={(e)=>props.handleClick(e)}
            onDelete={props.hasDelete ? handleDelete : undefined}
        />
        </div>

    )
}