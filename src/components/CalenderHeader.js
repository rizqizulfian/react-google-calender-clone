import React from 'react';
import logo from '../assets/logo.png';

const CalenderHeader = () => {
  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calender"  className="mr-2 w-12 h-12" />
    </header>
  )
}

export default CalenderHeader;