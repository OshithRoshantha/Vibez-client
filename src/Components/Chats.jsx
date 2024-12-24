import './Styles/Column2.css'

export default function Chats({showDirectMessages}) {
  return (
    <div>
        <div className="border-r border-border p-4 chats-column">
                <h2 className="text-lg font-semibold column-header">Chats</h2>
                <input type="text" placeholder="Search" className="placeholder:text-gray-500 bg-gray-200 text-gray-500 w-full px-4 py-2 mb-4 focus:outline-none focus:border-none" style={{borderRadius:'20px'}} />
                <i className="bi text-gray-500 absolute text-2xl bi-search" style={{marginLeft:'-3%', marginTop:'0.2%'}}></i>
                <div className="flex space-x-2 mb-4">
                    <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full border-none hover:bg-gray-300">All</button>
                    <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full border-none hover:bg-gray-300">Unread</button>
                    <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full border-none hover:bg-gray-300">Favorites</button>
                </div>
                <div className='chat-list'>
                <div onClick={showDirectMessages}  className="space-y-2" style={{cursor: 'pointer'}}>
                    <div className="flex items-center p-2 hover:bg-muted rounded">
                        <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2 w-18 h-18" />
                        <div>
                            <div className="font-medium">FriendName</div>
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
