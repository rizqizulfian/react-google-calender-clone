import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];


const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchCalEvent } = useContext(GlobalContext);
  const handlerCloseButton = () => {
    setShowEventModal(false);
  };
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

  const handlerInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlerInputDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlerSelectLabel = (lblClass) => {
    setSelectedLabel(lblClass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: Date.now(),
    };
    dispatchCalEvent({ type: 'push', payload: calendarEvent });
    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <button onClick={handlerCloseButton}>
            <span className="material-icons-outlined text-gray-400">
              close
            </span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 item-end gap-y-7">
            <div>
            </div>
            <input type="text"
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              name="title"
              placeholder="Add title"
              onChange={handlerInputTitle}
              value={title}
              required
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input type="text"
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              name="description"
              placeholder="Add a description"
              onChange={handlerInputDescription}
              value={description}
              required
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_order
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => handlerSelectLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && <span className="material-icons-outlined text-white text-sm">
                    check
                  </span>}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
            Save
          </button>
        </footer>
      </form>
    </div>
  )
};

export default EventModal;