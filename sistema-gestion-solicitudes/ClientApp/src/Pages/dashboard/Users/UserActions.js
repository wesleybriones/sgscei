import { Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UsersActions = ({ params }) => {


    return (
        <Box
            sx={{
                m: 1,
                position: 'relative',
            }}
        >
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            
        </Box>
    );
};

export default UsersActions;
