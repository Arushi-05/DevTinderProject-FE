import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from './utils/userSlice';
import { removeFeed } from './utils/feedSlice';
import { removeConnections } from './utils/connectionsSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoginPage, setIsLoginPage] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8000/login", {
                emailId, password
            },
                { withCredentials: true })
            console.log("Login API Response:", res.data)
          
            const userData = res.data.user || res.data.data || res.data
            console.log("User data being dispatched:", userData)
            // Clear old feed and connections before adding new user
            dispatch(removeFeed())
            dispatch(removeConnections())
            dispatch(addUser(userData))
            return navigate("/feed")
        }
        catch (err) {
            setError(err?.response?.data || "something went wrong")
            console.log(err)
            
        }
    }
    const handleSignup= async()=>{
        try{
            const res = await axios.post("http://localhost:8000/signup", {
                emailId, password, firstName, lastName
            },
                { withCredentials: true })
            console.log("Signup API Response:", res.data)
          
            const userData = res.data.user || res.data.data || res.data
            console.log("Signup data being dispatched:", userData)
       
            dispatch(removeFeed())
            dispatch(removeConnections())
            dispatch(addUser(userData))
            return navigate("/feed")

        }
        catch(err){
            setError(err?.response?.data || "something went wrong")
            console.log(err)
            
        }
    }

    return (
        <div className="flex justify-center my-30">
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">{isLoginPage ? "Please Login" : "Sign Up Here"}</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Email</legend>
                        <input type="text" onChange={(e) => { setEmailId(e.target.value) }} className="input" placeholder="example@gmail.com" value={emailId} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Password</legend>
                        <input type="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="input" placeholder="Type here" />
                    </fieldset>
                    {!isLoginPage && <><fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter First Name</legend>
                        <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Last Name</legend>
                        <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} className="input" placeholder="Type here" />
                    </fieldset></>}
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary flex flex-col items-center" onClick={isLoginPage ? handleLogin : handleSignup}>{isLoginPage ? "Login" : "Sign Up"}</button>
                        <p className="card-question mt-3 cursor-pointer text-center" onClick={()=>setIsLoginPage((val)=> !val)}>{!isLoginPage ? "Existing user? Please login here" : "New user? Sign Up Here"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login