import React from "react";

function CaseDetails({ description }) {
  return <div style={{overflow: "auto"}} dangerouslySetInnerHTML={{ __html: description }} />;
}

export default CaseDetails;
