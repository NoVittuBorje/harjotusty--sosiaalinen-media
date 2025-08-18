import { useMutation } from "@apollo/client";
import { SINGLEIMAGEUPLOAD } from "../graphql/mutations";
const useUploadImage = () => {
    const [mutate, result] = useMutation(SINGLEIMAGEUPLOAD)
    const upload = async (variables) => {
        console.log(variables)
        const data = await mutate({
            variables:{input:{userId:variables.userId,file:variables.file[0]}}
        })
        return data
    }
    return [upload,result]
}
export default useUploadImage