import './Styles/Column2.css'

export default function Chats({showDirectMessages, darkMode}) {
  return (
    <div>
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  p-4 chats-column`} style={{backgroundColor: darkMode ? '#262729' : '', height:'100vh'}}>
                <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Chats</h2>
                <input type="text" placeholder="Search friends" className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `} style={{borderRadius:'20px'}} />
                <i className={`${darkMode ? 'text-[#abacae]':'text-gray-500'} bi absolute text-2xl bi-search`} style={{marginLeft:'-3%', marginTop:'0.2%'}}></i>
                <div className="flex space-x-2 mb-4">
                    <button className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`} >All</button>
                    <button className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Unread</button>
                    <button className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Favorites</button>
                </div>
                <div className='chat-list'>
                <div onClick={showDirectMessages} className="space-y-2" style={{cursor: 'pointer'}}>
                    <div className={`${darkMode ? 'hover:bg-[#2d3243]' : 'hover:bg-muted'} flex items-center p-2 rounded`}>
                        <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2 w-18 h-18" />
                        <div>
                            <div className={`${darkMode ? 'text-white':''} font-medium`}>FriendName</div>
                            <div className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>User1: Lorem ipsum dolor sit amet.</div>
                        </div>
                        <span className={`${darkMode ? 'text-gray-400':''} ml-auto text-xs`}>13:14</span>
                    </div>
                </div>
                </div>
            </div>
    </div>
  )
}


