import React from 'react'

const ConnectionsCard = ({ connection }) => {
  if (!connection) {
    return null;
  }

  const {
    firstName  = '',
    lastName = '',
    age = '',
    gender = '',
    photoUrl = '',
    skills = [],
  } = connection;
  
  const displaySkills = Array.isArray(skills) ? skills : [];
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="pfp" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}
    <div className="badge badge-secondary">{gender + ", " + age}</div>
    </h2>
    <p>{displaySkills.join(", ")}</p>
    {/* <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div> */}
  </div>
</div>
  );
};

export default ConnectionsCard;


//https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/361700/361713.jpg