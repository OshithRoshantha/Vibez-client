import Chats from '@/Components/Chats';
import './Styles/Dashboard.css'
import { useState } from 'react';
import Friends from '@/Components/Friends';
import Marketplace from '@/Components/Marketplace';
import Settings from '@/Components/Settings';
import GroupChats from '@/Components/GroupChats';
import Profile from '@/Components/Profile';
import DirectChat from '@/Components/DirectChat';
import GroupChat from '@/Components/GroupChat';
import FriendInfo from '@/Components/FriendInfo';
import GroupInfo from '@/Components/GroupInfo';

export default function Dashboard() {
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
    const [darkMode, setDarkMode] = useState(true);

    function darkModeOn() {
        setDarkMode(true);
        console.log('dark mode on');
    }

    function darkModeOff() {
        setDarkMode(false);
        console.log('dark mode off');
    }

    function hideWelcomeVideo(){
        setWelcomeVideo(false);
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

return (
    <div className='dashboard-conatiner'>
        <div className="flex h-screen bg-background text-foreground">
            <div className="flex flex-col h-screen bg-background border-r border-border  button-column" style={{backgroundColor: darkMode ? '#262729' : ''}}>
                <div onClick={showChatsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:chatsMenu ? '6px solid blue': 'none'}}>
                    <div className="relative">
                        <i className={`bi bi-chat-dots-fill text-2xl ${chatsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                    </div>
                </div>
                <div onClick={showGroupsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:groupsMenu ? '6px solid blue': 'none'}}>
                    <i className={`bi bi-wechat text-2xl ${groupsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showFriendstMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:friendsMenu ? '6px solid blue': 'none'}}>
                    <i className={`bi bi-people text-2xl ${friendsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showMarketplaceMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:marketplaceMenu ? '6px solid blue': 'none'}}>
                    <i className={`bi bi-shop-window text-2xl ${marketplaceMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showSettingsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer', borderLeft:settingsMenu ? '6px solid blue': 'none'}}>
                    <i className={`bi bi-gear text-2xl ${settingsMenu ? 'text-primary' : darkMode ? 'text-white' : 'text-black'}`}></i>
                </div>
                <div onClick={showProfileMenu} className="flex items-center justify-center mt-auto mb-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/50x50" alt="Profile" className={`${profileMenu ? 'border border-primary border-3' : ''} w-15 h-15 rounded-full`} />
                </div>
            </div>
            {chatsMenu && <Chats showDirectMessages={showDirectMessages}/>}
            {groupsMenu && <GroupChats showGroupMessages={showGroupMessages}/>}
            {friendsMenu && <Friends/>}
            {marketplaceMenu && <Marketplace/>}
            {settingsMenu && <Settings darkModeOn={darkModeOn} darkModeOff={darkModeOff} darkMode={darkMode}/>}
            {profileMenu && <Profile/>}
            {friendInfoMenu && <FriendInfo/>}
            {groupInfoMenu && <GroupInfo/>}
            <div className="flex-1 p-0 messages-column" style={{height:'100vh'}}>
                {welcomeVideo &&
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                >
                <source src="./src/assets/Videos/welcomeChat.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>}
                {directMessages && <DirectChat showFriendInfoMenu={showFriendInfoMenu}/>} 
                {groupMessages && <GroupChat showGroupInfoMenu={showGroupInfoMenu}/>}  
            </div>
        </div>
    </div>
)
}
