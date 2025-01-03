import { useState, useEffect } from 'react'
import { sendFriendRequest, getFriendshipStatus, getFriendshipId, acceptFriendRequest } from '../Services/FriendshipService'

export default function SearchResult({darkMode, profileName, profileAbout, profileImage, profileId}) {

  const [friendshipStatus, setFriendshipStatus] = useState('');
  const [friendshipId, setFriendshipId] = useState('');
  
  const newFriendRequest = async () => {
    setFriendshipStatus('REQUESTED');
    await sendFriendRequest(profileId);
  }

  const approveFriendRequest = async () => {
    setFriendshipStatus('ACCEPTED');
    await acceptFriendRequest(friendshipId);
  }

  const sendMessage = () => {
    console.log('Message sent');
  }

  useEffect(() => {
    const fetchFriendshipId = async () => {
      const response = await getFriendshipId(profileId);
      if (response === 'NOT_FRIENDS') {
        setFriendshipStatus('NOT_FRIENDS');
        setFriendshipId('0');
      } else {
        setFriendshipId(response);
      }
    };
    fetchFriendshipId();
  }, []); 

  useEffect(() => {
    const fetchFriendshipStatus = async () => {
      if(friendshipId !== '0') {
        const status = await getFriendshipStatus(friendshipId);
        setFriendshipStatus(status);
      }
    };
    fetchFriendshipStatus();
  }, [friendshipId]); 
  
  return (
    <div className="flex items-center justify-between border-border ">
    <div className="flex items-center">
        <img className="w-12 h-12 rounded-full mr-4" src={profileImage} alt="User Profile Picture" />
        <div>
            <h2 className={`${darkMode ? 'text-white':''}`}>{profileName}</h2>
            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'}`}>{profileAbout}</p>
        </div>
    </div>
    <div className='btn-container'>
        {friendshipStatus === 'NOT_FRIENDS' && (
          <button
            onClick={newFriendRequest}
            className="border-none hover:border-none bg-primary text-white p-2 px-3 rounded"
          >
            Add Friend
          </button>
        )}
        {friendshipStatus === 'FRIENDS' && (
          <button
            onClick={sendMessage}
            className="border-none hover:border-none bg-primary text-white p-2 px-3 rounded"
          >
            Message
          </button>
        )}
        {friendshipStatus === 'REQUESTED' && (
          <button
            disabled
            className="border-none bg-blue-400 text-white p-2 px-3 rounded cursor-not-allowed"
          >
            Requested
          </button>
        )}
        {friendshipStatus === 'CONFIRM' && (
          <button
            onClick={approveFriendRequest}
            className="border-none hover:border-none bg-primary text-white p-2 px-3 rounded"
          >
            Confirm
          </button>
        )} 
    
    </div>
    </div>
  )
}
