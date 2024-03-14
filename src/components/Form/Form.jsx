import React from "react";

export default function Form({ onAddActivity }) {
  return (
    <form onSubmit={onAddActivity}>
      <h2>Add new Activity:</h2>
      <label htmlFor="inputName">Name: </label>
      <input
        type="text"
        id="inputName"
        className="inputName"
        name="inputName"
        aria-label="Input field where information about activity could be filled"
      />
      <label htmlFor="checkbox">Good-weather activity:</label>
      <input
        aria-label="Checkbox named good-weather activity"
        type="checkbox"
        id="checkbox"
        name="checkbox"
      />
      <input aria-label="Submit button" value="submit" type="submit" />
    </form>
  );
}
