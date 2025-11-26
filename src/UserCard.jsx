import React from 'react'

const UserCard = ({ user, showActions = false }) => {
  if (!user) {
    return null;
  }

  const {
    firstName  = '',
    lastName = '',
    age = '',
    gender = '',
    photoUrl = '',
    skills = [],
  } = user;

  const displaySkills = Array.isArray(skills) ? skills : [];
  return (
    <div className="card bg-base-300 w-96 shadow-sm cursor-pointer">
      <figure>
        <img
          src={user.photoUrl}
          alt="pfp" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
          <div className="badge badge-secondary">{gender + ", " + age}</div>
        </h2>
        <p>{displaySkills.join(", ")}</p>
        {showActions && (
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Interested</div>
            <div className="badge badge-outline">Ignore</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;


//https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/361700/361713.jpg