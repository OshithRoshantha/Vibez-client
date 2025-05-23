import { useState, useRef, useEffect } from 'react';
import './Styles/Column2.css';
import { searchPeople } from '../Services/FriendshipService';
import { fetchPeopleMetaData } from '../Services/ProfileService';
import SearchResult from './SearchResult';
import PreviewPendingRequests from './PreviewPendingRequests';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from '../Context/WebSocketContext';
import PreviewAcceptedRequests from './PreviewAcceptedRequests';
import { useIsMobile } from '../hooks/useIsMobile';
import errDark from '@/assets/Icons/searchErdark.png';
import errLight from '@/assets/Icons/searchEr.png';
import { useGlobalStore } from '../States/UseStore';

export default function Friends({darkMode, setPendingRequests, showDirectMessages, setReceiverId, setShowMobileRight}) {

    const isMobile = useIsMobile();
    const { messages } = useWebSocket();
    const [processedMessages, setProcessedMessages] = useState([]);
    const { pendingProfiles, acceptedProfiles, loadingFriendships } = useGlobalStore();

    const [friendRequests, setFriendRequests] = useState(true);
    const [yourFriends, setYourFriends] = useState(false);
    const inputRef = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [isResultsEmpty, setIsResultsEmpty] = useState(false);
    const prevPendingCountRef = useRef(0);

    const handleIconClick = () => {
        if (searchKeyword !== '') {
          setSearchKeyword(''); 
          setShowResults(false);
          setYourFriends(true);
        }
    };

    useEffect(() => {
        const currentPendingCount = pendingProfiles.length;
        const prevPendingCount = prevPendingCountRef.current;
        if (currentPendingCount !== prevPendingCount) {
            setPendingRequests(currentPendingCount);
            prevPendingCountRef.current = currentPendingCount;
        }
    }, [pendingProfiles, setPendingRequests]);

    useEffect(() => {
        const handleMessages = async () => {
            if (messages.length === 0) {
                return;
            }
            const newMessages = messages.filter(message => !processedMessages.includes(message.id));
            if (newMessages.length === 0) {
                return; 
            }
            for (const lastMessage of newMessages) {
                switch (lastMessage.action) {
                    case 'friendshipService': {
                        if (lastMessage.status === 'PENDING' || lastMessage.status === 'ACCEPTED') {
                            if(lastMessage.status === 'ACCEPTED' && showResults) {
                                setShowResults(false);
                                setYourFriends(true);
                            }
                        } 
                        break;      
                    }
                    default:
                        break;
                }
            }
            setProcessedMessages(prevProcessedMessages => [
                ...prevProcessedMessages,
                ...newMessages.map(message => message.id),
            ]);
        };
        handleMessages();
    }, [messages, processedMessages]); 
    

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

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchKeyword(value); 
        if (value.length > 0) {
            setShowResults(true);
            setFriendRequests(false);
            setYourFriends(false);
            getSearchedResults(value);
        } else {
            setShowResults(false);
            setYourFriends(false);
            setFriendRequests(true);
        }
    };

    const getSearchedResults = async (keyword) => {
        const loggedInUserId = sessionStorage.getItem('userId');
        const response = await searchPeople(keyword);
        if (response.length > 0) {
            setIsResultsEmpty(false);
            const filteredResponse = response.filter((userId) => userId !== loggedInUserId);
            const metadataPromises = filteredResponse.map((userId) => fetchPeopleMetaData(userId));
            const metadataResults = await Promise.all(metadataPromises);
            setResults(metadataResults);
            if(metadataResults.length === 0) {
                setIsResultsEmpty(true);
            }
        } else {
            setIsResultsEmpty(true);
        }
    };

    return (
        <div>
            <div
                className={`${darkMode ? 'border-gray-600 border-r border-border' : 'border-r border-border'}  p-4 friends-column`}
                style={{ backgroundColor: darkMode ? '#262729' : '', height: isMobile ? '90vh' : '100vh' , width: isMobile ? '100vw' : ''}}
            >
                <h2 className={`${darkMode ? 'text-white' : 'text-black'} text-lg font-semibold column-header`}>Friends</h2>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search people by name or email"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className={`${darkMode ? 'bg-[#3c3d3f] placeholder:text-[#abacae] text-white' : 'bg-gray-200'} w-full px-4 py-2 mb-4 focus:outline-none focus:border-none placeholder:text-gray-500  text-gray-500 `}
                    style={{ borderRadius: '20px' }}
                />
                <i
                        className={`${
                        darkMode ? 'text-[#abacae]' : 'text-gray-500'
                        } bi cursor-pointer absolute text-2xl ${
                        searchKeyword === '' ? 'bi-search' : 'bi-x-circle-fill'
                        }`}
                        style={{ marginLeft: isMobile ? '-10%' : '-3%', marginTop: isMobile ? '0.5%': '0.2%' }}
                        onClick={handleIconClick}
                ></i>
                <div className="flex space-x-2 mb-4">
                    <button
                        onClick={hideYourFriends}
                        className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]' : 'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}
                    >
                        Your Friends
                    </button>
                    <button
                        onClick={hideFriendRequests}
                        className={`${darkMode ? 'bg-[#223b51] text-[#59abff] hover:bg-[#184e88]' : 'bg-gray-300 text-gray-600  hover:bg-gray-200'} px-4 py-2 rounded-full border-none`}
                    >
                        Friend Requests
                    </button>
                </div>
                {friendRequests && loadingFriendships && ( 
                    <div>
                    <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>{pendingProfiles.length} Pending requests</h2>
                    <div className="friends-list skeleton-container" style={{height: isMobile ? '53vh' : ''}} >
                        <div className='mb-3' style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] " />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>  
                        </div> 
                        <div className='mb-3' style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>  
                        </div> 
                        <div className='mb-3' style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>  
                        </div>                     
                    </div>
                    </div>                    
                )}
                {friendRequests && !loadingFriendships && (
                    <div>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>{pendingProfiles.length} Pending requests</h2>
                        <div className="friends-list" style={{height: isMobile ? '53vh' : ''}}>
                            <div className="space-y-4">
                                {
                                pendingProfiles.map(profile => (
                                    <PreviewPendingRequests
                                    key={profile.friendshipId} 
                                    darkMode={darkMode}
                                    friendshipId={profile.friendshipId}
                                    profileId={profile.profileId}
                                    profileName={profile.profileName}
                                    profilePicture={profile.profilePicture}
                                    status={profile.status}
                                    profileAbout={profile.profileAbout}
                                    />
                                ))
                                }
                            </div>
                        </div>
                    </div>
                )}

                {showResults && (
                    <div>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>People</h2>
                        <div className="friends-list" style={{height: isMobile ? '53vh' : ''}}>
                            <div className="space-y-4">
                                {isResultsEmpty && (
                                    <div className="flex flex-col items-center justify-center" style={{ marginTop: '20%' }}>
                                        <img
                                            aria-hidden="true"
                                            alt="document-icon"
                                            src={`${darkMode ? errDark : errLight}`}
                                            style={{ height: '125px', width: '125px' }}
                                        />
                                        <h2 className={`${darkMode ? 'text-white' : ''} mt-4 text-lg font-semibold`}>
                                            We couldn't find anything to show for
                                        </h2>
                                        <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} mt-2 font-bold`}>{searchKeyword}</p>
                                    </div>
                                )}
                                {!isResultsEmpty && (
                                    results.map((result) => (
                                        <SearchResult
                                        darkMode={darkMode}
                                        key={result.userId} 
                                        profileName={result.userName}
                                        profileAbout={result.about}
                                        profileImage={result.profilePicture}
                                        profileId={result.userId}
                                        showDirectMessages={showDirectMessages}
                                        setReceiverId={setReceiverId}
                                        setShowMobileRight={setShowMobileRight}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {yourFriends && loadingFriendships && ( 
                    <div>
                    <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>{acceptedProfiles.length} friends</h2>
                    <div className="friends-list skeleton-container" style={{height: isMobile ? '53vh' : ''}}>
                        <div className='mb-3' style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] " />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>  
                        </div> 
                        <div className='mb-3' style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>  
                        </div> 
                        <div className='mb-3' style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>  
                        </div>                     
                    </div>
                    </div>                    
                )}
                {yourFriends && !loadingFriendships && (
                    <div>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>{acceptedProfiles.length} friends</h2>
                        <div className="friends-list" style={{height: isMobile ? '53vh' : ''}}>
                            <div className="space-y-4">
                               {
                                acceptedProfiles.map(profile => (
                                    <PreviewAcceptedRequests
                                        key={profile.friendshipId} 
                                        darkMode={darkMode}
                                        friendshipId={profile.friendshipId}
                                        profileName={profile.profileName}
                                        profilePicture={profile.profilePicture}
                                        profileAbout={profile.profileAbout}
                                        showDirectMessages={showDirectMessages}
                                        setReceiverId={setReceiverId}
                                        friendId={profile.profileId} 
                                        setShowMobileRight={setShowMobileRight}
                                    />
                                ))
                                }                            
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
