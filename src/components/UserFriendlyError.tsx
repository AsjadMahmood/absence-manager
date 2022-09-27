import Box from '@mui/material/Box';
import { UserMessageType } from '../models/absent-manager.model';
import NotFound from '../assets/no_data_found.png';
import SomethingWentWrong from '../assets/something_went_wrong.png';

type PropType = {
    type: UserMessageType
}

export default function UserFriendlyError(props: PropType) {

    const displayMessage = () => {
        if (props.type === UserMessageType.NoDataFound) {
            return (<img width={550} src={NotFound} alt="no data found" />)
        }
        else if (props.type === UserMessageType.SomethingWentWrong) {
            return (<img src={SomethingWentWrong} alt="something went wrong" />)
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {
                displayMessage()
            }
        </Box>
    );
}