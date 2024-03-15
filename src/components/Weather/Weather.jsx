import React from "react";
import "./Weather.css";

export default function Weather({ temperature, condition }) {
  return (
    <p>
      <span className="condition">{condition}</span>
      <span>{` ${temperature} °C`}</span>
    </p>
  );
}
