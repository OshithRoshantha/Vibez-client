import React from 'react'; // Ensure React is imported
import './Styles/Column2.css';
import { useState } from 'react';

export default function YourListings({ showEditListingMenu, darkMode }) {
  const [deleteMenu, setDeleteMenu] = useState(false);

  function showDeleteMenu() {
    setDeleteMenu(true);
  }

  function hideDeleteMenu() {
    setDeleteMenu(false);
  }

  return (
    <div>
      {deleteMenu && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: '100' }}>
          <div
            className={`${darkMode ? 'bg-[#262729]' : 'bg-white bg-card'} rounded-lg p-6 w-80 shadow-lg`}
          >
            <div className="text-center">
              <h2 className={`${darkMode ? 'text-white' : 'text-foreground'} text-lg font-semibold`}>
                Delete this listing?
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} mt-2`}>
                Are you sure that you want to delete this listing?
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className={`${darkMode ? 'text-gray-200' : 'text-muted-foreground'}`}>LKR57,500</p>
              <p className={`${darkMode ? 'text-gray-200' : 'text-muted-foreground'}`}>🛒 Phones</p>
            </div>
            <div>
              <button
                style={{ cursor: 'pointer' }}
                onClick={hideDeleteMenu}
                className="bg-primary text-primary-foreground px-4 py-1 rounded-lg w-full mt-3 mb-2"
              >
                Delete
              </button>
              <button
                style={{ cursor: 'pointer' }}
                onClick={hideDeleteMenu}
                className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]' : 'bg-muted text-muted-foreground hover:bg-gray-300'} px-4 py-1 w-full`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`w-full bg-card rounded-lg py-2 flex justify-center items-center ${darkMode ? 'bg-[#262729]' : ''}`}
      >
        <img src="https://placehold.co/300x200" alt="9-cube shelf" className="your-listing-img" />
        <div>
          <h2 className={`${darkMode ? 'text-white' : ''} text-sm font-semibold mt-2`}>9-cube shelf</h2>
          <p className="text-lg font-bold text-primary">$10</p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}>Listed on 6/19</p>
          <div className="flex space-x-2 mt-1">
            <button
              onClick={showEditListingMenu}
              className="bg-primary text-white hover:bg-secondary/80 px-2 py-1 rounded-lg text-sm"
            >
              <i className="bi bi-pencil-square"></i>&nbsp;Edit listing
            </button>
            <button
              onClick={showDeleteMenu}
              className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]' : 'bg-muted text-muted-foreground hover:bg-gray-300'} px-2 py-1 text-sm`}
            >
              <i className="bi bi-trash"></i>&nbsp;Delete listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
