import { useState } from 'react';
import './Styles/Column2.css'

export default function GroupChats() {
    const [addMembersMenu, setAddMembersMenu] = useState(false);
    const [groupChats, setGroupChats] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddClick = () => {
      setIsAdded(true);
    };

    const handleRemoveClick = () => {
        setIsAdded(false);
      };

    function showAddMembersMenu(){
        setAddMembersMenu(true);
        setGroupChats(false);
    }

    function hideAddMembersMenu(){
        setAddMembersMenu(false);
        setGroupChats(true);
    }

    function showGroupChats(){
        setGroupChats(true);
        setAddMembersMenu(false);
    }

    var user = "testUser";

  return (
    <div>
    <div>
        <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold column-header">Groups</h2>
                <input type="text" placeholder="Search" className="w-full p-2 border border-border rounded mb-4" />
                <div className="flex space-x-2 mb-4">
                    <button onClick={showGroupChats} className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300">Your groups</button>
                    <button onClick={showAddMembersMenu} className="bg-muted text-muted-foreground px-4 py-2 rounded-full border-none hover:bg-gray-300"><i className="bi bi-plus-lg"></i></button>
                </div>
                <div className='chat-list'>
                {addMembersMenu && <div>
                    <h2 className="text-lg font-semibold mb-2">Add group members</h2>
                    <div className='group-op'>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border py-2">
                        <div className="flex items-center">
                            <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
                            <div>
                                <p className="font-medium">{user}</p>
                                <p className="text-muted-foreground text-sm">About</p>
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button
                                  className={`px-3 py-1 mr-2 rounded text-primary-foreground ${isAdded ? "bg-blue-300" : "bg-primary"}`}
                                onClick={handleAddClick}
                                disabled={isAdded}
                            >
                                {isAdded ? "Added" : "Add"}
                            </button>
                            {isAdded &&
                            <button
                                className="px-3 py-1 rounded bg-muted text-muted-foreground border-none hover:bg-gray-300"
                                onClick={handleRemoveClick}
                            >
                                Remove
                            </button>}
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="flex items-center justify-center">
                    <button className="bg-primary text-white absolute" style={{cursor: 'pointer', borderRadius:'50%', height:'54px', width:'54px', marginTop:'80px'}} >
                        <i className="bi bi-arrow-right"></i>
                    </button>
                    </div>
                </div>}
                {groupChats && <div>
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
                </div>}
                </div>
            </div>
    </div>
    </div>
  )
}
