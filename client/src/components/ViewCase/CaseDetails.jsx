import React from "react";

function CaseDetails({ description }) {
  return <div dangerouslySetInnerHTML={description} />;
}

export default CaseDetails;
