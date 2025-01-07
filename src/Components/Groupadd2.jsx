import React from 'react';
import PropTypes from 'prop-types';

export default function GroupAddMembers({ showAddMemberMenu, darkMode }) {
  const user = 'User1';
  const about = 'This is user1';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} rounded-lg shadow-lg w-full max-w-md`}>
        {/* Header */}
        <div className={`${darkMode ? 'text-white border-gray-700' : 'text-black border-gray-300'} px-4 flex py-3 border-b justify-between items-center`}>
          <h2 className="text-lg font-semibold">Add Members</h2>
          <i 
            onClick={showAddMemberMenu} 
            className="bi bi-arrow-left-circle-fill text-2xl cursor-pointer"
          ></i>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium`}>FRIENDS</h3>
          <div className="w-full mt-2" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
            <div>
              <label className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  className="mr-2 cursor-pointer" 
                  style={{ width: '15px', height: '15px' }} 
                />
                <img 
                  src="https://placehold.co/40x40" 
                  alt="user avatar" 
                  className="w-8 h-8 rounded-full mx-2"
                />
                <div>
                  <span className={`${darkMode ? 'text-white' : 'text-black'} font-semibold`}>{user}</span>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                    {about}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`${darkMode ? 'border-gray-700' : 'border-gray-300'} px-4 py-3 border-t`}>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
            Only you can add or remove members from this group.
          </p>
          <button 
            onClick={showAddMemberMenu} 
            className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]' : 'bg-gray-300 text-gray-600 hover:bg-gray-200'} mt-2 border-none p-2 rounded-lg w-full`}
          >
            Add Members
          </button>
        </div>
      </div>
    </div>
  );
}

GroupAddMembers.propTypes = {
  showAddMemberMenu: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};
const UserCard = ({ user, about, darkMode }) => (
    <label className="flex items-center mb-2">
      <input 
        type="checkbox" 
        className="mr-2 cursor-pointer" 
        style={{ width: '15px', height: '15px' }} 
      />
      <img 
        src="https://placehold.co/40x40" 
        alt="user avatar" 
        className="w-8 h-8 rounded-full mx-2"
      />
      <div>
        <span className={`${darkMode ? 'text-white' : 'text-black'} font-semibold`}>{user}</span>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>{about}</p>
      </div>
    </label>
  );
  
  UserCard.propTypes = {
    user: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    darkMode: PropTypes.bool.isRequired,
  };
  