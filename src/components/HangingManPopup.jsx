import React from 'react';

const HangingManPopup = ({ message, onReplay }) => {
  return (
    <div className="popupContainer">
      <div className="popupContent">
        <p>{message}</p>
        <button onClick={onReplay}>Replay</button>
      </div>
    </div>
  );
};

export default HangingManPopup;
