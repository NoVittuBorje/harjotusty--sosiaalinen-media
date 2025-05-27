import { FormGroup,TextField ,Button} from "@mui/material"
import { useState } from "react"

const NewComment = ({onReply,commentid}) => {
    const [comment, setComment] = useState("")
    return(
        <FormGroup sx={{}}>
                        <TextField 
                        required
                        value={comment}
                        multiline
                        rows={3}
                        label="Comment" variant="outlined" 
                        onChange={(event) => setComment(event.target.value)}
                        />
                    <Button onClick={() => {onReply({content:comment,commentid})}} sx={{alignSelf:"left"}} variant="contained">reply</Button>
                    </FormGroup>
    )
}
export default NewComment