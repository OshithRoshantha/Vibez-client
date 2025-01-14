import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { unFriend } from '../Services/FriendshipService';
import { useState } from 'react';

export default function PreviewAcceptedRequests({darkMode, friendshipId, profileName, profilePicture, profileAbout, fetchFriendships, showDirectMessages, setReceiverId, friendId}) {
  
    const [isUnfriended, setIsUnfriended] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [unfriendPopup, setUnfriendPopup] = useState(false);

    const handleUnfriend = async () => {
        let linkedProfiles = JSON.parse(sessionStorage.getItem('linkedProfiles'));
        linkedProfiles = linkedProfiles.filter(profile => profile !== friendshipId);
        sessionStorage.setItem('linkedProfiles', JSON.stringify(linkedProfiles));
        fetchFriendships();
        await unFriend(friendshipId);
        setIsUnfriended(true);
        setUnfriendPopup(false);
    }

    const handleBlock = async () => {
        let linkedProfiles = JSON.parse(sessionStorage.getItem('linkedProfiles'));
        linkedProfiles = linkedProfiles.filter(profile => profile !== friendshipId);
        sessionStorage.setItem('linkedProfiles', JSON.stringify(linkedProfiles));
        await unFriend(friendshipId);
        setIsUnfriended(true);
        setBlockPopup(false);
    }

    const cancelPopup = () => {
        setBlockPopup(false);
        setUnfriendPopup(false);
    }

    const handleSendMessage = () => {
        setReceiverId(friendId);
        showDirectMessages();
    }

    return (
            <>

            {blockPopup && <>
                <div className="fixed absolute inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex: '100'}}>
                    <div className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} p-6 rounded-lg shadow-lg text-left`}>
                    <h2 className={`${darkMode ? 'text-white':'text-black'} text-lg font-semibold mb-1`} >
                        Block {profileName}?
                    </h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} mb-4`}>Blocked contacts will no longer be able to send you messages.</p>
                    <div className="flex justify-end space-x-4">
                        <button onClick={cancelPopup} className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'} border-none px-4 py-2 rounded`}>
                            Cancel
                        </button>
                        <button onClick={handleBlock}  className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded">
                            Block
                        </button>
                    </div>
                </div>
                </div>            
            </>}

            {unfriendPopup && <>
                <div className="fixed absolute inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex: '100'}}>
                    <div className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} p-6 rounded-lg shadow-lg text-left`}>
                    <h2 className={`${darkMode ? 'text-white':'text-black'} text-lg font-semibold mb-1`} >
                        Remove {profileName}?
                    </h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} mb-4`}>Removing this contact will remove them from your friends list.</p>
                    <div className="flex justify-end space-x-4">
                        <button onClick={cancelPopup}  className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'} border-none px-4 py-2 rounded`}>
                            Cancel
                        </button>
                        <button onClick={handleUnfriend} className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded">
                            Remove
                        </button>
                    </div>
                </div>
                </div>            
            </>}

            {!isUnfriended && <>
                    <div className="flex items-center justify-between border-border py-0 mt-2">
                    <div className="flex items-center">
                        <img src={profilePicture} className="rounded-full mr-2" style={{ height: '45px' }} />
                        <div>
                        <p className={`${darkMode ? 'text-white' : ''} font-medium`}>{profileName}</p>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}>{profileAbout}</p>
                        </div>
                    </div>

                    <div className="btn-container">
                        <div className="ml-mr-4 btns">
                        <i onClick={handleSendMessage} className="bi bi-chat-fill text-primary"></i>
                        </div>

                        <Popover>
                        <PopoverTrigger asChild>
                            <div className="btns">
                            <i className={`${darkMode ? 'text-white' : ''} bi bi-three-dots-vertical`}></i>
                            </div>
                        </PopoverTrigger>

                        <PopoverContent
                            style={{
                            width: '220px',
                            marginRight: '200px',
                            height: '105px',
                            backgroundColor: darkMode ? '#262729' : '',
                            
                            }}
                        >
                            <div className="bg-card text-card-foreground p-0 rounded-lg pl-3">
                            <div
                                className="flex-grow friend-buttons"
                                style={{
                                marginLeft: '-20px',
                                marginTop: '-17px',
                                backgroundColor: darkMode ? '#262729' : '',
                                }}
                            >
                                <button
                                onClick={setBlockPopup}
                                className={`${darkMode ? 'text-white' : ''} flex flex-grow items-center w-full p-2 text-left rounded bg-transparent border-none focus:ring-0 hover:border-none`}
                                >
                                <span
                                    className="material-icons mr-3"
                                    style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: darkMode ? '#3b3c3e' : '#d1d1d1',
                                    width: '29px',
                                    height: '29px',
                                    borderRadius: '50%',
                                    }}
                                >
                                    <i className="bi bi-slash-circle-fill "></i>
                                </span>	
                                Block {profileName.split(' ')[0]}
                                </button>

                                <button
                                onClick={setUnfriendPopup}
                                className={`${darkMode ? 'text-white' : ''} flex flex-grow items-center w-full p-2 text-left rounded bg-transparent border-none focus:ring-0 hover:border-none`}
                                >
                                <span
                                    className="material-icons mr-3"
                                    style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: darkMode ? '#3b3c3e' : '#d1d1d1',
                                    width: '29px',
                                    height: '29px',
                                    borderRadius: '50%',
                                    }}
                                >
                                    <i className="bi bi-person-x-fill "></i>
                                </span>
                                Remove {profileName.split(' ')[0]}
                                </button>
                            </div>
                            </div>
                        </PopoverContent>
                        </Popover>
                    </div>
                    </div>
                </>}
            </>
  )
}
