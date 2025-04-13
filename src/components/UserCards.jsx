import React from 'react'

const UserCards = ({user}) => {
    console.log(user)

    const {firstName, lastName,age,gender,about,photoUrl} = user
    
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
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCards