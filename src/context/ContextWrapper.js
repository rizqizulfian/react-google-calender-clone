import React, { useState, useEffect, useReducer } from 'react';
import dayjs from 'dayjs';
import GlobalContext from './GlobalContext';

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case "update":
      return state.map(evt => evt.id === payload.id ? payload : evt);
    case "delete":
      return state.filter(evt => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
  }, [savedEvents])

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        }
      })
    })
  }, [savedEvents])

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth)
    }
  }, [smallCalendarMonth])

  return (
    <GlobalContext.Provider value={{
      monthIndex,
      setMonthIndex,
      smallCalendarMonth,
      setSmallCalendarMonth,
      daySelected,
      setDaySelected,
      showEventModal,
      setShowEventModal,
      dispatchCalEvent,
      savedEvents,
      selectedEvent,
      setSelectedEvent,
      labels,
      setLabels,
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
};

export default ContextWrapper;