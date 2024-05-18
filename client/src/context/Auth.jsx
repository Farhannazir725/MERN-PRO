import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = React.createContext(){
//     Isko is tarah se bhi likh skte jisme hame ise import krne ki need nahi hoti
// }
export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [token, setToken]= useState(localStorage.getItem("token"));
    const[user,setUser]=useState('');
    const[isLoading,setIsLoading]= useState(true);
    const[service,setService]=useState([]);
    const authorizationToken = `Bearer ${token}`;

    const API = import.meta.env.VITE_API_URL;
   
    const stroreTokenInLs = (serverToken)=>{
        setToken(serverToken);
      return  localStorage.setItem('token', serverToken);
    }


     let isLoggedIn = !! token;
    // logout componet logout Function
    const logoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    };

            // Authentciation to get the currentyl logededin data

        const userAuthentication = async()=>{
            try {
                setIsLoading(true);
                const response = await fetch(`${API}/api/auth/user`,{
                    method:"GET",
                    headers:{
                        Authorization: authorizationToken,
                    },
                });
                if(response.ok){
                    const data = await response.json();
                    console.log('Data from user',data.userData)
                    setUser(data.userData)
                    setIsLoading(false);
                }else{
                    console.error("Erro fetching user data");
                    setIsLoading(false);
                }
            } catch (error) {
                console.log('Error Fetching User data')
            }
        }

        // to fetch the data from the database
        const getServices = async ()=>{
        try {
            const response = await fetch(`${API}/api/data/service`,{
                method:"GET",
            }) ;
            if(response.ok){
                const data = await response.json();
                console.log(data.msg)
                setService(data.msg)
                
            }
        } catch (error) {
            console.log(`Service Front End Error: ${error}`);
        }
        }

        useEffect(()=>{
            getServices();
            userAuthentication();
        }, [] );





    return <AuthContext.Provider value={{isLoggedIn , stroreTokenInLs ,  logoutUser ,  user , service , authorizationToken,isLoading, API }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>{
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider");
    }
    return  authContextValue;
}
