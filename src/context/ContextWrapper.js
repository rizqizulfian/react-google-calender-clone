import React, { useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from './GlobalContext';

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  return (
    <GlobalContext.Provider value={{monthIndex, setMonthIndex}}>
      {props.children}
    </GlobalContext.Provider>
  )
};

export default ContextWrapper;