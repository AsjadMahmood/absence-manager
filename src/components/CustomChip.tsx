import Chip from '@mui/material/Chip';
import './Chip.css';

type PropType = {
    label: string,
    isFilled: boolean,
    hasDelete: boolean,
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void
    handleDelete: () => void
}

export function CustomChip(props: PropType) {

    return (
        <div>
            <Chip
                label={props.label}
                variant={props.isFilled ? 'filled' : 'outlined'}
                onClick={(e) => props.handleClick(e)}
                onDelete={props.hasDelete ? () => { props.handleDelete() } : undefined}
            />
        </div>

    )
}