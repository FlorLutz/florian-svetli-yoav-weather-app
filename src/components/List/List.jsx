import React from "react";

export default function List({ activities, isGoodWeather }) {
  return (
    <>
      <h2>
        {isGoodWeather ? "The weather is awesome!" : "stay home and do this:"}
      </h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </>
  );
}
