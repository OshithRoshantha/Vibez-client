import Chats from '@/Components/Chats';
import './Styles/Dashboard.css'
import { useState } from 'react';
import Friends from '@/Components/Friends';
import Marketplace from '@/Components/Marketplace';
import Settings from '@/Components/Settings';
import GroupChats from '@/Components/GroupChats';

export default function Dashboard() {
    const [friendsMenu, setFriendsMenu] = useState(false);
    const [chatsMenu, setChatsMenu] = useState(true);
    const [groupsMenu, setGroupsMenu] = useState(false);
    const [marketplaceMenu, setMarketplaceMenu] = useState(false);
    const [settingsMenu, setSettingsMenu] = useState(false);

    function showChatsMenu(){
        setFriendsMenu(false);
        setChatsMenu(true);
        setMarketplaceMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
    }

    function showFriendstMenu(){
        setChatsMenu(false);
        setFriendsMenu(true);
        setMarketplaceMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
    }

    function showMarketplaceMenu(){
        setMarketplaceMenu(true);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(false);
    }

    function showSettingsMenu(){
        setMarketplaceMenu(false);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(true);
        setGroupsMenu(false);
    }

    function showGroupsMenu(){
        setMarketplaceMenu(false);
        setChatsMenu(false);
        setFriendsMenu(false);
        setSettingsMenu(false);
        setGroupsMenu(true);
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
                <div className="flex items-center justify-center mt-auto mb-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/50x50" alt="Profile" className="w-15 h-15 rounded-full" />
                </div>
            </div>
            {chatsMenu && <Chats/>}
            {groupsMenu && <GroupChats/>}
            {friendsMenu && <Friends/>}
            {marketplaceMenu && <Marketplace/>}
            {settingsMenu && <Settings/>}
            <div className="flex-1 p-4 messages-column">
                <div className="flex items-center mb-4">
                    <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2" />
                    <div>
                        <div className="font-medium">User2</div>
                        <div className="text-sm text-muted-foreground">last seen yesterday at 18:12</div>
                    </div>
                </div>
                <div className="bg-card p-4 rounded-lg space-y-2"></div>
                <div className="mt-4">
                    <input type="text" placeholder="Type a message" className="w-full p-2 border border-border rounded" />
                </div>
            </div>
        </div>
    </div>
)
}
