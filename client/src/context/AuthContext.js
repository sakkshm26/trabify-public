import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = (props) => {
    
    const [authTokens, setAuthTokens] = useState(localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)
    const [user, setUser] = useState(localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null)
    const [loading, setLoading] = useState(true)

    const history = useNavigate()

    const loginUser = async(e) => {
        e.preventDefault()
        const response = await fetch('https://trabify.herokuapp.com/token/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        const data = await response.json()
        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            localStorage.setItem('email',JSON.stringify({'email':e.target.email.value}))
            history('/')
        }else{
            alert("Something went wrong!")
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('email')
    }

    const updateToken = async() => {
        const response = await fetch('https://trabify.herokuapp.com/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'refresh':authTokens?.refresh})
        })
        const data = await response.json()

        if (response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    const contextData = {
        user:user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        authTokens: authTokens
    }

    useEffect(() => {

        if(loading){
            updateToken()
        }
        
        const fourMinutes = 1000*60*4
        const interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : props.children}
        </AuthContext.Provider>
    )
}