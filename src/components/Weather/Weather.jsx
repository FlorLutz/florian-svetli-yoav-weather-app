import React from "react";

export default function Weather({ temperature, condition }) {
  return <p>{`${condition} ${temperature} °C`}</p>;
}
