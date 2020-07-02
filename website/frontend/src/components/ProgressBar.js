import React, { useState } from 'react';
import "../css/components/ProgressBar.css";

function ProgressBar(props) {
    const [percent, setPercent] = useState(0);

    const handleIncrement = (e) => {
      e.preventDefault();

      setPercent(percent + 25);
    };

    return (
        <div>
          <div className="progress-bar-text">1/2 cards - 1 left</div>
          <div className="inner-progress-bar" style={{width: `${percent}%`}}></div>
          <div className="outer-progress-bar"></div>
          <input type="button" value="Increment me" onClick={handleIncrement} />
          <input type="button" value="Reset me" onClick={(e) => setPercent(0)} />            
        </div>
    )
};

export default ProgressBar;