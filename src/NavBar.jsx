import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { removeUser, addUser } from './utils/userSlice';
import { removeFeed } from './utils/feedSlice';
import { removeConnections } from './utils/connectionsSlice';
import { Link, useNavigate } from 'react-router-dom';
const NavBar = () => {
  const user = useSelector((store) =>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("User in NavBar:", user)
  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/logout", {}, { withCredentials: true })
      dispatch(removeUser())
      dispatch(removeFeed())
      dispatch(removeConnections())
      return navigate("/login")
    }
    catch (err) {
      console.log(err)
    }
  }
 

return (
  <div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <Link to="/feed" className="btn btn-ghost text-xl">Cric Connect</Link>
    </div>
    <div className="flex gap-2">
      <div className="dropdown dropdown-end mx-3">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              key={user?.photoUrl || user?.photo_url || user?.photoURL || user?.imageUrl || user?.profileImage || user?.avatar || "default"}
              alt="pfp"
              src={user?.photoUrl || user?.photo_url || user?.photoURL || user?.imageUrl || user?.profileImage || user?.avatar || "https://img.freepik.com/premium-vector/man-profile_1083548-15963.jpg?semt=ais_incoming&w=740&q=80"} />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li >
            <Link to="/profile" className="justify-between">
              Profile
            </Link>
          </li>
          <li><Link to="/connections">My Connections</Link></li>
          <li onClick={handleLogout} ><Link >Logout</Link></li>
        </ul>
      </div>
    </div>
  </div>
)
}

export default NavBar;

//"https://i.pinimg.com/736x/99/8d/c6/998dc6604f85ec28fa95a11d50d43fd1.jpg"