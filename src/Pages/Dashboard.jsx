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
import { getUnreadCount } from  '../Services/ChatService';
import PopupNotifiter from '../Components/PopupNotifiter';
import { useWebSocket } from '../Context/WebSocketContext';
import { getConnectedProfileInfo, filterPendingRequests, filterAcceptedRequests } from '../Services/FriendshipService';
import { getProductDetails,  getMarketplaceItems, isUserSeller} from '../Services/MarketplaceService';
import { getUnreadGroupMessages } from '../Services/GroupsService';
import mainDark from '@/assets/Wallpapers/dark.png';
import mainLight from '@/assets/Wallpapers/light.png';
import { useIsMobile } from '../hooks/useIsMobile';
import { useGlobalStore } from '../States/UseStore';
import { getAllChats, getChatPreivew } from '../Services/ChatService';
import { getAllGroups, getGroupInfo } from '../Services/GroupsService';
import { isConnectedProfile } from '../Services/FriendshipService';

export default function Dashboard() {

    const isMobile = useIsMobile();
    const { messages } = useWebSocket();
    const { setProductList, setLoadingProducts, setName, setEmail, setAbout, setProfilePicture, directChats, setDirectChats, setLoadingDirectChats, groupChats, setGroupChats, setLoadingGroupChats, setPendingProfiles, setAcceptedProfiles, setLoadingFriendships } = useGlobalStore();
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
    const [showSessionExipred, setShowSessionExipred] = useState(false);
    const [showMobileRight, setShowMobileRight] = useState(false);

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
            setName(response.userName);
            setAbout(response.about);
            setEmail(response.email);
            setProfilePicture(response.profilePicture);
        };
        fetchDarkModePreference();
        fetchUser();
        fetchPendingRequests();
        fetchUnreadMessages();
        fetchUnreadGroupMessages();
        fetchAllChats();
        fetchAllGroups();
        fetchFriendships();
        fetchMarketplaceItems();
        fetchUser();
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
                            if ((lastMessage.status === 'PENDING' || lastMessage.status === 'ACCEPTED')) {
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
                        if ((lastMessage.status === 'UNFRIENDED' || lastMessage.status === 'BLOCKED') && linkedProfiles.includes(lastMessage.friendshipId)) {
                            linkedProfiles = linkedProfiles.filter(profile => profile !== lastMessage.friendshipId);
                            sessionStorage.setItem('linkedProfiles', JSON.stringify(linkedProfiles));
                            fetchFriendships();
                            setProcessedMessages(prevProcessedMessages => [
                                ...prevProcessedMessages,
                                ...newMessages.map(message => message.id),
                            ]);
                        }
                        else{
                            if (lastMessage.status === 'PENDING' || lastMessage.status === 'ACCEPTED') {
                                if (!linkedProfiles.includes(lastMessage.friendshipId)) {
                                    linkedProfiles.push(lastMessage.friendshipId);
                                    sessionStorage.setItem('linkedProfiles', JSON.stringify(linkedProfiles));
                                }
                                fetchPendingRequests();
                                fetchFriendships();
                            } else if (lastMessage.status === 'UNFRIENDED') {
                                linkedProfiles = linkedProfiles.filter(profile => profile !== lastMessage.friendshipId);
                                sessionStorage.setItem('linkedProfiles', JSON.stringify(linkedProfiles));
                                fetchFriendships();
                            }
                        }
                }
                else if (lastMessage.action === 'marketplaceService'){
                    if (lastMessage.productAction === 'ADDED' && lastMessage.sellerId === sessionStorage.getItem('userId')){
                        const productDetails = await getProductDetails(lastMessage.body);
                        setProfileImage(productDetails.productPhotos[0]);
                        setProfileName('');
                        setNotification(`Your new listing for ${productDetails.productTitle} has been created.`);
                        setShowNotification(true);
                    }
                    fetchMarketplaceItems();
                }
                else if (lastMessage.action === 'groupService'){
                    fetchAllGroups();
                }
                else if (lastMessage.action === 'messageService'){
                    if(lastMessage.type === 'direct'){
                        fetchUnreadMessages();
                        if(lastMessage.sender !== sessionStorage.getItem('userId')){
                            audioRef2.current.play();
                        }
                        const hasMatchingChat = directChats.some(chat => chat.chatId === lastMessage.chatId);
                        console.log(lastMessage);
                        if (hasMatchingChat) {
                          setDirectChats(prevChats => 
                            prevChats.map(chat => 
                              chat.chatId === lastMessage.chatId
                                ? {
                                    ...chat,
                                    lastMessage: lastMessage.payload.message,
                                    lastMessageSender: lastMessage.payload.sender === sessionStorage.getItem('userId') ? 'Me' : lastMessage.payload.senderName,
                                    lastActiveTime: convertToISOTimestamp(lastMessage.payload.timestamp)
                                  }
                                : chat
                            )
                          );
                        } else {
                          fetchAllChats(); 
                        }    
                    }
                    else if(lastMessage.type === 'group'){
                        fetchUnreadGroupMessages();
                        if(lastMessage.sender !== sessionStorage.getItem('userId')){
                            audioRef2.current.play();
                        }
                        const hasMatchingGroup = groupChats.some(group => group.groupId === lastMessage.groupId);
                        if (hasMatchingGroup) {
                          setGroupChats(prevGroups => 
                            prevGroups.map(group => 
                              group.groupId === lastMessage.groupId
                                ? {
                                    ...group,
                                    lastMessage: lastMessage.payload.message,
                                    lastMessageSender: lastMessage.payload.sender === sessionStorage.getItem('userId') ? 'Me' : lastMessage.payload.senderName, 
                                    lastUpdate: convertToISOTimestamp(lastMessage.payload.timestamp) 
                                  }
                                : group
                            )
                          );
                        } else {
                          fetchAllGroups(); 
                        }
                    }
                }
                else if(lastMessage.action === 'profileService'){
                    if(directChats.some(chat => chat.friendId === lastMessage.body)){ 
                        fetchAllChats();
                    }
                    for (const friendshipId of linkedProfiles) {
                        const isFriend = await isConnectedProfile(friendshipId);
                        if (isFriend) {
                            fetchFriendships();
                        }
                    }
                    const response = await isUserSeller(lastMessage.body);
                    if(response){
                        fetchMarketplaceItems();
                    }                                        
                }
                else if(lastMessage.action === 'accountDelete' ){
                    if(lastMessage.typeOfAction === 'directChat'){
                        fetchAllChats();
                    }
                    if(lastMessage.typeOfAction === 'friendship'){
                        fetchFriendships();
                    } 
                    if (lastMessage.typeOfAction === 'marketplace') {
                        fetchMarketplaceItems();
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
    
    const fetchMarketplaceItems = async () => {
        try{
            const response = await getMarketplaceItems();
            setProductList(response);
        } finally {
            setLoadingProducts(false);
        }
    };

    const fetchAllChats = async () => {
        try {
            const friendIds = await getAllChats(); 
            const chatPreviews = await Promise.all(
                friendIds.map(async (friendId) => {
                    const chatPreview = await getChatPreivew(friendId);
                    return chatPreview;
                })
            );
            setDirectChats(chatPreviews); 
        }
        finally {
            setLoadingDirectChats(false);
        }
    }; 
    
    const fetchAllGroups = async () => {
        try{
            const groupIds = await getAllGroups();
            const groupPreviews = await Promise.all(
                groupIds.map(async (groupId) => {
                    const groupPreview = await getGroupInfo(groupId);
                    return groupPreview;
                })
            );
            setGroupChats(groupPreviews);
        } 
        finally{
            setLoadingGroupChats(false);
        }
    };

    const fetchFriendships = async () => {
        setLoadingFriendships(true);
        setPendingProfiles([]);
        setAcceptedProfiles([]);
    
        const linkedProfiles = JSON.parse(sessionStorage.getItem('linkedProfiles')) || [];
        if (linkedProfiles.length === 0) {
            setLoadingFriendships(false);
            return;
        }
        const profilesPromises = linkedProfiles.map(async (friendshipId) => {
            const profileInfo = await getConnectedProfileInfo(friendshipId);
            const response = await filterPendingRequests(friendshipId);
            return { profileInfo, response };
        });
    
        try {
            const results = await Promise.all(profilesPromises);
    
            const pending = [];
            const accepted = [];
    
            results.forEach(({ profileInfo, response }) => {
                if (response && profileInfo.status === "PENDING") {
                    if (!pending.some(profile => profile.profileId === profileInfo.profileId)) {
                        pending.push(profileInfo);
                    }
                }
                if (profileInfo.status === "ACCEPTED") {
                    if (!accepted.some(profile => profile.profileId === profileInfo.profileId)) {
                        accepted.push(profileInfo);
                    }
                }
            });
            setPendingProfiles(pending);
            setAcceptedProfiles(accepted);
        } finally {
            setLoadingFriendships(false);
        }
    };

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

    const convertToISOTimestamp = (time) => {
        const [hours, minutes] = time.split(':').map(Number); 
        const now = new Date(); 
        const newDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes,
          now.getSeconds(),
          now.getMilliseconds()
        );
        return newDate.toISOString(); 
    };    

    useEffect(() => {
        if (showNotification) {
          audioRef.current.play();
          const timer = setTimeout(() => {
            setShowNotification(false);
          }, 9000);
          return () => clearTimeout(timer);
        }
      }, [showNotification]);

    const handleLogOut = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSessionExipred(true);
        }, 20 * 60 * 1000); 
        return () => clearTimeout(timer);
    }, []);

  return (
    <div className='dashboard-conatiner'>
        {showSessionExipred && <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex: '9999999'}}>
                <div className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} align-middle justify-center flex flex-col p-6 rounded-lg shadow-lg text-left ${isMobile ? 'w-80' : ''}`}>
                <h2 className={`${darkMode ? 'text-white':'text-black'} text-lg text-center font-semibold text-foreground`}>Your session has expired</h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} text-center mb-4`}>Please log in again to continue.</p>
                <button onClick={handleLogOut} className="border border-primary rounded-lg px-4 py-2 text-white bg-primary">Log in</button>
                </div>
            </div>
        </>}
        <audio ref={audioRef} src="/assets/Tones/notification.mp3" />
        <audio ref={audioRef2} src="/assets/Tones/message.mp3" />
        {showNotification && <div>
            <PopupNotifiter darkMode={darkMode} notifiacton={notifiacton} profileImage={profileImage} profileName={profileName}/>
        </div>}
        {!showMobileRight && <>
        <div className="flex h-screen bg-background text-foreground" style={{display:'flex', flexDirection: isMobile ? 'column-reverse' : 'row'}}>
            <div className={isMobile ? `${darkMode ? 'border-gray-600 border-t border-border' : ''} flex items-center gap-x-7 justify-center align-middle w-full bg-background border-t border-border button-column` : `${darkMode ? 'border-gray-600 border-r border-border' : ''} flex flex-col h-screen bg-background border-r border-border button-column`} style={{backgroundColor: darkMode ? '#262729' : '', width: isMobile ? '100vw' : '', height: isMobile ? '50vh' : ''}}>
                <div onClick={showChatsMenu} className={`flex items-center justify-center ${isMobile ? 'mt-0':'mt-4'}`} style={{cursor: 'pointer', borderLeft: !isMobile && chatsMenu ? '6px solid blue' : 'none'}}>
                    {unreadMessages > 0 && (
                        <div className='text-white bg-danger ml-7 mb-3 h-5 w-5 rounded-full absolute' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{unreadMessages}</div>
                    )} 
                    <i className={`bi bi-chat-dots-fill ${isMobile ? 'text-3xl' : 'text-2xl'}  ${chatsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showGroupsMenu} className={`flex items-center justify-center ${isMobile ? 'mt-0':'mt-4'}`} style={{cursor: 'pointer', borderLeft: !isMobile && groupsMenu ? '6px solid blue' : 'none'}}>
                    {unreadGroupMessages > 0 && (
                        <div className='text-white bg-danger ml-7 mb-3 h-5 w-5 rounded-full absolute' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{unreadGroupMessages}</div>
                    )} 
                    <i className={`bi bi-wechat ${isMobile ? 'text-3xl' : 'text-2xl'} ${groupsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showFriendstMenu} className={`flex items-center justify-center ${isMobile ? 'mt-0':'mt-4'}`} style={{cursor: 'pointer', borderLeft: !isMobile && friendsMenu ? '6px solid blue' : 'none'}}>      
                    {pendingRequests > 0 && (
                        <div className='text-white bg-danger ml-7 mb-3 h-5 w-5 rounded-full absolute' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{pendingRequests}</div>
                    )}                    
                    <i className={`bi bi-people ${isMobile ? 'text-3xl' : 'text-2xl'} ${friendsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showMarketplaceMenu} className={`flex items-center justify-center ${isMobile ? 'mt-0':'mt-4'}`} style={{cursor: 'pointer', borderLeft: !isMobile && marketplaceMenu ? '6px solid blue' : 'none'}}>
                    <i className={`bi bi-shop-window ${isMobile ? 'text-3xl' : 'text-2xl'} ${marketplaceMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showSettingsMenu} className={`flex items-center justify-center ${isMobile ? 'mt-0':'mt-4'}`} style={{cursor: 'pointer', borderLeft: !isMobile && settingsMenu ? '6px solid blue' : 'none'}}>
                    <i className={`bi bi-gear ${isMobile ? 'text-3xl' : 'text-2xl'} ${settingsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showProfileMenu} className={`flex items-center justify-center ${isMobile ? 'mt-2 mb-2':'mt-auto mb-4'}`} style={{cursor: 'pointer'}}>
                    <div className={`${profileMenu ? 'border border-primary border-3' : ''} rounded-full`} style={{ height: '60px', width: '60px', background: `center / cover no-repeat url(${userPicture})` }}></div>
                </div>
            </div>
            {chatsMenu && <Chats setShowMobileRight={setShowMobileRight} setReceiverId={setReceiverId} darkMode={darkMode} showDirectMessages={showDirectMessages}/>}
            {groupsMenu && <GroupChats setShowMobileRight={setShowMobileRight} darkMode={darkMode} setGroupId={setGroupId} showGroupMessages={showGroupMessages}/>}
            {friendsMenu && <Friends setShowMobileRight={setShowMobileRight} setReceiverId={setReceiverId} darkMode={darkMode} showDirectMessages={showDirectMessages} setPendingRequests={setPendingRequests} fetchPendingRequests={fetchPendingRequests}/>}
            {marketplaceMenu && <Marketplace setShowMobileRight={setShowMobileRight} setReceiverId={setReceiverId} showDirectMessages={showDirectMessages}  darkMode={darkMode}/>}
            {settingsMenu && <Settings darkModeOn={darkModeOn} darkModeOff={darkModeOff} darkMode={darkMode}/>}
            {profileMenu && <Profile  darkMode={darkMode} setUserPicture={setUserPicture}/>}
            {friendInfoMenu && <FriendInfo showChatsMenu={showChatsMenu} setShowMobileRight={setShowMobileRight} receiverId={receiverId} darkMode={darkMode}/>}
            {groupInfoMenu && <GroupInfo showGroupsMenu={showGroupsMenu} setShowMobileRight={setShowMobileRight} groupId={groupId} darkMode={darkMode}/>}  
            {!isMobile && <>
            <div className="flex-1 p-0 messages-column" style={{height:'100vh'}}>
                {welcomeVideo &&
                <div className="w-full pl-2 flex flex-column items-center justify-center" style={{height:'100vh', backgroundImage: `url(${darkMode ? mainDark : mainLight})`, backgroundSize: 'cover'}}>
                    <img src={mainLogo} className='absolute mt-[-35%] right-[4%]'  style={{width:'10%'}}/>
                    <MorphingText  texts={texts} className="text-primary dark:text-white text-left mt-[-10%]"/>
                    <div className='text-primary absolute bottom-[5%] ml-[-2%]'>
                        <i className="bi bi-lock-fill"></i>&nbsp;<p className='inline'>Your personal messages are end-to-end encrypted</p>
                    </div>
                </div>
                }
                {directMessages && <DirectChat fetchUnreadMessages={fetchUnreadMessages} receiverId={receiverId} darkMode={darkMode} showFriendInfoMenu={showFriendInfoMenu}/>} 
                {groupMessages && <GroupChat fetchUnreadGroupMessages={fetchUnreadGroupMessages}  darkMode={darkMode} groupId={groupId} showGroupInfoMenu={showGroupInfoMenu}/>}  
            </div>
            </>}
        </div>
        </>}
        {showMobileRight && <>
            {directMessages && <DirectChat setMarketplaceMenu={setMarketplaceMenu} setChatsMenu={setChatsMenu} setShowMobileRight={setShowMobileRight} fetchUnreadMessages={fetchUnreadMessages} receiverId={receiverId} darkMode={darkMode} showFriendInfoMenu={showFriendInfoMenu}/>} 
            {groupMessages && <GroupChat setGroupsMenu={setGroupsMenu} setShowMobileRight={setShowMobileRight} fetchUnreadGroupMessages={fetchUnreadGroupMessages}  darkMode={darkMode} groupId={groupId} showGroupInfoMenu={showGroupInfoMenu}/>}  
        </>}
    </div>
)
}
