import { Box, IconButton, Tooltip } from "@mui/material"
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

const KarmaItem = ({handleDislike,handleLike,karma}) => {
    return(

    <Box className={"footerkarma"} >
        <Tooltip title="Like">
        <IconButton className={'button'} onClick={handleLike} size="small">
            <ArrowUpwardRoundedIcon style={{color:"green"}}></ArrowUpwardRoundedIcon>
        </IconButton>
        </Tooltip>
        <Box>
        <a style={{paddingTop:0,textAlignVertical:"top"}}>{karma}</a>
    </Box>
    <Tooltip title="Dislike">
    <IconButton className={'button'} onClick={handleDislike} size="small">
    <ArrowDownwardRoundedIcon style={{color:"red"}}></ArrowDownwardRoundedIcon>
    </IconButton>
    </Tooltip>              
    </Box>
    )
}
export default KarmaItem