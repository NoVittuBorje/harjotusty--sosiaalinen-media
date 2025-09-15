import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';



const useLogin = () => {
    const [mutate, result] = useMutation(LOGIN);
    const login = async ({ Username, Password }) => {
      const data = await mutate({variables:{password:Password,username:Username}})
      if (data){
      console.log(data.data.login.value)
      await sessionStorage.setItem("token", data.data.login.value)
      }
      return data
    };
    
    return [login, result];
  };
export default useLogin;