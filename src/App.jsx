import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import "./App.css";
import Form from "./components/Form/Form.jsx";
import Weather from "./components/Weather/Weather.jsx";
import List from "./components/List/List.jsx";

export default function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  console.log("activities", activities);

  const isGoodWeather = true; //change with API
  async function startFetchingWeather() {
    const response = await fetch("https://example-apis.vercel.app/api/weather");
    const data = await response.json();
    console.log(data);
  }

  startFetchingWeather();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newActivity = {
      id: uid(),
      name: data.inputName,
      isGoodWeather: data.checkbox ? true : false,
    };
    console.log("newActivity", newActivity);
    setActivities([newActivity, ...activities]);
    event.target.reset();
  }

  const filteredActivities = activities.filter(
    (activity) => activity.isGoodWeather === isGoodWeather
  );

  function handleDeleteActivity(id) {
    console.log(id);
    setActivities(activities.filter((activity) => activity.id !== id));
  }

  return (
    <>
      <Weather />
      <List
        activities={activities}
        isGoodWeather={isGoodWeather}
        filteredActivities={filteredActivities}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleSubmit} />
    </>
  );
}
