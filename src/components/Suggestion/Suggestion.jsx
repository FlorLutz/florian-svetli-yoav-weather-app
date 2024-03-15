import React from "react";


export default function Suggestion({

  onSuggestActivity,
  isGoodWeather,
  isSuggestedGWALeft,
  isSuggestedBWALeft,
}) {
  return (
    <>
      {(isGoodWeather && isSuggestedGWALeft) ||
      (!isGoodWeather && isSuggestedBWALeft) ? (

        <div className="suggestion">
          <p className="formInput">Don't feel inspired today?</p>

          <input
            onClick={onSuggestActivity}
            value="get suggestion"
            type="button"

            className="Button"
          />
        </div>

      ) : (
        <p>Scuzi, we ran out of suggstions. Check the other groups apps 🥺</p>
      )}
    </>
  );
}
