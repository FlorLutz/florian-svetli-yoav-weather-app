import React from "react";
import "./Weather.css";

export default function Weather({ temperature, condition }) {
  if (typeof temperature !== "undefined" && typeof condition !== "undefined") {
    return (
      <p className="weatherConditions">
        <span className="condition">{condition}</span>
        <span>{` ${temperature} °C`}</span>
      </p>
    );
  } else {
    return <p>Loading...</p>;
  }
}
