import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections, removeConnections } from './utils/connectionsSlice';
import ConnectionsCard from './ConnectionsCard';
const Connections = () => {
  const [error, setError] = useState("");
  const connections = useSelector((store) => store.connections)
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  console.log("connections comp data:", connections)
  useEffect(() => {
    // Clear connections when user changes or logs out
    if (!user) {
      dispatch(removeConnections())
      return
    }
    // Fetch connections when user is available
    const fetchConnections = async () => {
      try {
        const loggedInUserId = user._id
        const res = await axios.get("http://localhost:8000/connections", { withCredentials: true })
        console.log("response from connection api: ", res)
        
        const connectionData = res.data.data.map(item => {
          //  if loggedin user is myself
          if (item.fromUserId._id === loggedInUserId) {
   
            return {
              _id: item.toUserId._id,
              firstName: item.toUserId.firstName,
              lastName: item.toUserId.lastName,
              age: item.toUserId.age,
              gender: item.toUserId.gender,
              skills: item.toUserId.skills,
              photoUrl: item.toUserId.photoUrl,
              status: item.status
            }
          } else {
            // If loggedin user is other user, show fromUserId data
            return {
              _id: item.fromUserId._id,
              firstName: item.fromUserId.firstName,
              lastName: item.fromUserId.lastName,
              age: item.fromUserId.age,
              gender: item.fromUserId.gender,
              skills: item.fromUserId.skills,
              photoUrl: item.fromUserId.photoUrl,
              status: item.status
            }
          }
        });
        
        console.log("connectionData:", connectionData)
        dispatch(addConnections(connectionData))

      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "something went wrong")

        console.log(err)
      }
    }
    fetchConnections();
  }, [user, dispatch])
  if (error) {
    return <div className="text-error">Error: {error}</div>
  }

  if (!connections) {
    return <div className="flex justify-center my-20">Loading your connections..</div>
  }

  if (!connections.length) {
    return <div className="flex justify-center my-20">No connections found.</div>
  }
  return (

    <div className="flex flex-wrap justify-center gap-6 my-20">
      {connections.map((connection, idx) => (
        <ConnectionsCard key={connection?._id || connection?.id || idx} connection={connection} showActions={false} />
      ))}
    </div>
  )
}

export default Connections