import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import "./App.css";
import Form from "./components/Form/Form.jsx";
import Weather from "./components/Weather/Weather.jsx";
import List from "./components/List/List.jsx";

export default function App() {
  const inititialActivities = [
    {id: uid(), name: "Do yoga in your closest park", isGoodWeather: true},
    {id: uid(), name: "Chill in the park listening to <a href='https://open.spotify.com/playlist/0jGxTY0oQCIdzvteY0ygGG'>Good Weather Vibes</a>", isGoodWeather: true},
    {id: uid(), name: "Go to the lake and get some tan", isGoodWeather: true},
    {id: uid(), name: "Time to head for a Biergarten", isGoodWeather: true},
    {id: uid(), name: "Learn how to rollerskate", isGoodWeather: true},
    {id: uid(), name: "Go to the gym", isGoodWeather: false},
    {id: uid(), name: "Listen to <a href='https://open.spotify.com/intl-de/artist/4AZab8zo2nTYd7ORDmQu0V'>The Dead Weather</a>", isGoodWeather: false},
    {id: uid(), name: "Learn and play a new card game", isGoodWeather: false},
    {id: uid(), name: "Stare at the wall", isGoodWeather: false},
    {id: uid(), name: "Paint the first thing you see", isGoodWeather: false},
  ]
  const suggestedGoodWeatherActivities = [
    {id: uid(), name: "Go stargazing", isGoodWeather: true},
    {id: uid(), name: "Do yoga in your closest park", isGoodWeather: true},
    {id: uid(), name: "Go to the lake and get some tan", isGoodWeather: true},
    {id: uid(), name: "Time to head for a Biergarten", isGoodWeather: true},
    {id: uid(), name: "Learn how to rollerskate", isGoodWeather: true}
  ]
  const suggestedBadWeatherActivities = [
    {id: uid(), name: "Go to the gym", isGoodWeather: false},
    {id: uid(), name: "Listen to <a href='https://open.spotify.com/intl-de/artist/4AZab8zo2nTYd7ORDmQu0V'>The Dead Weather</a>", isGoodWeather: false},
    {id: uid(), name: "Learn and play a new card game", isGoodWeather: false},
    {id: uid(), name: "Stare at the wall", isGoodWeather: false},
    {id: uid(), name: "Paint the first thing you see", isGoodWeather: false},
  ]

  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: inititialActivities,
  });

  const [suggestedGWA, setSuggestedGWA] = useState(suggestedGoodWeatherActivities);
  const [suggestedBWA, setSuggestedBWA] = useState(suggestedBadWeatherActivities);

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

  function handleSuggest () {
    let newActivity;
    if (weatherData.isGoodWeather && suggestedGWA) {
      newActivity = suggestedGWA[0]
      suggestedGWA.shift()
      setSuggestedGWA(suggestedGWA)
      console.log("suggestedGWA", suggestedGWA);

    }
    else if (!weatherData.isGoodWeather && suggestedBWA) {
      newActivity = suggestedBWA[0]
      suggestedBWA.shift()
      setSuggestedBWA(suggestedBWA)
      console.log("suggestedBWA", suggestedBWA);
    }
    
    newActivity ? setActivities([newActivity, ...activities]) : alert("I just ran out of suggestions for that weather, sorry 🥺");
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
      <Form onAddActivity={handleSubmit} onSuggestActivity={handleSuggest}/>
    </>
  );
}
