import React from "react";

function Title({ properties: { client, name } }) {
  return (
    <div>
      <h1>Client: {client}</h1>
      <h2>Name: {name}</h2>
    </div>
  );
}

export default Title;
