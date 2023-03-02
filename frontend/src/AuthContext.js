import React,{ createContext,useState } from "react";
import jwt_decode from "jwt-decode"

export const AuthContext = createContext()



export default function AuthProvider({children}){

   
    let [user,setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
   
    let [admin,setAdmin]=useState(()=>localStorage.getItem('authTokensAd') ? jwt_decode(localStorage.getItem('authTokensAd')) : null)
    let [authTokensAd,setAuthTokensAd] = useState(()=>localStorage.getItem('authTokensAd') ? JSON.parse(localStorage.getItem('authTokensAd')) : null)
   
     console.log("provider",authTokens)
     
    // let contextData = {
      
    //   user:user,
    //   setUser:setUser,
    //   logoutUser: logoutUser

      
    // }

    return(
        <AuthContext.Provider value={{user,setUser,authTokens,setAuthTokens,admin,setAdmin,authTokensAd,setAuthTokensAd}}>
           {children}
        </AuthContext.Provider>
    )
}