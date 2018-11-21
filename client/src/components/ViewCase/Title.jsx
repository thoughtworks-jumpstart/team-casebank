import React from "react";

function Title({ properties: { client, name } }) {
  return (
    <div className="text-left pl-5">
      <h1 className="font-weight-bold">{client}</h1>
      <h2>{name}</h2>
    </div>
  );
}

export default Title;
