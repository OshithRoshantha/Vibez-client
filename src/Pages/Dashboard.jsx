import Chats from '@/Components/Chats';
import './Styles/Dashboard.css'
import { useEffect, useState, useRef} from 'react';
import Friends from '@/Components/Friends';
import Marketplace from '@/Components/Marketplace';
import Settings from '@/Components/Settings';
import GroupChats from '@/Components/GroupChats';
import Profile from '@/Components/Profile';
import DirectChat from '@/Components/DirectChat';
import GroupChat from '@/Components/GroupChat';
import FriendInfo from '@/Components/FriendInfo';
import GroupInfo from '@/Components/GroupInfo';
import MorphingText from "@/Components/ui/morphing-text";
import mainLogo from '../assets/Icons/main-logo3.png'
import { updateDarkMode, getdarkModePreference, fetchUserMetaData} from '../Services/ProfileService';
import { getUnreadCount, checkIsRelated } from  '../Services/ChatService';
import PopupNotifiter from '../Components/PopupNotifiter';
import { useWebSocket } from '../Context/WebSocketContext';
import { getConnectedProfileInfo, filterPendingRequests, filterAcceptedRequests, isConnectedProfile} from '../Services/FriendshipService';
import { isProductListed, getProductDetails } from '../Services/MarketplaceService';
import { getUnreadGroupMessages, isGroupRelated } from '../Services/GroupsService';

export default function Dashboard() {

    const { messages } = useWebSocket();
    const [processedMessages, setProcessedMessages] = useState([]);
    
    const audioRef = useRef(null);
    const audioRef2 = useRef(null);
    const [darkMode, setDarkMode] = useState();
    const [friendsMenu, setFriendsMenu] = useState(false);
    const [chatsMenu, setChatsMenu] = useState(true);
    const [groupsMenu, setGroupsMenu] = useState(false);
    const [marketplaceMenu, setMarketplaceMenu] = useState(false);
    const [settingsMenu, setSettingsMenu] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const [groupMessages, setGroupMessages] = useState(false);
    const [directMessages, setDirectMessages] = useState(false);
    const [friendInfoMenu, setFriendInfoMenu] = useState(false);
    const [groupInfoMenu, setGroupInfoMenu] = useState(false);
    const [welcomeVideo, setWelcomeVideo] = useState(true);
    const [userPicture, setUserPicture] = useState('url');
    const [showNotification, setShowNotification] = useState(false);
    const [profileImage, setProfileImage] = useState('url');
    const [profileName, setProfileName] = useState('');
    const [notifiacton, setNotification] = useState('');
    const [pendingRequests, setPendingRequests] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [unreadGroupMessages, setUnreadGroupMessages] = useState(0);

    const [receiverId, setReceiverId] = useState('');
    const [groupId, setGroupId] = useState('');
    
    const texts = [
        "Stay connected with your circles",
        "One-on-one, anytime",
        "Build and grow your network",
        "Chat and shop in harmony"
      ];

    const fetchPendingRequests = async () => {
        let linkedProfiles = JSON.parse(sessionStorage.getItem('linkedProfiles'));
          if (linkedProfiles.length === 0) {setPendingRequests(0);}
          else if (linkedProfiles.length > 0) {
              let count = 0;
              for (let friendshipId of linkedProfiles){
                  const profileInfo = await getConnectedProfileInfo(friendshipId);
                  const response = await filterPendingRequests(friendshipId);
                  if (response && profileInfo.status === "PENDING") {
                      count++;
                  }
              setPendingRequests(count);      
          }
       }    
    };

    const fetchUnreadMessages = async () => {
        const response = await getUnreadCount();
        setUnreadMessages(response);
    }

    const fetchUnreadGroupMessages = async () => {
        const response = await getUnreadGroupMessages();
        setUnreadGroupMessages(response);
    }
    
    useEffect(() => {
        async function DarkModePreference() {
            await updateDarkMode( darkMode === true ? 'true' : 'false');
        }
        DarkModePreference();
    }, [darkMode]);

    useEffect(() => {
        const fetchDarkModePreference = async () => {
            const preference = await getdarkModePreference();
            setDarkMode(preference); 
        };
        const fetchUser = async () => {
            const response = await fetchUserMetaData();
            if (userPicture === 'url')
                setUserPicture(response.profilePicture);
        };
        fetchDarkModePreference();
        fetchUser();
        fetchPendingRequests();
        fetchUnreadMessages();
        fetchUnreadGroupMessages();
    }, []);

    useEffect(() => {
        const handleMessages = async () => {
            if (messages.length === 0) {
                return;
            }
            const newMessages = messages.filter(message => !processedMessages.includes(message.id));
            if (newMessages.length === 0) {
                return; 
            }    
            let linkedProfiles = JSON.parse(sessionStorage.getItem('linkedProfiles')) || [];    
            for (const lastMessage of newMessages) {
                if (lastMessage.action === 'friendshipService') {
                        if ((lastMessage.status === 'UNFRIENDED' || lastMessage.status === 'BLOCKED') && linkedProfiles.includes(lastMessage.friendshipId)) {
                            linkedProfiles = linkedProfiles.filter(profile => profile !== lastMessage.friendshipId);
                            sessionStorage.setItem('linkedProfiles', JSON.stringify(linkedProfiles));
                            setProcessedMessages(prevProcessedMessages => [
                                ...prevProcessedMessages,
                                ...newMessages.map(message => message.id),
                            ]);
                        } 

                        else {
                            const response = await isConnectedProfile(lastMessage.friendshipId);
                            if (response && (lastMessage.status === 'PENDING' || lastMessage.status === 'ACCEPTED')) {
                                const profileInfo = await getConnectedProfileInfo(lastMessage.friendshipId);
                                const filterResponse = await filterPendingRequests(lastMessage.friendshipId);
                                const filterAccepted = await filterAcceptedRequests(lastMessage.friendshipId);
                                if (filterResponse && profileInfo.status === 'PENDING') {
                                    setProfileImage(profileInfo.profilePicture);
                                    setProfileName(profileInfo.profileName);
                                    setNotification('sent you a friend request.');
                                    setPendingRequests(prev => prev + 1);
                                    setShowNotification(true);
                                } else if (filterAccepted && profileInfo.status === 'ACCEPTED') {
                                    setProfileImage(profileInfo.profilePicture);
                                    setProfileName(profileInfo.profileName);
                                    setNotification('accepted your friend request.');
                                    setShowNotification(true);
                                }
                            }
                        
                        }
                }
                else if (lastMessage.action === 'marketplaceService'){
                    if (lastMessage.productAction === 'ADDED'){
                        const response = await isProductListed(lastMessage.body);
                        if (response){
                            const productDetails = await getProductDetails(lastMessage.body);
                            setProfileImage(productDetails.productPhotos[0]);
                            setProfileName('');
                            setNotification(`Your new listing for ${productDetails.productTitle} has been created.`);
                            setShowNotification(true);
                        }
                    }
                }
                else if (lastMessage.action === 'messageService'){
                    if(lastMessage.type === 'direct'){
                        const isRelated = await checkIsRelated(lastMessage.chatId);
                        if(isRelated){
                            fetchUnreadMessages();
                            if(lastMessage.sender !== sessionStorage.getItem('userId')){
                                audioRef2.current.play();
                            }
                        }
                    }
                    else if(lastMessage.type === 'group'){
                        const isRelated = await isGroupRelated(lastMessage.groupId);
                        if (isRelated) {
                            fetchUnreadGroupMessages();
                            if(lastMessage.sender !== sessionStorage.getItem('userId')){
                                audioRef2.current.play();
                            }
                        } 
                    }
                }
            }
            setProcessedMessages(prevProcessedMessages => [
                ...prevProcessedMessages,
                ...newMessages.map(message => message.id),
            ]);
        };
        handleMessages();
    }, [messages, processedMessages]); 
    
    

    function hideWelcomeVideo(){
        setWelcomeVideo(false);
    }

    function darkModeOn() {
        setDarkMode(true);
    }

    function darkModeOff() {
        setDarkMode(false);
    }

    function showFriendInfoMenu(){
        setFriendInfoMenu(true);
        setGroupInfoMenu(false);
        setFriendsMenu(false);
        setChatsMenu(false);
        setMarketplaceMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(false);
    }

    function showGroupInfoMenu(){
        setGroupInfoMenu(true);
        setFriendInfoMenu(false);
        setFriendsMenu(false);
        setChatsMenu(false);
        setMarketplaceMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(false);
    }

    function showDirectMessages(){
        setDirectMessages(true);
        setGroupMessages(false);
        hideWelcomeVideo();
    }

    function showGroupMessages(){
        setDirectMessages(false);
        setGroupMessages(true);
        hideWelcomeVideo();
    }

    function showChatsMenu(){
        setFriendsMenu(false);
        setChatsMenu(true);
        setMarketplaceMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(false);
        setGroupInfoMenu(false);
        setFriendInfoMenu(false);
    }

    function showFriendstMenu(){
        setChatsMenu(false);
        setFriendsMenu(true);
        setMarketplaceMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(false);
        setGroupInfoMenu(false);
        setFriendInfoMenu(false);
    }

    function showMarketplaceMenu(){
        setMarketplaceMenu(true);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(false);
        setGroupInfoMenu(false);
        setFriendInfoMenu(false);
    }

    function showSettingsMenu(){
        setMarketplaceMenu(false);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(true);
        setGroupsMenu(false);
        setProfileMenu(false);
        setGroupInfoMenu(false);
        setFriendInfoMenu(false);
    }

    function showGroupsMenu(){
        setMarketplaceMenu(false);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(true);
        setProfileMenu(false);
        setGroupInfoMenu(false);
        setFriendInfoMenu(false);
    }

    function showProfileMenu(){
        setMarketplaceMenu(false);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(true);
        setGroupInfoMenu(false);
        setFriendInfoMenu(false);
    }

    useEffect(() => {
        if (showNotification) {
          audioRef.current.play();
          const timer = setTimeout(() => {
            setShowNotification(false);
          }, 9000);
          return () => clearTimeout(timer);
        }
      }, [showNotification]);

  return (
    <div className='dashboard-conatiner'>
        <audio ref={audioRef} src="/assets/Tones/notification.mp3" />
        <audio ref={audioRef2} src="/assets/Tones/message.mp3" />
        {showNotification && <div>
            <PopupNotifiter darkMode={darkMode} notifiacton={notifiacton} profileImage={profileImage} profileName={profileName}/>
        </div>}
        <div className="flex h-screen bg-background text-foreground">
            <div className={`${darkMode ? 'border-gray-600 border-r border-border':''}  flex flex-col h-screen bg-background border-r border-border button-column`}  style={{backgroundColor: darkMode ? '#262729' : ''}}>
                <div onClick={showChatsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:chatsMenu ? '6px solid blue': 'none'}}>
                    {unreadMessages > 0 && (
                        <div className='text-white bg-danger ml-7 mb-3 h-5 w-5 rounded-full absolute' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{unreadMessages}</div>
                    )} 
                    <i className={`bi bi-chat-dots-fill text-2xl ${chatsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showGroupsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:groupsMenu ? '6px solid blue': 'none'}}>
                    {unreadGroupMessages > 0 && (
                        <div className='text-white bg-danger ml-7 mb-3 h-5 w-5 rounded-full absolute' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{unreadGroupMessages}</div>
                    )} 
                    <i className={`bi bi-wechat text-2xl ${groupsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showFriendstMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:friendsMenu ? '6px solid blue': 'none'}}>      
                    {pendingRequests > 0 && (
                        <div className='text-white bg-danger ml-7 mb-3 h-5 w-5 rounded-full absolute' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{pendingRequests}</div>
                    )}                    
                    <i className={`bi bi-people text-2xl ${friendsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showMarketplaceMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:marketplaceMenu ? '6px solid blue': 'none'}}>
                    <i className={`bi bi-shop-window text-2xl ${marketplaceMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showSettingsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:settingsMenu ? '6px solid blue': 'none'}}>
                    <i className={`bi bi-gear text-2xl ${settingsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showProfileMenu} className="flex items-center justify-center mt-auto mb-4" style={{cursor: 'pointer'}}>
                    <img src={userPicture} alt="Profile" className={`${profileMenu ? 'border border-primary border-3' : ''} rounded-full`} style={{width:'60px', height:'60px'}}/>
                </div>
            </div>
            {chatsMenu && <Chats setReceiverId={setReceiverId} darkMode={darkMode} showDirectMessages={showDirectMessages}/>}
            {groupsMenu && <GroupChats darkMode={darkMode} setGroupId={setGroupId} showGroupMessages={showGroupMessages}/>}
            {friendsMenu && <Friends setReceiverId={setReceiverId} darkMode={darkMode} showDirectMessages={showDirectMessages} setPendingRequests={setPendingRequests} fetchPendingRequests={fetchPendingRequests}/>}
            {marketplaceMenu && <Marketplace setReceiverId={setReceiverId} showDirectMessages={showDirectMessages}  darkMode={darkMode}/>}
            {settingsMenu && <Settings darkModeOn={darkModeOn} darkModeOff={darkModeOff} darkMode={darkMode}/>}
            {profileMenu && <Profile  darkMode={darkMode} setUserPicture={setUserPicture}/>}
            {friendInfoMenu && <FriendInfo receiverId={receiverId} darkMode={darkMode}/>}
            {groupInfoMenu && <GroupInfo groupId={groupId} darkMode={darkMode}/>}
            <div className="flex-1 p-0 messages-column" style={{height:'100vh'}}>
                {welcomeVideo &&
                <div className="w-full flex flexflex-column items-center justify-center" style={{height:'100vh', backgroundImage: darkMode ? 'url(./src/assets/Wallpapers/dark.png)' : 'url(./src/assets/Wallpapers/light.png)', backgroundSize: 'cover'}}>
                    <img src={mainLogo} className='absolute mt-[-35%] right-[4%]'  style={{width:'10%'}}/>
                    <MorphingText  texts={texts} className="text-primary dark:text-white right-[7%] absolute mt-[-8%] text-left"/>
                    <div className='text-primary mt-[60%]'>
                        <i className="bi bi-lock-fill"></i>&nbsp;<p className='inline'>Your personal messages are end-to-end encrypted</p>
                    </div>  
                </div>
                }
                {directMessages && <DirectChat fetchUnreadMessages={fetchUnreadMessages} receiverId={receiverId} darkMode={darkMode} showFriendInfoMenu={showFriendInfoMenu}/>} 
                {groupMessages && <GroupChat fetchUnreadGroupMessages={fetchUnreadGroupMessages}  darkMode={darkMode} groupId={groupId} showGroupInfoMenu={showGroupInfoMenu}/>}  
            </div>
        </div>
    </div>
)
}
