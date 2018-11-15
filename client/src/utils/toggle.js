import React from "react";

//Toggle element off if current env is production
export function toggle(element) {
  return process.env.NODE_ENV.toLowerCase() === "production" ? (
    element
  ) : (
    <div>{process.env.NODE_ENV}</div>
  );
}
