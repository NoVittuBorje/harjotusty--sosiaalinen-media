import { FormGroup,TextField ,Button} from "@mui/material"
import { useState } from "react"

const NewComment = () => {
    const [comment, setComment] = useState("")
    return(
        <FormGroup sx={{alignItems:"center",verticalAlign:"center",marginTop:5,}}>
                        <TextField 
                        required
                        sx={{ m: 0.5, width: "30%" }}
                        value={comment}
                        label="Comment" variant="outlined" 
                        onChange={(event) => setComment(event.target.value)}
                        />
                    <Button sx={{alignSelf:"left"}} variant="contained">Make feed</Button>
                    </FormGroup>
    )
}
export default NewComment