import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { unFriend } from '../Services/FriendshipService';
import { useState } from 'react';

export default function PreiviewAcceptedRequests({darkMode, friendshipId, profileId, profileName, profilePicture, status, profileAbout, setBlockPopup, setUnfriendPopup}) {
  
    const [isUnfriended, setIsUnfriended] = useState(false);

    const handleUnfriend = async () => {
        await unFriend(friendshipId);
        setIsUnfriended(true);
    }
    return (
            <>
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
                        <i className="bi bi-chat-fill text-primary"></i>
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
