import React from 'react'
import './Styles/Dashboard.css'

export default function Dashboard() {
return (
    <div className='dashboard-conatiner'>
        <div className="flex h-screen bg-background text-foreground">
            <div className="flex flex-col h-screen bg-background border-r border-border  button-column">
                <div className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <div className="relative">
                        <img src="https://placehold.co/40x40" alt="Inbox" className="w-8 h-8" />
                        <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">8</span>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/40x40" alt="Search" className="w-8 h-8" />
                </div>
                <div className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/40x40" alt="Messages" className="w-8 h-8" />
                </div>
                <div className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/40x40" alt="Users" className="w-8 h-8" />
                </div>
                <div className="flex items-center justify-center mt-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/40x40" alt="Settings" className="w-8 h-8" />
                </div>
                <div className="flex items-center justify-center mt-auto mb-4" style={{cursor: 'pointer'}}>
                    <img src="https://placehold.co/50x50" alt="Profile" className="w-15 h-15 rounded-full" />
                </div>
            </div>
            <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold">Chats</h2>
                <input type="text" placeholder="Search" className="w-full p-2 border border-border rounded mb-4" />
                <div className="flex space-x-2 mb-4">
                    <button className="bg-accent text-accent-foreground px-4 py-2 rounded-full">All</button>
                    <button className="bg-muted text-muted-foreground px-4 py-2 rounded-full hover:bg-muted/80">Unread</button>
                    <button className="bg-muted text-muted-foreground px-4 py-2 rounded-full hover:bg-muted/80">Favorites</button>
                    <button className="bg-muted text-muted-foreground px-4 py-2 rounded-full hover:bg-muted/80">Groups</button>
                </div>
                <div className="space-y-2" style={{cursor: 'pointer'}}>
                    <div className="flex items-center p-2 hover:bg-muted rounded">
                        <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2" />
                        <div>
                            <div className="font-medium">GroupName</div>
                            <div className="text-sm text-muted-foreground">User1: Lorem ipsum dolor sit amet.</div>
                        </div>
                        <span className="ml-auto text-xs">13:14</span>
                    </div>
                </div>
            </div>
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
