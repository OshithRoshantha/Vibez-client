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
    }

    function showGroupMessages(){
        setDirectMessages(false);
        setGroupMessages(true);
    }

    function showChatsMenu(){
        setFriendsMenu(false);
        setChatsMenu(true);
        setMarketplaceMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(false);
    }

    function showFriendstMenu(){
        setChatsMenu(false);
        setFriendsMenu(true);
        setMarketplaceMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(false);
    }

    function showMarketplaceMenu(){
        setMarketplaceMenu(true);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(false);
    }

    function showSettingsMenu(){
        setMarketplaceMenu(false);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(true);
        setGroupsMenu(false);
        setProfileMenu(false);
    }

    function showGroupsMenu(){
        setMarketplaceMenu(false);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(true);
        setProfileMenu(false);
    }

    function showProfileMenu(){
        setMarketplaceMenu(false);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
        setProfileMenu(true);
    }

return (
    <div className='dashboard-conatiner'>
        <div className="flex h-screen bg-background text-foreground">
            <div className="flex flex-col h-screen bg-background border-r border-border  button-column">
                <div onClick={showChatsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <div className="relative">
                        <img src="https://placehold.co/40x40" alt="Inbox" className="w-8 h-8" />
                        <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">8</span>
                    </div>
                </div>
                <div onClick={showGroupsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/40x40" alt="Search" className="w-8 h-8" />
                </div>
                <div onClick={showFriendstMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/40x40" alt="Messages" className="w-8 h-8" />
                </div>
                <div onClick={showMarketplaceMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/40x40" alt="Users" className="w-8 h-8" />
                </div>
                <div onClick={showSettingsMenu} className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/40x40" alt="Settings" className="w-8 h-8" />
                </div>
                <div onClick={showProfileMenu} className="flex items-center justify-center mt-auto mb-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/50x50" alt="Profile" className="w-15 h-15 rounded-full" />
                </div>
            </div>
            {chatsMenu && <Chats showDirectMessages={showDirectMessages}/>}
            {groupsMenu && <GroupChats showGroupMessages={showGroupMessages}/>}
            {friendsMenu && <Friends/>}
            {marketplaceMenu && <Marketplace/>}
            {settingsMenu && <Settings/>}
            {profileMenu && <Profile/>}
            <div className="flex-1 p-0 messages-column" style={{backgroundColor:'red', height:'100vh'}}>
                {directMessages && <DirectChat/>} 
                {groupMessages && <GroupChat/>}  
            </div>
        </div>
    </div>
)
}
