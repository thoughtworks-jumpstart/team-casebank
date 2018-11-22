import React from "react";
import { Link } from "react-router-dom";

export default function CaseProperties({ properties }) {
  let array = [];
  let formattedProperties;
  if (properties) {
    formattedProperties = {
      Region: properties.region,
      Office: properties.office,
      Year: properties.year,
      "NDA status": properties.nda,
      Industry: properties.industry,
      // Tags: properties.tag,
      "Tech stack": properties.techstack,
      "Main TW contact": (
        <Link
          to={`/userdetails/${properties.main_tw_contact._id}`}
          target="_blank"
        >
          {properties.main_tw_contact.name}
        </Link>
      ),
      Team: properties.members.map((member, index) => (
        <Link key={index} to={`/userdetails/${member._id}`} target="_blank">
          {member.name}
        </Link>
      ))
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
