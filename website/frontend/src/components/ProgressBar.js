import React, { useState } from 'react';
import "../style/ProgressBar.css";

export default function ProgressBar(props) {
    const [percent, setPercent] = useState(0);

    const handleIncrement = (e) => {
        e.preventDefault();

        setPercent(percent + 25);
    };

    return (
        <div>
            <div className="inner-progress-bar" style={{width: `${percent}%`}}></div>
            <div className="outer-progress-bar"></div>
            <input type="button" value="Increment me" onClick={handleIncrement} />
            <input type="button" value="Reset me" onClick={(e) => setPercent(0)} />            
        </div>
    )
};