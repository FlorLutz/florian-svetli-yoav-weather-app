import { useState, useEffect } from "react";
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

  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    async function startFetching() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather"
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    }
    startFetching();
  }, []);

  console.log("weatherData", weatherData);

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
    (activity) => activity.isGoodWeather === weatherData.isGoodWeather
  );

  function handleDeleteActivity(id) {
    console.log(id);
    setActivities(activities.filter((activity) => activity.id !== id));
  }

  return (
    <>
      <Weather
        temperature={weatherData.temperature}
        condition={weatherData.condition}
      />
      <List
        activities={activities}
        isGoodWeather={weatherData.isGoodWeather}
        filteredActivities={filteredActivities}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleSubmit} />
    </>
  );
}
