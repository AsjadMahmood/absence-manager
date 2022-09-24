import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type PropType = {
    align:string
} 

export default function Loading(props:PropType) {
  return (
    <Box sx={{ display: 'flex',justifyContent: props.align}}>
      <CircularProgress />
    </Box>
  );
}