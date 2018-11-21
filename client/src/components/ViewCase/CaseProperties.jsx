import React from "react";

export default function CaseProperties({ properties }) {
  let array = [];
  let formattedProperties;
  if (properties) {
    formattedProperties = {
      Region: properties.region,
      Office: properties.office,
      Year: properties.year,
      Status: properties.status,
      Industry: properties.industry,
      Tags: properties.tag,
      Techstack: properties.techstack,
      "Phase of Project": properties.phase,
      "Main TW Contact": properties.main_tw_contact.name,
      Team: properties.members.map(member => member.name)
    };
  }
  for (let property in formattedProperties) {
    array.push(
      <div key={property}>
        <h6 className="text-capitalize font-weight-bold">{property}</h6>
        {Array.isArray(formattedProperties[property]) ? (
          formattedProperties[property].map((string, index) => (
            <h6
              className="text-danger font-weight-normal text-capitalize"
              key={index}
            >
              {string}
            </h6>
          ))
        ) : (
          <h6 className="text-danger font-weight-normal text-capitalize">
            {formattedProperties[property]}
          </h6>
        )}
      </div>
    );
  }
  return <div>{array}</div>;
}
