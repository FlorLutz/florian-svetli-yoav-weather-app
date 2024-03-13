import { useState } from "react";
import "./App.css";
import Form from "./components/Form/Form.jsx";
import Weather from "./components/Weather/Weather.jsx";
import List from "./components/List/List.jsx";

export default function App() {
  return (
    <>
      <Weather />
      <List />
      <Form />
    </>
  );
}
