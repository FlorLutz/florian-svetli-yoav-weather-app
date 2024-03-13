import React from "react";

export default function List({
  activities,
  isGoodWeather,
  filteredActivities,
}) {
  return (
    <>
      <h2>
        {isGoodWeather ? "The weather is awesome!" : "stay home and do this:"}
      </h2>
      <ul>
        {filteredActivities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </>
  );
}

// li-output for activities-prop (instead of filtering in App.jsx):
// {(isGoodWeather
//   ? activities.filter((activity) => activity.isGoodWeather)
//   : activities.filter((activity) => !activity.isGoodWeather)
// ).map((activity) => (
//   <li key={activity.id}>{activity.name}</li>
// ))}
