import React, { useState } from 'react';
import "../css/components/ProgressBar.css";

function ProgressBar({total, current}) {
  return (
    <div style={{position: "relative"}}>
      <div className="progress-bar-text">{current}/{total} cards - {total - current} left</div>
      <div className="inner-progress-bar" style={{width: `${current / total * 100}%`}}></div>
      <div className="outer-progress-bar"></div>
    </div>
  )
};

export default ProgressBar;
