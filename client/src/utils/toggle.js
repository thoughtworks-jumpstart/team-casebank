//import React from "react";

//Do not display if current env is production
export function toggle(element) {
  const isProduction = process.env.REACT_APP_SERVER_ENV === "production";
  return isProduction ? null : element;
}

//Display prod element if current env is production, otherwise display otherElement
export function toggleToAnother(prodElement, otherElement) {
  const isProduction = process.env.REACT_APP_SERVER_ENV === "production";
  return isProduction ? prodElement : otherElement;
}
