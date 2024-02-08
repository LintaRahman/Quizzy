import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

function RecordIcon({ stat }) {
  const active = {
    color: "red",
    animation: "pulse 20s infinite",
    height: "2rem",
    padding: "0 1rem",
  };

  const inactive = {
    height: "2rem",
    padding: "0 1rem",
    color: "white",
  };
  return (
    <>
      {stat === "recording" ? (
        <FontAwesomeIcon icon={faMicrophone} style={active} />
      ) : (
        <FontAwesomeIcon icon={faMicrophone} style={inactive} />
      )}
    </>
  );
}

export default RecordIcon;
