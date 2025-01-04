import { useState, useRef, useEffect } from 'react';
import './Styles/Column2.css';
import GlobalAlert from './GlobalAlert';
import { searchPeople, getConnectedProfileInfo } from '../Services/FriendshipService';
import { fetchPeopleMetaData } from '../Services/ProfileService';
import SearchResult from './SearchResult';
import PreviewPendingRequests from './PreviewPendingRequests';
import PreiviewAcceptedRequests from './PreiviewAcceptedRequests';

export default function Friends({ darkMode }) {
    const [friendRequests, setFriendRequests] = useState(true);
    const [yourFriends, setYourFriends] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [unfriendPopup, setUnfriendPopup] = useState(false);
    const inputRef = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [isResultsEmpty, setIsResultsEmpty] = useState(false);
    const [pendingProfiles, setPendingProfiles] = useState([]);
    const [acceptedProfiles, setAcceptedProfiles] = useState([]);
    var friendCount = 56;
    var requestsCount = 3;
    var user = "testUser";
    var about = "this is test about";

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

    function toggleBlockPopup() {
        setBlockPopup(!blockPopup);
    }

    function toggleUnfriendPopup() {
        setUnfriendPopup(!unfriendPopup);
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

    useEffect(() => {
        const fetchData = async () => {
            setPendingProfiles([]);
            setAcceptedProfiles([]);
            let linkedProfiles = JSON.parse(sessionStorage.getItem('linkedProfiles'));
            if (linkedProfiles && linkedProfiles.length !== 0) {
                for (let friendshipId of linkedProfiles){
                    const profileInfo = await getConnectedProfileInfo(friendshipId);
                    if (profileInfo.status === "PENDING") {
                        setPendingProfiles((prevProfiles) => [...prevProfiles, profileInfo]);
                    } else if (profileInfo.status === "ACCEPTED") {
                        setAcceptedProfiles((prevProfiles) => [...prevProfiles, profileInfo]);
                    }
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {blockPopup && (
                <GlobalAlert
                    darkMode={darkMode}
                    text={`Block ${user}?`}
                    textOP={'Blocked contacts will no longer be able to send you messages.'}
                    button1={'Cancel'}
                    button2={'Block'}
                    btn1Function={toggleBlockPopup}
                    btn2Function={toggleBlockPopup}
                />
            )}
            {unfriendPopup && (
                <GlobalAlert
                    darkMode={darkMode}
                    text={`Remove ${user}?`}
                    textOP={'Removing this contact will remove them from your friends list.'}
                    button1={'Cancel'}
                    button2={'Remove'}
                    btn1Function={toggleUnfriendPopup}
                    btn2Function={toggleUnfriendPopup}
                />
            )}
            <div
                className={`${darkMode ? 'border-gray-600 border-r border-border' : 'border-r border-border'}  p-4 friends-column`}
                style={{ backgroundColor: darkMode ? '#262729' : '', height: '100vh' }}
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
                    className={`${darkMode ? 'text-[#abacae]' : 'text-gray-500'} bi absolute text-2xl bi-search`}
                    style={{ marginLeft: '-3%', marginTop: '0.2%' }}
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
                {friendRequests && (
                    <div>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>{requestsCount} Pending requests</h2>
                        <div className="friends-list">
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
                        <div className="friends-list">
                            <div className="space-y-4">
                                {isResultsEmpty && (
                                    <div className="flex flex-col items-center justify-center" style={{ marginTop: '20%' }}>
                                        <img
                                            aria-hidden="true"
                                            alt="document-icon"
                                            src="./src/assets/Icons/errorIcon1.png"
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
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {yourFriends && (
                    <div>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-lg font-semibold mb-2`}>{friendCount} friends</h2>
                        <div className="friends-list">
                            <div className="space-y-4">
                               {
                                acceptedProfiles.map(profile => (
                                    <PreiviewAcceptedRequests
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
            </div>
        </div>
    );
}
