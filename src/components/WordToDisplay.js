import React from 'react';
import './Components-styles/letterToDisplay.css'
const WordToDisplay = ({letter}) => {
    return (
        <div className='letter-container'>
            {letter}
        </div>
    );
};

export default WordToDisplay;