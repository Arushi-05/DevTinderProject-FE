import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from './utils/userSlice';
import { addFeed } from './utils/feedSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [age, setAge] = useState(user?.age || '');
    const [skills, setSkills] = useState(Array.isArray(user?.skills) ? user.skills.join(", ") : '');
    const [gender, setGender] = useState(user?.gender || '');
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("user from edit profile comp: " + user)

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setAge(user.age || '');
            setSkills(Array.isArray(user.skills) ? user.skills.join(", ") : '');
            setGender(user.gender || '');
        }
    }, [user?.firstName, user?.lastName, user?.age, user?.gender, user?.skills]);

    const saveProfile = async () => {
        try {
            const skillsArray = skills.split(",").map(s => s.trim()).filter(s => s.length > 0);
            const res = await axios.patch(
                "http://localhost:8000/profile/edit",
                { firstName, lastName, age, gender, skills: skillsArray },
                { withCredentials: true }
            );
            const updatedUserData = res.data.user || res.data.data || res.data;
            dispatch(addUser(updatedUserData));
            setError("");
            setShowToast(true)
            setTimeout(()=>{setShowToast(false)}, 2000)
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex justify-center my-30">
            <div className="card bg-base-200 w-96 shadow-sm">
                {showToast && <div className="toast toast-top toast-center">

                    <div className="alert alert-success">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>}
                <div className="card-body">
                    <h2 className="card-title">Hello {user.firstName}!</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="Type here" value={firstName} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age</legend>
                        <input type="text" value={age} onChange={(e) => { setAge(e.target.value) }} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Gender</legend>
                        <input type="text" value={gender} onChange={(e) => { setGender(e.target.value) }} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Skills</legend>
                        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                    {error && <p className='text-red-500'>{error}</p>}
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={saveProfile}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile