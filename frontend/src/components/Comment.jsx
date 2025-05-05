import { Box, Paper ,Avatar} from "@mui/material"

const Comment = ({comment,commentpadding,user,likes,img}) => {
    const styles = {
        profileImage: {
            objectFit: "cover",
            display: "block",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid white",
             
          }
    }
    return(
        <Box sx={{marginLeft:commentpadding,border:"solid",borderWidth:1,borderColor:"grey",borderRadius:1,padding:1,display:"flex",flexDirection:"row"}}>
            <Box>
                <Avatar alt={user} src={img}/>
            </Box>
            
            <Box sx={{padding:1}}>
            <p style={{marginBottom:0,marginTop:0}}>{user}</p>
            <p style={{marginBottom:0,marginTop:0}}>{comment}</p>
            <p style={{marginBottom:0,marginTop:0}}>Likes :{likes}</p>
            </Box>
        </Box>
    )
}
export default Comment