import {
    ListItem, IconButton, Button, ListItemIcon, 
    ListItemText, List, Box
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { TypographyTitle } from "../../../../Utils/CustomStyles";
import DescriptionIcon from '@mui/icons-material/Description';



const DocumentsList = (props) => {
    const { documentos, title } = props;
    return (
        <>
            {documentos?.length !== 0 ?
                <Box sx={{ mb: 2 }}>
                    <TypographyTitle> {title }</TypographyTitle>
                    <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} dense>
                        {documentos?.map((doc) => {
                            return (
                                <ListItem key={doc.id} disablePadding>
                                 
                                    <ListItem component={Button} sx={{ color: 'black' }} > 
                                        <ListItemIcon>
                                            <DescriptionIcon sx={{ mx: 1, color: '#17285e' }} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {doc.nombre}
                                        </ListItemText>
                                    </ListItem>
                                    <IconButton aria-label="download" sx={{ ml: 1 }}>
                                        <DownloadIcon sx={{ color: '#17285e' }} />
                                    </IconButton>
                                </ListItem>

                            )
                        })

                        }
                    </List>
                </Box>
                :
                <></>

            }

            


        </>

    )





}; export default DocumentsList;