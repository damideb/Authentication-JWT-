import { useState, useEffect } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export default function User() {
    const [users, setUsers] = useState()

    const axiosPrivate = useAxiosPrivate()
    

    useEffect(()=>{
        let isMounted = true
        const controller = new AbortController() //  this cancels request
        
        const getUsers = async ()=>{
            try{
                const response = await axiosPrivate.get('/users', {
                    signal:controller.signal
                })
                console.log(response.data)
                isMounted && setUsers(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
   getUsers();

   return ()=>{
    isMounted = false
    controller.abort() // cancels any pending requests when the component unmounts
   }
    }, [])
  return (
  
        <article>
            <h2>Users List</h2>
            {
                users?.length? (
                    <ul>
                        {
                            users.map((user, i)=> ( <li key={i}>{user?.username}</li>) )
                           
                        }
                    </ul>
                )  : <p>No users to display</p>
            }
        </article>
    
  );
}
