import { useState, useEffect } from 'react'
import { sendFriendRequest, getFriendshipStatus, getFriendshipId } from '../Services/FriendshipService'

export default function SearchResult({darkMode, profileName, profileAbout, profileImage, profileId}) {

  const [friendshipStatus, setFriendshipStatus] = useState('');
  const [friendshipId, setFriendshipId] = useState('');
  
  const addFriend = async () => {
    await sendFriendRequest(profileId);
    friendshipInfo();
    retriveFriendshipId();
  }

  const friendshipInfo = async () => {
    const status = await getFriendshipStatus(profileId);
    setFriendshipStatus(status);
  }

  const retriveFriendshipId = async () => {
    const id = await getFriendshipId(profileId);
    setFriendshipId(id);
  }

  useEffect(() => {
    friendshipInfo();
  }, []);

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
        {friendshipStatus === '' && (
          <button
            onClick={addFriend}
            className="border-none hover:border-none bg-primary text-white p-2 px-3 rounded"
          >
            Add Friend
          </button>
        )}
        {friendshipStatus === 'ACCEPTED' && (
          <button
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
            className="border-none hover:border-none bg-primary text-white p-2 px-3 rounded"
          >
            Confirm
          </button>
        )}    
    </div>
    </div>
  )
}
