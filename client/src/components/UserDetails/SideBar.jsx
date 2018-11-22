import React from "react";

export default function SideBar({ user: { img, email, joindate, office } }) {
  return (
    <div>
      <img src={img} className="img-fluid" alt="" />
      <br />
      <br/>
      <h6>Join Date</h6>
      <h6>{joindate}</h6>
      <br />
      <h6>Location</h6>
      <h6>{office}</h6>
      <br />
      <h6>{email}</h6>
    </div>
  );
}
