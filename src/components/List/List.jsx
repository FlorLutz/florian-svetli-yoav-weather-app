import React from "react";
import "./List.css";

export default function List({
  activities,
  isGoodWeather,
  filteredActivities,
  onDeleteActivity,
}) {
  return (
    <>
      <h2>
        {isGoodWeather ? "The weather is awesome!" : "stay home and do this:"}
      </h2>
      <ul className="list">
        {filteredActivities.map((activity) => (
          <li key={activity.id} className="listedActivity">
            {activity.name}

            <button aria-label="Close button" onClick={() => onDeleteActivity(activity.id)}>X</button>

          </li>
        ))}
      </ul>
    </>
  );
}

// li-output for activities-prop, this goes inside the <ul></ul> (instead of filtering in App.jsx):
// {(isGoodWeather
//   ? activities.filter((activity) => activity.isGoodWeather)
//   : activities.filter((activity) => !activity.isGoodWeather)
// ).map((activity) => (
//   <li key={activity.id}>{activity.name}</li>
// ))}
