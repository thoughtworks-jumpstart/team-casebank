import React from "react";

function CaseDetails({ description }) {
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
}

export default CaseDetails;
