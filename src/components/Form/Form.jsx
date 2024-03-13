import React from "react";

export default function Form() {
  return (
    <form>
      <h2>Add new Activity:</h2>
      <label htmlFor="inputName">Name: </label>
      <input type="text" id="inputName" className="inputName" />
      <label htmlFor="checkbox">Good-weather activity:</label>
      <input type="checkbox" />
      <input value="submit" type="submit" />
    </form>
  );
}
