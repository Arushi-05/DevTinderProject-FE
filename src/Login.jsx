import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [emailId, setEmailId] = useState("arushi@gmail.com");
    const [password, setPassword] = useState("Arushi@05");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8000/login", {
                emailId, password
            },
                { withCredentials: true })
            console.log("Login API Response:", res.data)
            // Handle nested response structure - check for common patterns
            const userData = res.data.user || res.data.data || res.data
            console.log("User data being dispatched:", userData)
            dispatch(addUser(userData))
            return navigate("/feed")
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="flex justify-center my-30">
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Login First!</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Email</legend>
                        <input type="text" onChange={(e) => { setEmailId(e.target.value) }} className="input" placeholder="example@gmail.com" value={emailId} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Password</legend>
                        <input type="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="input" placeholder="Type here" />
                    </fieldset>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login