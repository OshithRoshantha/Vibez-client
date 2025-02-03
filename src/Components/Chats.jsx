import './Styles/Column2.css'
import { useState, useEffect, useRef } from 'react';
import { getChatPreivew, searchChats } from '../Services/ChatService';
import DirectChatPreview from './DirectChatPreview';
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from '../hooks/useIsMobile';
import PreviewAcceptedRequests from './PreviewAcceptedRequests';
import { getConnectedProfileInfo, filterPendingRequests } from '../Services/FriendshipService';
import { useGlobalStore } from '../States/UseStore';

export default function Chats({showDirectMessages, darkMode, setReceiverId, setShowMobileRight}) {

    const isMobile = useIsMobile();
    const { directChats, setDirectChats, loadingDirectChats } = useGlobalStore();

    const [chats, setChats] = useState([]);
    const [favouriteChats, setFavouriteChats] = useState([]);
    const [acceptedProfiles, setAcceptedProfiles] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [showAll, setShowAll] = useState(true);
    const inputRef = useRef(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showFriends, setShowFriends] = useState(false);

    useEffect(() => {
        setIsFetched(true);
    }, [directChats]);

    const getSearchResults = async (value) => {
        try {
            setLoading(true);
            setChats([]); 
            const friendIds = await searchChats(value); 
            const chatPreviews = await Promise.all(
                friendIds.map(async (friendId) => {
                    const chatPreview = await getChatPreivew(friendId);
                    return chatPreview;
                })
            );
            setChats(chatPreviews); 
        }
        finally {
            setLoading(false);
        }
    }

    const fetchFriendships = async () => {
            setLoading3(true);
            setAcceptedProfiles([]);
            const linkedProfiles = JSON.parse(sessionStorage.getItem('linkedProfiles')) || [];
            if (linkedProfiles.length === 0) {
                setLoading3(false);
                return;
            }
            const profilesPromises = linkedProfiles.map(async (friendshipId) => {
                const profileInfo = await getConnectedProfileInfo(friendshipId);
                const response = await filterPendingRequests(friendshipId);
                return { profileInfo, response };
            });
        
            try {
                const results = await Promise.all(profilesPromises);
                const accepted = [];
                results.forEach(({ profileInfo, response }) => {
                    if (profileInfo.status === "ACCEPTED") {
                        if (!accepted.some(profile => profile.profileId === profileInfo.profileId)) {
                            accepted.push(profileInfo);
                        }
                    }
                });
                setAcceptedProfiles(accepted);
            } finally {
                setLoading3(false);
            }
    };
    
    const showAllChats = () => {
        setShowAll(true);
        setShowFriends(false);
    }

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchKeyword(value); 
        if (value.length > 0) {
            getSearchResults(value);
        }
    };

    const handleIconClick = async () => {
        if (searchKeyword !== '') {
          setSearchKeyword(''); 
        }
    };

    const addChat = async () => {
        setShowFriends(true);
        setShowAll(false);
        fetchFriendships();
    }

  return (
    <div>
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  p-4 chats-column`} style={{backgroundColor: darkMode ? '#262729' : '', height: isMobile ? '90vh' : '100vh', width: isMobile ? '100vw' : ''}}>
                <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Chats</h2>
                <input ref={inputRef} value={searchKeyword} onChange={handleSearchChange} type="text" placeholder="Search chats by name" className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `} style={{borderRadius:'20px'}} />
                <i className={`${darkMode ? 'text-[#abacae]' : 'text-gray-500'} bi cursor-pointer absolute text-2xl ${searchKeyword === '' ? 'bi-search' : 'bi-x-circle-fill'}`}
                    style={{ marginLeft: isMobile ? '-10%' : '-3%', marginTop: isMobile ? '0.5%': '0.2%' }}
                    onClick={handleIconClick}
                ></i>
                <div className="flex space-x-2 mb-4">
                    <button onClick={showAllChats} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`} >All</button>
                    <button onClick={addChat} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}><i className="bi bi-plus-lg"></i></button>
                </div>
                <div className='chat-list' style={{height: isMobile ? '59vh' : ''}}>
                {showFriends && (
                        <>
                        {loading3 ? (
                            <>
                                <div className="mb-3" style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                                </div>
                                <div className="mb-3" style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                                </div>
                                <div className="mb-3" style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                                </div>
                            </>
                            ) : (
                            acceptedProfiles.map(profile => (
                                <PreviewAcceptedRequests
                                    key={profile.friendshipId}
                                    darkMode={darkMode}
                                    friendshipId={profile.friendshipId}
                                    profileName={profile.profileName}
                                    profilePicture={profile.profilePicture}
                                    profileAbout={profile.profileAbout}
                                    fetchFriendships={fetchFriendships}
                                    showDirectMessages={showDirectMessages}
                                    setReceiverId={setReceiverId}
                                    friendId={profile.profileId}
                                    setShowMobileRight={setShowMobileRight}
                                />
                            ))
                            )}
                        </>
                        )}
                    {showAll ? (
                        loadingDirectChats || loading ? (
                            <div>
                            {[...Array(6)].map((_, index) => (
                              <div key={index} className="space-y-2">
                                <div className={`flex items-center p-2 rounded`}>
                                  <Skeleton className="h-12 w-12 rounded-full mr-2" />
                                  <div className="flex-1 space-y-1">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                  </div>
                                  <Skeleton className="h-4 w-16" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                            (searchKeyword === '' ? directChats : chats)
                                .sort((a, b) => new Date(b.lastActiveTime) - new Date(a.lastActiveTime))
                                .map((chat) => {
                                    const now = new Date();
                                    const date = new Date(chat.lastActiveTime);
                                    let formattedTime;

                                    if (
                                        now.getFullYear() === date.getFullYear() &&
                                        now.getMonth() === date.getMonth() &&
                                        now.getDate() === date.getDate()
                                    ) {
                                        formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                                    } else if (
                                        now.getFullYear() === date.getFullYear() &&
                                        now.getMonth() === date.getMonth() &&
                                        now.getDate() - date.getDate() === 1
                                    ) {
                                        formattedTime = 'Yesterday';
                                    } else {
                                        formattedTime = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                                    }

                                    return (
                                        <DirectChatPreview
                                            key={chat.friendId}
                                            friendId={chat.friendId}
                                            friendName={chat.friendName}
                                            friendAvatar={chat.friendAvatar}
                                            lastMessage={chat.lastMessage}
                                            lastMessageSender={chat.lastMessageSender}
                                            lastActiveTime={formattedTime}
                                            showDirectMessages={showDirectMessages}
                                            setReceiverId={setReceiverId}
                                            darkMode={darkMode}
                                            chatId={chat.chatId}
                                            setShowMobileRight={setShowMobileRight}
                                        />
                                    );
                            })
                        )
                    ) : (
                        loading2 ? (
                          <div>
                            {[...Array(6)].map((_, index) => (
                              <div key={index} className="space-y-2">
                                <div className={`flex items-center p-2 rounded`}>
                                  <Skeleton className="h-12 w-12 rounded-full mr-2" />
                                  <div className="flex-1 space-y-1">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                  </div>
                                  <Skeleton className="h-4 w-16" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                            favouriteChats
                                .sort((a, b) => new Date(b.lastActiveTime) - new Date(a.lastActiveTime))
                                .map((chat) => {
                                    const now = new Date();
                                    const date = new Date(chat.lastActiveTime);
                                    let formattedTime;

                                    if (
                                        now.getFullYear() === date.getFullYear() &&
                                        now.getMonth() === date.getMonth() &&
                                        now.getDate() === date.getDate()
                                    ) {
                                        formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                                    } else if (
                                        now.getFullYear() === date.getFullYear() &&
                                        now.getMonth() === date.getMonth() &&
                                        now.getDate() - date.getDate() === 1
                                    ) {
                                        formattedTime = 'Yesterday';
                                    } else {
                                        formattedTime = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                                    }

                                    return (
                                        <DirectChatPreview
                                            key={chat.friendId}
                                            friendId={chat.friendId}
                                            friendName={chat.friendName}
                                            friendAvatar={chat.friendAvatar}
                                            lastMessage={chat.lastMessage}
                                            lastMessageSender={chat.lastMessageSender}
                                            lastActiveTime={formattedTime}
                                            showDirectMessages={showDirectMessages}
                                            setReceiverId={setReceiverId}
                                            darkMode={darkMode}
                                        />
                                    );
                            })
                        )
                    )}                    
                </div>
            </div>
    </div>
  )
}


