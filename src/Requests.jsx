import UserCard from './UserCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, clearRequests, removeRequests } from './utils/requestSlice';
const Requests = () => {
    const request = useSelector((store) => store.request)
    console.log("request store", request)
    const user = useSelector((store) => store.user)
    const [error, setError] = useState("");
    const dispatch = useDispatch()
    const reviewRequests = async (status, requestId) => {
        try {
            const requestResult = await axios.post("http://localhost:8000/request/review/" + status + "/" + requestId, {}, { withCredentials: true })
            dispatch(removeRequests(requestId))
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "something went wrong")
            console.log("Error reviewing request:", err)
        }
    }
    const handleAccept = (user) => {
        reviewRequests("accepted", user.requestId)
    }

    const handleReject = (user) => {
        reviewRequests("rejected", user.requestId)
    }
    const getAllRequests = async () => {

        try {
            const allRequests = await axios.get("http://localhost:8000/request/received", { withCredentials: true })
            const requestData = allRequests.data.data.map(item => ({
                requestId: item._id, // The actual request ID for accept/reject
                _id: item.fromUserId._id, // User ID for display
                firstName: item.fromUserId.firstName,
                lastName: item.fromUserId.lastName,
                age: item.fromUserId.age,
                gender: item.fromUserId.gender,
                skills: item.fromUserId.skills,
                photoUrl: item.fromUserId.photoUrl,
                status: item.status
            }));
            console.log("allreq:", allRequests)
            console.log("Request data mapped:", requestData)
            dispatch(addRequests(requestData))

        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "something went wrong")
            console.log(err)
        }
    }

    useEffect(() => {
        if (!user) {
            dispatch(clearRequests())
            return
        }
        getAllRequests()
    }, [user, dispatch])

    if (!request) {
        return <div className="flex justify-center my-20">Loading your requests..</div>
    }

    if (!request.length) {
        return <div className="flex justify-center my-20">No requests found.</div>
    }

    console.log("Requests component - request state:", request)

    if (error) {
        return <div className="text-error flex justify-center my-20">Error: {error}</div>
    }

    return (
        <div className="flex flex-wrap justify-center gap-6 my-20">
            {request.map((connection, idx) => (
                <UserCard
                    key={connection?.requestId || connection?._id || idx}
                    user={connection}
                    showActions={true}
                    primaryLabel="Accept"
                    secondaryLabel="Reject"
                    onClickPrimary={handleAccept}
                    onClickSecondary={handleReject}
                />
            ))}
        </div>
    )
}

export default Requests