import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFeed } from './utils/feedSlice';

import UserCard from "./UserCard";

const Feed = () => {
  const [error, setError] = useState("");
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()
  
  const getFeed = async () => {
    try {
      const res = await axios.get("http://localhost:8000/feed", { withCredentials: true })
      const userFeed = res.data.user || res.data.data || res.data
      dispatch(addFeed(userFeed))
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "something went wrong")
      console.log(err)
    }
  }

  useEffect(() => {
    if (!feed) {
      getFeed()
    }
  }, [])

  if (error) {
    return <div className="text-error">Error: {error}</div>
  }

  return (
    feed &&
    <div className='flex justify-center my-20 '>
       <UserCard user={feed[0]}/>
    </div>
   
  )
}

export default Feed