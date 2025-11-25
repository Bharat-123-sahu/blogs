import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export const Button = ({ button, buttonname, handleclick }) => {
  return (
    <>
      <div style={{ display: "inline-block" }}>
        <button
          className={button}
          height="20px"
          width="30px"
          onClick={handleclick}
        >
          {buttonname}
        </button>
      </div>
    </>
  );
};
