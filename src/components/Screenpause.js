import React from "react";

export default function ScreenPause({ text }) {
  return (
    <div className="screen-pause fade-in">
      <div className="container">
        <p className="pause-text">{text}</p>
      </div>
    </div>
  );
}
