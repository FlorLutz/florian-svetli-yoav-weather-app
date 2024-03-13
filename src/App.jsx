import { useState } from "react";
import { uid } from "uid";
import "./App.css";
import Form from "./components/Form/Form.jsx";
import Weather from "./components/Weather/Weather.jsx";
import List from "./components/List/List.jsx";

export default function App() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newActivity = {
      id: uid(),
      name: data.inputName,
      isGoodWeather: data.checkbox ? true : false,
    };
    console.log(newActivity);
  }

  return (
    <>
      <Weather />
      <List />
      <Form onAddActivity={handleSubmit} />
    </>
  );
}
