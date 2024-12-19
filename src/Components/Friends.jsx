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
    var friendCount = 56;
    var user="testUser";

    function hideFriendRequests() {
        setFriendRequests(true);
        setYourFriends(false);
    }

    function hideYourFriends() {
        setYourFriends(true);
        setFriendRequests(false);
    }

  return (
    <div>
        <div className="border-r border-border p-4 friends-column">
                <h2 className="text-lg font-semibold column-header">Friends</h2>
                <input type="text" placeholder="Search" className="w-full p-2 border border-border rounded mb-4" />
                <div className="flex space-x-2 mb-4">
                    <button onClick={hideYourFriends} className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">Your Friends</button>
                    <button onClick={hideFriendRequests} className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">Friend Requests</button>
                </div>
                {friendRequests && <div>
                <h3 className="text-md font-semibold mt-4">Friend requests</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border py-2">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
                        <div>
                            <p className="font-medium">{user}</p>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <button className="bg-primary text-primary-foreground px-3 py-1 mr-2 rounded">Confirm</button>
                        <button className="px-3 py-1 rounded bg-muted text-muted-foreground border-none hover:bg-gray-300">Delete</button>
                    </div>
                    </div>
                </div>
                </div>}
                {yourFriends && <div>
                <h3 className="text-md font-semibold mt-4">{friendCount} friends</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border py-2">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" className="rounded-full mr-2" />
                        <div>
                            <p className="font-medium">{user}</p>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <div className='ml-mr-4 btns'><i className="bi bi-messenger text-primary"></i></div>
                        <Popover>
                        <PopoverTrigger asChild>
                            <div className='btns'><i className="bi bi-three-dots-vertical"></i></div>
                        </PopoverTrigger>
                        <PopoverContent style={{width: '220px', marginRight: '200px', height: '150px'}}>	
                        <div className="bg-card text-card-foreground p-0 rounded-lg">
                            <div className="flex-grow friend-buttons" style={{marginLeft:'-20px', marginTop:'-17px'}}>
                                <button className="flex flex-grow items-center w-full p-2 text-left rounded bg-transparent text-black border-none focus:ring-0 hover:border-none">
                                    <span className="material-icons" style={{display:'flex', justifyContent:'center',alignItems:'center',backgroundColor:'#d1d1d1', width:'29px', height:'29px', borderRadius:'50%'}}><i className="bi bi-messenger"></i></span>
                                    <span className="ml-2">Message {user}</span>
                                </button>
                                <button className="flex flex-grow items-center w-full p-2 text-left rounded bg-transparent text-black border-none focus:ring-0 hover:border-none">
                                    <span className="material-icons" style={{display:'flex', justifyContent:'center',alignItems:'center',backgroundColor:'#d1d1d1', width:'29px', height:'29px', borderRadius:'50%'}}><i className="bi bi-person-fill-slash"></i></span>
                                    <span className="ml-2">Block {user}</span>
                                </button>
                                <button className="flex flex-grow items-center w-full p-2 text-left rounded bg-transparent text-black border-none focus:ring-0 hover:border-none">
                                    <span className="material-icons" style={{display:'flex', justifyContent:'center',alignItems:'center',backgroundColor:'#d1d1d1', width:'29px', height:'29px', borderRadius:'50%'}}><i className="bi bi-person-fill-x"></i></span>
                                    <span className="ml-2">Unfriend {user}</span>
                                </button>
                            </div>
                            </div>
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
