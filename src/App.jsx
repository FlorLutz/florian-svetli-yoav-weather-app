import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import "./App.css";
import Form from "./components/Form/Form.jsx";
import Suggestion from "./components/Suggestion/Suggestion.jsx";
import Weather from "./components/Weather/Weather.jsx";
import List from "./components/List/List.jsx";

export default function App() {
  const inititialActivities = [
    { id: uid(), name: "Do yoga in your closest park", isGoodWeather: true },
    {
      id: uid(),
      name: "Chill in the park listening to <a href='https://open.spotify.com/playlist/0jGxTY0oQCIdzvteY0ygGG' target='_blank'>Good Weather Vibes</a>",
      isGoodWeather: true,
    },
    { id: uid(), name: "Go to the lake and get some tan", isGoodWeather: true },
    { id: uid(), name: "Time to head for a Biergarten", isGoodWeather: true },
    { id: uid(), name: "Learn how to rollerskate", isGoodWeather: true },
    { id: uid(), name: "Go to the gym", isGoodWeather: false },
    {
      id: uid(),
      name: "Listen to <a href='https://open.spotify.com/intl-de/artist/4AZab8zo2nTYd7ORDmQu0V' target='_blank'>The Dead Weather</a>",
      isGoodWeather: false,
    },
    { id: uid(), name: "Learn and play a new card game", isGoodWeather: false },
    { id: uid(), name: "Stare at the wall", isGoodWeather: false },
    { id: uid(), name: "Paint the first thing you see", isGoodWeather: false },
  ];
  const suggestedGoodWeatherActivities = [
    { id: uid(), name: "Go stargazing", isGoodWeather: true },
    { id: uid(), name: "Eat icecream 🍦", isGoodWeather: true },
    { id: uid(), name: "Hiking is fun", isGoodWeather: true },
    { id: uid(), name: "Roof Top Party 🎉", isGoodWeather: true },
    { id: uid(), name: "Techno Open Air", isGoodWeather: true },
  ];
  const suggestedBadWeatherActivities = [
    { id: uid(), name: "Cry in your basement", isGoodWeather: false },
    { id: uid(), name: "Go to the cinema", isGoodWeather: false },
    {
      id: uid(),
      name: "Learn a new programming language",
      isGoodWeather: false,
    },
    {
      id: uid(),
      name: "Rewatch all seasons of Rick and Morty",
      isGoodWeather: false,
    },
    { id: uid(), name: "Clean up the house", isGoodWeather: false },
  ];

  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: inititialActivities,
  });

  const [suggestedGWA, setSuggestedGWA] = useState(
    suggestedGoodWeatherActivities
  );
  const [suggestedBWA, setSuggestedBWA] = useState(
    suggestedBadWeatherActivities
  );
  const [isSuggestGWALeft, setIsSuggestGWALeft] = useState(true);
  const [isSuggestBWALeft, setIsSuggestBWALeft] = useState(true);

  const [weatherData, setWeatherData] = useState({});

  async function startFetching() {
    const response = await fetch("https://example-apis.vercel.app/api/weather");
    const data = await response.json();
    setWeatherData(data);
  }
  useEffect(() => {
    startFetching();

    let timer = setInterval(startFetching, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

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

  function handleSuggest() {
    if (weatherData.isGoodWeather && suggestedGWA.length > 0) {
      setActivities([suggestedGWA[0], ...activities]);
      suggestedGWA.shift();
      setSuggestedGWA(suggestedGWA);
      if (suggestedGWA.length === 0) {
        setIsSuggestGWALeft(false);
      }
    } else if (!weatherData.isGoodWeather && suggestedBWA.length > 0) {
      setActivities([suggestedBWA[0], ...activities]);
      suggestedBWA.shift();
      setSuggestedBWA(suggestedBWA);
      if (suggestedBWA.length === 0) {
        setIsSuggestBWALeft(false);
      }
    }
  }

  function handleDeleteActivity(id) {
    setActivities(activities.filter((activity) => activity.id !== id));
  }

  const filteredActivities = activities.filter(
    (activity) => activity.isGoodWeather === weatherData.isGoodWeather
  );

  return (
    <main className={weatherData.isGoodWeather ? "" : "ifBadWeather"}>
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
      <Suggestion
        onSuggestActivity={handleSuggest}
        isGoodWeather={weatherData.isGoodWeather}
        isSuggestedGWALeft={isSuggestGWALeft}
        isSuggestedBWALeft={isSuggestBWALeft}
      />
    </main>
  );
}
