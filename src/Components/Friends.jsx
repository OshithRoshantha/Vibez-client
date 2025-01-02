import { useState } from 'react';
import './Styles/Column2.css'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import GlobalAlert from './GlobalAlert';
import { searchPeople } from '../Services/FriendshipService'
import { fetchPeopleMetaData } from '../Services/ProfileService'
import SearchResult from './SearchResult';

export default function Friends({darkMode}) {
    const[friendRequests, setFriendRequests] = useState(true);
    const[yourFriends, setYourFriends] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [unfriendPopup, setUnfriendPopup] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [results, setResults] = useState();
    const [isResultsEmpty, setIsResultsEmpty] = useState(true);
    var friendCount = 56;
    var user="testUser";
    var about = "this is test about" 

    function hideFriendRequests() {
        setFriendRequests(true);
        setYourFriends(false);
        setShowResults(false);
    }

    function hideYourFriends() {
        setYourFriends(true);
        setFriendRequests(false);
        setShowResults(false);
    }

    function toggleBlockPopup(){
        setBlockPopup(!blockPopup);
    }
    
    function toggleUnfriendPopup(){
        setUnfriendPopup(!unfriendPopup);
    }

    const handleSearchChange =  (e) => {
        setSearchKeyword(e.target.value);
        setShowResults(false);
        setYourFriends(false);
        setFriendRequests(true);
        if (e.target.value.length > 0){
            setShowResults(true);
            setFriendRequests(false);
            setYourFriends(false);
            getSearchedResults();
        }
    }

    const getSearchedResults = async () => {
        const loggedInUserId = localStorage.getItem('userId');
        const response = await searchPeople(searchKeyword); 
        if(response.length > 0){
            setIsResultsEmpty(false);
        }
        else {
            setIsResultsEmpty(true);
        }
        const filteredResponse = response.filter((userId) => userId !== loggedInUserId);
        const metadataPromises = filteredResponse.map((userId) => fetchPeopleMetaData(userId));
        const metadataResults = await Promise.all(metadataPromises); 
        setResults(metadataResults); 
    };

  return (
    <div>
        {blockPopup && <GlobalAlert darkMode={darkMode} text={`Block ${user}?`} textOP={'Blocked contacts will no longer be able to send you messages.'} button1={'Cancel'} button2={'Block'} btn1Function={toggleBlockPopup} btn2Function={toggleBlockPopup}/>}
        {unfriendPopup && <GlobalAlert darkMode={darkMode} text={`Remove ${user}?`} textOP={'Removing this contact will remove them from your friends list.'} button1={'Cancel'} button2={'Remove'} btn1Function={toggleUnfriendPopup} btn2Function={toggleUnfriendPopup} />}
        <div className={`${darkMode ? 'border-gray-600 border-r border-border':'border-r border-border'}  p-4 friends-column`} style={{backgroundColor: darkMode ? '#262729' : '', height:'100vh'}}>
                <h2 className={`${darkMode ? 'text-white' :'text-black'} text-lg font-semibold column-header`}>Friends</h2>
                <input type="text" placeholder="Search people by name or email" value={searchKeyword} onChange={handleSearchChange} className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `} style={{borderRadius:'20px'}} />
                <i className={`${darkMode ? 'text-[#abacae]':'text-gray-500'} bi absolute text-2xl bi-search`} style={{marginLeft:'-3%', marginTop:'0.2%'}}></i>
                <div className="flex space-x-2 mb-4">
                    <button onClick={hideYourFriends} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Your Friends</button>
                    <button onClick={hideFriendRequests} className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]':'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}>Friend Requests</button>
                </div>
                {friendRequests && <div>
                <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>Friend requests</h2>
                <div className='friends-list'>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-border py-2">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" className="rounded-full mr-2 w-55 h-55" />
                        <div>
                            <p className={`${darkMode ? 'text-white':''} font-medium`}>{user}</p>
                            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>About</p>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <button className="bg-primary text-primary-foreground px-3 py-1 mr-2 rounded">Confirm</button>
                        <button className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'} border-none px-3 py-1 rounded`}>Delete</button>
                    </div>
                    </div>
                </div>
                </div>
                </div>}

                {showResults && <div>
                <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>People</h2>
                <div className='friends-list'>
                <div className="space-y-4">
                    {!isResultsEmpty && 
                        results.map((result) => (
                            <SearchResult
                                darkMode={darkMode}
                                key={result.userId} 
                                profileName={result.userName}
                                profileAbout={result.about}
                                profileImage={result.profilePicture}
                                profileId={result.userId}
                            />
                        ))
                    }
                    {isResultsEmpty && 
                        <div className="flex flex-col items-center justify-center" style={{marginTop:'23%'}}>
                        <img
                            aria-hidden="true"
                            alt="document-icon"
                            src="https://openui.fly.dev/openui/100x100.svg?text=📄"
                        />
                        <h2 className={`${darkMode ? 'text-white' : ''} mt-4 text-lg font-semibold`}>
                            We couldn't find anything to show for
                        </h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} mt-2 font-bold`} >{searchKeyword}</p>
                        </div>
                    }
                </div>
                </div>
                </div>}

                {yourFriends && <div>
                <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>{friendCount} friends</h2>
                <div className='friends-list'>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-border py-2">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" className="rounded-full mr-2" />
                        <div>
                            <p className={`${darkMode ? 'text-white':''} font-medium`}>{user}</p>
                            <p className={`${darkMode ? 'text-gray-400':'text-muted-foreground'} text-sm `}>About</p>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <div className='ml-mr-4 btns'><i className="bi bi-chat-fill text-primary"></i></div>
                        <Popover>
                        <PopoverTrigger asChild>
                            <div className='btns'><i className={`${darkMode ? 'text-white':''} bi bi-three-dots-vertical`}></i></div>
                        </PopoverTrigger>
                        <PopoverContent style={{width: '220px', marginRight: '200px', height: '105px' ,backgroundColor: darkMode ? '#262729' : ''}}>	
                        <div className="bg-card text-card-foreground p-0 rounded-lg ">
                            <div className="flex-grow friend-buttons" style={{marginLeft:'-20px', marginTop:'-17px',backgroundColor: darkMode ? '#262729' : ''}}>
                                <button onClick={toggleBlockPopup} className="flex flex-grow items-center w-full p-2 text-left rounded bg-transparent text-black border-none focus:ring-0 hover:border-none">
                                    <span className="material-icons" style={{display:'flex', justifyContent:'center',alignItems:'center',backgroundColor: darkMode ? '#3b3c3e':'#d1d1d1', width:'29px', height:'29px', borderRadius:'50%'}}><i className={`${darkMode ? 'text-white':''} bi bi-person-fill-slash`} ></i></span>
                                    <span className={`${darkMode ? 'text-white':''} ml-2`}>Block {user}</span>
                                </button>
                                <button onClick={toggleUnfriendPopup} className="flex flex-grow items-center w-full p-2 text-left rounded bg-transparent text-black border-none focus:ring-0 hover:border-none">
                                    <span className="material-icons" style={{display:'flex', justifyContent:'center',alignItems:'center',backgroundColor: darkMode ? '#3b3c3e':'#d1d1d1', width:'29px', height:'29px', borderRadius:'50%'}}><i className={`${darkMode ? 'text-white':''} bi bi-person-fill-x`} ></i></span>
                                    <span className={`${darkMode ? 'text-white':''} ml-2`}>Unfriend {user}</span>
                                </button>
                            </div>
                        </div>
                        </PopoverContent>
                        </Popover>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>}
            </div>
    </div>
  )
}
