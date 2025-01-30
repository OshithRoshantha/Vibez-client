import { useState, useEffect } from 'react';
import { sendFriendRequest, getFriendshipStatus, getFriendshipId, acceptFriendRequest } from '../Services/FriendshipService';
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from '../hooks/useIsMobile';

export default function SearchResult({ darkMode, profileName, profileAbout, profileImage, profileId, showDirectMessages, setReceiverId, setShowMobileRight }) {
  
  const isMobile = useIsMobile();
  const [friendshipStatus, setFriendshipStatus] = useState('');
  const [friendshipId, setFriendshipId] = useState('');
  const [loading, setLoading] = useState(true); 

  const newFriendRequest = async () => {
    setFriendshipStatus('REQUESTED');
    await sendFriendRequest(profileId);
  };

  const approveFriendRequest = async () => {
    setFriendshipStatus('ACCEPTED');
    await acceptFriendRequest(friendshipId);
  };

  const sendMessage = () => {
    setReceiverId(profileId);
    if(isMobile){
      setShowMobileRight(true);
    }
    else{
      showDirectMessages();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFriendshipId(profileId);
      if (response === 'NOT_FRIENDS') {
        setFriendshipStatus('NOT_FRIENDS');
      } else {
        setFriendshipId(response);
        const statusResponse = await getFriendshipStatus(response);
        if(statusResponse.status === 'NOT_FRIENDS') {
            setFriendshipStatus('NOT_FRIENDS');
        }
        else if (statusResponse.status === 'ACCEPTED') {
          setFriendshipStatus('FRIENDS');
        } else if (statusResponse.status === 'PENDING') {
          if (statusResponse.userId === sessionStorage.getItem('userId')) {
            setFriendshipStatus('REQUESTED');
          } else if (statusResponse.friendId === sessionStorage.getItem('userId')) {
            setFriendshipStatus('CONFIRM');
          }
        }
      }
      setLoading(false); 
    };
    fetchData();
  }, []); 

  if (loading) {
    return <div>
        <div className='mb-3' style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
            <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] " />
              <Skeleton className="h-4 w-[200px]" />
            </div>  
        </div> 
    </div>;
  }

  return (
    <div className="flex items-center justify-between border-border">
      <div className="flex items-center">
        <img className="w-12 h-12 rounded-full mr-4" src={profileImage} alt="User Profile Picture" />
        <div>
          <h2 className={`${darkMode ? 'text-white' : ''}`}>{profileName}</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>{profileAbout}</p>
        </div>
      </div>
      <div className="btn-container">
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
  );
}
