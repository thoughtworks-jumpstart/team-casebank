import React from "react";

//Toggle element off if current env is production
export function toggle(element) {
  return (
    <div>{process.env.NODE_ENV}</div>
  );
}
