import React, { useState } from 'react'
import axios from 'axios';
const Login = () => {
    const [emailId, setEmailId]=useState("arushi@gmail.com");
    const [password, setPassword]=useState("Arushi@05");

    const handleLogin=async ()=>{
        try{
            const res=await axios.post("http://localhost:8000/login",{
                emailId,password
            },
        {withCredentials:true})
            
        }
        catch(err){
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
                    <input type="text" onChange={(e)=>{setEmailId(e.target.value)}} className="input" placeholder="example@gmail.com" value={emailId} />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Enter Password</legend>
                    <input type="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input" placeholder="Type here" />
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