import { FormGroup,TextField ,Button} from "@mui/material"
import { useState } from "react"

const NewComment = ({onReply,commentid,handleReplyClick}) => {
    const [comment, setComment] = useState("")
    return(
        <FormGroup sx={{}}>
            <TextField 
            required
            value={comment}
            sx={{color: "white",}}
            multiline
            label="Comment" variant="standard" 
            onChange={(event) => setComment(event.target.value)}
            />
        <Button onClick={() => {onReply({content:comment,commentid})}}  >reply</Button>
        <Button size='small' onClick={handleReplyClick}>
          cancel
        </Button>
        </FormGroup>
    )
}
export default NewComment