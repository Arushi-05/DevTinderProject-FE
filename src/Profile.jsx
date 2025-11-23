import React, { useState } from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import UserCard from './UserCard';
const Profile = () => {
  const user= useSelector((store)=>store.user)
  const [isEditing, setIsEditing] = useState(false)
  console.log("user from profile comp:",user)
  return ( user &&(
    <div className='max-w-4xl w-full mx-auto px-6 my-20'>
      <div className='flex justify-end mb-6'>
        <button
          className="btn btn-active btn-primary"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? 'Back to Profile' : 'Edit Profile'}
        </button>
      </div>
      {isEditing ? (
        <div className='mt-6'>
          <EditProfile user={user}/>
        </div>
      ) : (
        <div className='flex justify-center'>
          <UserCard user={user}/>
        </div>
      )}
    </div>
  ))
}

export default Profile