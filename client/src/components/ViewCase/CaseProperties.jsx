import React from "react";

export default function CaseProperties({ properties }) {
  let array = [];
  for (let property in properties) {
    array.push(
      <div key={property}>
        <h6>{property}</h6>
        <h6>{properties[property]}</h6>
      </div>
    );
  }
  return <div>{array}</div>;
}
