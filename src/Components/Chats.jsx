import './Styles/Column2.css'
import { useState, useEffect, useRef } from 'react';
import { getAllChats, getFavaouriteChats, getChatPreivew, checkIsRelated, searchChats } from '../Services/ChatService';
import DirectChatPreview from './DirectChatPreview';
import { useWebSocket } from '../Context/WebSocketContext';
import { Skeleton } from "@/components/ui/skeleton";

export default function Chats({showDirectMessages, darkMode, setReceiverId}) {

    const { messages } = useWebSocket();
    const [processedMessages, setProcessedMessages] = useState([]);

    const [chats, setChats] = useState([]);
    const [favouriteChats, setFavouriteChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [showAll, setShowAll] = useState(true);
    const inputRef = useRef(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const getSearchResults = async (value) => {
        try {
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

    const fetchAllChats = async () => {
        try {
            const friendIds = await getAllChats(); 
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
    };

    const fetchFavouriteChats = async () => {
        try {
            const friendIds = await getFavaouriteChats(); 
            const chatPreviews = await Promise.all(
                friendIds.map(async (friendId) => {
                    const chatPreview = await getChatPreivew(friendId);
                    return chatPreview;
                })
            );
            setFavouriteChats(chatPreviews); 
        }
        finally {
            setLoading2(false);
        }
    };    
    
   useEffect(() => {
        const handleMessages = async () => {
            if (messages.length === 0) {
                return;
            }
            const newMessages = messages.filter(
                (message) => !processedMessages.includes(message.id)
            );
            if (newMessages.length === 0) {
                return;
            }
            for (const lastMessage of newMessages) {

                if (lastMessage.action === 'messageService') {
                    if(lastMessage.type === 'direct'){
                        const isRelated = await checkIsRelated(lastMessage.chatId);
                        if (isRelated) {
                            await Promise.all([fetchAllChats(), fetchFavouriteChats()]); 
                        }
                    }
                }

                if(lastMessage.action === 'profileService'){
                    if(chats.some(chat => chat.friendId === lastMessage.body)){ 
                        fetchAllChats();
                        fetchFavouriteChats();
                    }
                }

            }
            setProcessedMessages((prevProcessedMessages) => [
                ...prevProcessedMessages,
                ...newMessages.map((message) => message.id),
            ]);
        };
        handleMessages();
    }, [messages, processedMessages]);
    
    useEffect(() => {
        fetchAllChats();
        fetchFavouriteChats();
    }, []);

    const showFavouriteChats = () => {
        setShowAll(false);
    }

    const showAllChats = () => {
        setShowAll(true);
    }

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchKeyword(value); 
        if (value.length > 0) {
            getSearchResults(value);
        }
        else{
            fetchAllChats();
        }
    };

    const handleIconClick = async () => {
        if (searchKeyword !== '') {
          setSearchKeyword(''); 
          fetchAllChats();
        }
    };

  return (
    <div>
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  p-4 chats-column`} style={{backgroundColor: darkMode ? '#262729' : '', height:'100vh'}}>
                <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Chats</h2>
                <input ref={inputRef} value={searchKeyword} onChange={handleSearchChange} type="text" placeholder="Search friends" className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `} style={{borderRadius:'20px'}} />
                <i className={`${darkMode ? 'text-[#abacae]' : 'text-gray-500'} bi cursor-pointer absolute text-2xl ${searchKeyword === '' ? 'bi-search' : 'bi-x-circle-fill'}`}
                    style={{ marginLeft: '-3%', marginTop: '0.2%' }}
                    onClick={handleIconClick}
                ></i>
                <div className="flex space-x-2 mb-4">
                    <button onClick={showAllChats} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`} >All</button>
                    <button onClick={showFavouriteChats} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Favorites</button>
                </div>
                <div className='chat-list'>
                    {showAll ? (
                        loading ? (
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
                            chats
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


