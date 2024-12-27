import React from 'react';
import './HoldButton.css';

const HoldButton = ({handleHold,winner}) => {
    return (
        <div>
            <button className="btn-hold" onClick={handleHold} disabled={!!winner}>
                Hold
            </button>
        </div>
    );
};

export default HoldButton;