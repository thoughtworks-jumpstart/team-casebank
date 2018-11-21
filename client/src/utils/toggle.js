//import React from "react";

//Toggle element off if current env is production
export function toggle(element) {
  const isProduction = process.env.REACT_APP_SERVER_ENV === "production";
  return isProduction ? null : element;
}
