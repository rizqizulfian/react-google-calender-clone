import React, { useContext, useEffect, useState } from 'react';
import './App.css';

import { getMonth } from './utils';

import CalenderHeader from './components/CalenderHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import GlobalContext from './context/GlobalContext';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    console.log('ini woi', monthIndex)
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <div className="h-screen flex flex-col">
        <CalenderHeader />
        <div className="flex flex-1">
            <Sidebar />
            <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
