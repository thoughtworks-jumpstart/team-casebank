import React from "react";

export default function CaseProperties({ properties }) {
  let array = [];
  for (let property in properties) {
    array.push(
      <div key={property}>
        <h6 className="text-capitalize font-weight-bold">{property}</h6>
        {Array.isArray(properties[property]) ? (
          properties[property].map((string, index) => (
            <h6
              className="text-danger font-weight-normal text-capitalize"
              key="index"
            >
              {string}
            </h6>
          ))
        ) : (
          <h6 className="text-danger font-weight-normal text-capitalize">
            {properties[property]}
          </h6>
        )}
      </div>
    );
  }
  return <div>{array}</div>;
}
