import React from "react";

export default function Suggstion({ onSuggestActivity, isGoodWeather, isSuggestedGWALeft, isSuggestedBWALeft }) {
  return (
    <>
{(isGoodWeather && isSuggestedGWALeft) || (!isGoodWeather && isSuggestedBWALeft) ? <>
      <p>Don't feel inspired today?</p>
      <input onClick= {onSuggestActivity} value="get suggestion" type="button" />
      </> : <p>Scuzi, we ran out of suggstions. Check the other groups apps 🥺</p>}
    </>
  );
}
