import './Styles/Column2.css'
import { useState, useEffect } from 'react';
import { getAllChats, getFavaouriteChats, getChatPreivew } from '../Services/ChatService';
import DirectChatPreview from './DirectChatPreview';

export default function Chats({showDirectMessages, darkMode, setReceiverId}) {

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

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
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllChats();
    }, []);

    const fetchFavouriteChats = async () => {
        const response = await getFavaouriteChats();
    }

  return (
    <div>
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  p-4 chats-column`} style={{backgroundColor: darkMode ? '#262729' : '', height:'100vh'}}>
                <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Chats</h2>
                <input type="text" placeholder="Search friends" className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `} style={{borderRadius:'20px'}} />
                <i className={`${darkMode ? 'text-[#abacae]':'text-gray-500'} bi absolute text-2xl bi-search`} style={{marginLeft:'-3%', marginTop:'0.2%'}}></i>
                <div className="flex space-x-2 mb-4">
                    <button className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`} >All</button>
                    <button className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Unread</button>
                    <button className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Favorites</button>
                </div>
                <div className='chat-list'>       
                    {loading ? (
                        <p className="text-center">Loading...</p>
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
                                    />
                                );
                            })
                    )}
                </div>
            </div>
    </div>
  )
}


