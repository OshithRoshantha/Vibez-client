import { useState } from 'react';
import './Styles/Column2.css'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

export default function Friends() {
    const[friendRequests, setFriendRequests] = useState(true);
    const[yourFriends, setYourFriends] = useState(false);
    const[enablePopup, setEnablePopup] = useState(false);
    var friendCount = 56;

    function handleFriendRequests() {
        setFriendRequests(!friendRequests);
        setYourFriends(false);
    }

    function handleYourFriends() {
        setYourFriends(!yourFriends);
        setFriendRequests(false);
    }

    function handlePopup() {
        setEnablePopup(!enablePopup);
    }

  return (
    <div>
        <div className="border-r border-border p-4 friends-column">
                <h2 className="text-lg font-semibold column-header">Friends</h2>
                <input type="text" placeholder="Search" className="w-full p-2 border border-border rounded mb-4" />
                <div className="flex space-x-2 mb-4">
                    <button onClick={handleYourFriends} className="bg-muted text-muted-foreground px-4 py-2 rounded-full hover:bg-muted/80">Your Friends</button>
                    <button onClick={handleFriendRequests} className="bg-muted text-muted-foreground px-4 py-2 rounded-full hover:bg-muted/80">Friend Requests</button>
                </div>
                {friendRequests && <div>
                <h3 className="text-md font-semibold mt-4">Friend requests</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border py-2">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-25 h-25" />
                        <div>
                            <p className="font-medium">Oshith Roshantha Edirisuriya</p>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <button className="bg-primary text-primary-foreground px-3 py-1 mr-2 rounded">Confirm</button>
                        <button className="btn px-3 py-1 btn-outline-danger rounded">Delete</button>
                    </div>
                    </div>
                </div>
                </div>}
                {yourFriends && <div>
                <h3 className="text-md font-semibold mt-4">{friendCount} friends</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border py-2">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-25 h-25" />
                        <div>
                            <p className="font-medium">Oshith Roshantha Edirisuriya</p>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <div className='ml-mr-4 btns'><i className="bi bi-chat-left-dots-fill"></i></div>
                        <Popover>
                        <PopoverTrigger asChild>
                            <div className='btns'><i className="bi bi-three-dots-vertical"></i></div>
                        </PopoverTrigger>
                        <PopoverContent style={{width: '250px', marginRight: '200px'}}>	

                        </PopoverContent>
                        </Popover>
                    </div>
                </div>
                    </div>
                </div>}
            </div>
    </div>
  )
}
