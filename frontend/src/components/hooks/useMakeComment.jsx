import { MAKECOMMENT } from "../graphql/mutations"
import { useMutation } from "@apollo/client"

const useMakeComment = () => {
    const [mutate,result] = useMutation(MAKECOMMENT)
    const comment = async ({postid,replyto,content}) => {
        if (replyto){
            console.log(postid,replyto,content)
        const data = await mutate({variables:{postid:postid,replyto:replyto,content:content}})
        return data
        }else{
            console.log(postid,content)
            const data = await mutate({variables:{postid:postid,replyto:null,content:content}})
        return data
        }
    }
    return [comment,result]
}
export default useMakeComment