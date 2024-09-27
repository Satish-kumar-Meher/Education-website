
// this is for provide JWT token to each needed page 
// we use contextAPI here 
// for send different different value in props to every component


import { createContext, useContext, useEffect, useState } from "react";




export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState("")
    const [services, setServices] = useState("") 
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token",serverToken)
    }

const isLoggedIn = !!token


// tackle Logout function

  const LogoutUser = () => {
    setToken("")
    return localStorage.removeItem("token")
  }


//JWT AUTHENTICATION - to get the currently loggedin userdata
const userAuthentication = async () => {

    try{
const response = await  fetch("http://localhost:1000/api/auth/user",{
    method:"GET",
    headers : {
        Authorization:`Bearer ${token}`
    }
})
if(response.ok){
    const data = await response.json()
    console.log(data.userData)
    setUser(data.userData)
}

    }catch(error){
        console.log("Error fetching user data")
    }
}


// TO FETCH SERVICES DATA FROM DB

const getServices = async () => {
    try{
        const response = await fetch("http://localhost:1000/api/data/service",{
            method : "GET",
        })
        if(response.ok){
            const services = await response.json()
            console.log(services.data)
            setServices(services.data)
        }
    }catch(error){
        console.log(`services frontend error : ${error}`)
    }

}
        


useEffect(() => {
    getServices()
    userAuthentication()
},[])



return ( 
<AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,services}}>
    {children}
</AuthContext.Provider>
)
}


// useAuth is the custom hooks function
// the function contains the value provided by the AuthContext.Provider higher up in the component tree.
export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider")
    }
    return authContextValue
}