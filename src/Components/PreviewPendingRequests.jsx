import { useState } from 'react'
import { useWebSocket } from '../Context/WebSocketContext';

export default function PreviewPendingRequests({darkMode, friendshipId, profileId, profileName, profilePicture, status, profileAbout}) {

  const [isAccepted, setIsAccepted] = useState(true);
  const { acceptFriendRequest } = useWebSocket();
  
  const approveFriendRequest = async () => {
    await acceptFriendRequest(friendshipId);
    setIsAccepted(false);
  }

  return (
    <>
    {isAccepted && <>
    <div className="flex items-center justify-between border-border py-0 mt-2" >
        <div className="flex items-center">
            <img src={profilePicture} className="rounded-full mr-2" style={{height:'45px'}}/>
            <div>
                <p className={`${darkMode ? 'text-white' : ''} font-medium`}>{profileName}</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm `}>{profileAbout}</p>
            </div>
        </div>
        <div className="btn-container">
            <button onClick={approveFriendRequest} className="bg-primary text-primary-foreground px-3 py-1 mr-2 rounded">Confirm</button>
        </div>
    </div>  
    </>}
    </>
  )
}
