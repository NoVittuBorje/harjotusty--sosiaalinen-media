import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';


const useLogin = () => {
    const [mutate, result] = useMutation(LOGIN);
    const login = async ({ Username, Password }) => {
      const data = await mutate({variables:{password:Password,username:Username}})
      return data
    };
    
    return [login, result];
  };
export default useLogin