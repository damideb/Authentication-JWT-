import axios from "../api/axios";
import useAuth from "./useAuth";
export default function useRefreshToken() {

    const {setAuth}= useAuth()

    const refresh = async()=>{ // retrys the request to get new access token when the current one exprires
        const response = await axios.get('/refresh', {
            withCredentials:true //allows us send cookies with our requests
        });

        setAuth(prev=>{
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken)

            return {
                ...prev, accessToken: response.data.accessToken
            }
        })
        return response.data.accessToken
    }
  return refresh
}
