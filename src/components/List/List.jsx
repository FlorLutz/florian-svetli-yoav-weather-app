import React from "react";

export default function List({ activities }) {
  return (
    <>
      <h2>
        The weather is awesome! <br />
        Go outside and:
      </h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </>
  );
}
