import React from "react";
import "./Form.css";
export default function Form({ onAddActivity }) {
  return (
    <form onSubmit={onAddActivity} className="form">
      <h2>Add new Activity:</h2>

      <label htmlFor="inputName"></label>
      <div className="formInput">
        <textarea
          rows="2"
          id="inputName"
          className="inputName"
          name="inputName"
          placeholder="Enter your new activity here"
          minLength="3"
          maxLength="30"
          required
        />
      </div>
      <div className="formInput">
        <label htmlFor="checkbox">Good-weather activity:</label>
        <input type="checkbox" id="checkbox" name="checkbox" />
      </div>


      <input value="submit" type="submit" className="Button" />

    </form>
  );
}
