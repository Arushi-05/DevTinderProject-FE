import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import axios from 'axios';
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  const fetchUser = async () => {


    try {
      const res = await axios.get("http://localhost:8000/profile/view", { withCredentials: true })
      dispatch(addUser(res.data))
    }
    catch (err) {
      if (err.status === 401) {
        navigate("/login")
      }
      console.log(err)
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }

  }, [])

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body