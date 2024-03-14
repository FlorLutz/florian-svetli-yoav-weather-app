import React from "react";

export default function Form({ onAddActivity, onSuggestActivity }) {
  return (
    <form onSubmit={onAddActivity}>
      <h2>Add new Activity:</h2>
      <label htmlFor="inputName">Name: </label>
      <input
        type="text"
        id="inputName"
        className="inputName"
        name="inputName"
      />
      <label htmlFor="checkbox">Good-weather activity:</label>
      <input type="checkbox" id="checkbox" name="checkbox" />
      <input value="submit" type="submit" />
      <br/>
      <p>Don't feel inspired today?</p>
      <input onClick= {onSuggestActivity} value="get suggestion" type="button" />
    </form>
  );
}
