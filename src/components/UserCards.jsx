import React from 'react'
import {useDispatch} from "react-redux"
import {BASE_URL} from "../utils/constants"
import {removeUserFromFeed} from "../utils/feedSlice"
import axios from 'axios'

const UserCards = ({user}) => {
    // console.log(user)

    const {_id,firstName, lastName,age,gender,about,photoUrl} = user
    const dispatch = useDispatch();

    const handleSendRequest = async (status,userId) =>{

    try {
      

      const res = await axios.post(BASE_URL + "/request/send/" +status+"/"+userId,{},{withCredentials:true})
      
      dispatch(removeUserFromFeed(userId))
    } catch (error) {
      console.error(error)
    }

    }
    
  return (
    <div>
        <div className="card bg-base-300 w-70 shadow-sm">
  <figure>
    <img
    className='p-2 rounded-xl'
      src={photoUrl}
      alt="profile" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age +","+ gender}</p> } 
     {about && <p>{about}</p> } 
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary"  onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCards