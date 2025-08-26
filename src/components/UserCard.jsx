import React from 'react'

const UserCard = ({user}) => {
    console.log(user);
    const {firstName,lastName,age,gender,about,photoUrl}=user;

  return (
    <div className="card bg-gray-900 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="profile of user" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +lastName}</h2>
    {age && gender && <p>{age + "  "+ gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard