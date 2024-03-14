import React from "react";

export default function Weather({ temperature, condition }) {
  if (typeof temperature !== "undefined" && typeof condition !== "undefined") {
    return <p>{`${condition} ${temperature} °C`}</p>;
  } else {
    return <p>Loading...</p>;
  }
}
