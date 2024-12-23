import React from 'react'
import './Styles/Column2.css'

export default function GroupChats() {
  return (
    <div>
    <div>
        <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold column-header">Groups</h2>
                <input type="text" placeholder="Search" className="w-full p-2 border border-border rounded mb-4" />
                <div className="flex space-x-2 mb-4">
                    <button className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">Your groups</button>
                    <button className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">+</button>
                </div>
                <div className="space-y-2" style={{cursor: 'pointer'}}>
                    <div className="flex items-center p-2 hover:bg-muted rounded">
                        <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2 w-18 h-18" />
                        <div>
                            <div className="font-medium">GroupName</div>
                            <div className="text-sm text-muted-foreground">User1: Lorem ipsum dolor sit amet.</div>
                        </div>
                        <span className="ml-auto text-xs">13:14</span>
                    </div>
                </div>
            </div>
    </div>
    </div>
  )
}
