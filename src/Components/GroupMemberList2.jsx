import { useState } from 'react';
import GlobalAlert from './GlobalAlert';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from '../Context/WebSocketContext';

export default function GroupMemberList2({ darkMode, members, groupName, loading, creator, groupId, removedFromGroup }) {

  const [exitGroupPopup, setExitGroupPopup] = useState(false);
  const currentUserId = sessionStorage.getItem('userId');
  const { removeMembers } = useWebSocket();

  function toggleExitGroupPopup() {
    setExitGroupPopup(!exitGroupPopup);
  }
 
  const removeMemberFromGroup = async () => {
    await removeMembers(groupId, [currentUserId]);
  } 
  
  const handleGroupExit = () => {
    toggleExitGroupPopup();
    removeMemberFromGroup();
  }

  const currentUser = members.find(member => member.userId === currentUserId);
  const otherMembers = members.filter(member => member.userId !== currentUserId);

  return (
    <div className="mt-0">
      {exitGroupPopup && (
        <GlobalAlert darkMode={darkMode} text={`Exit "${groupName}" group?`} textOP={''} button1={'Cancel'} button2={'Exit group'} btn1Function={toggleExitGroupPopup} btn2Function={handleGroupExit}/>
      )}
      {loading ? (
        <>
          <div className="flex items-center mb-3">
            <Skeleton className="w-9 h-9 rounded-full bg-gray-300 mr-2" />
            <div>
              <Skeleton className="h-4 w-[80px] mb-1" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
            <Skeleton className="ml-auto h-6 w-[90px] rounded" />
          </div>

          <div className="flex items-center mb-3">
            <Skeleton className="w-9 h-9 rounded-full bg-gray-300 mr-2" />
            <div>
              <Skeleton className="h-4 w-[80px] mb-1" />
              <Skeleton className="h-3 w-[120px]" />
            </div>
            <Skeleton className="ml-auto h-3 w-[70px]" />
          </div>

          <div className="flex items-center mb-2">
            <Skeleton className="w-9 h-9 rounded-full bg-gray-300 mr-2" />
            <div>
              <Skeleton className="h-4 w-[80px] mb-1" />
              <Skeleton className="h-3 w-[120px]" />
            </div>
            <Skeleton className="ml-auto h-3 w-[70px]" />
          </div>        
        </>
      ) : (
        <>
          {currentUser && (
            <div className="flex items-center mb-2">
              <div
                className="w-8 h-8 rounded-full mr-2"
                style={{
                  backgroundImage: `url(${currentUser.profilePicture})`,
                  backgroundSize: 'cover',
                }}
              ></div>          
              <div>
                <span className={`${darkMode ? 'text-white' : ''} font-semibold`}>You</span>
                <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}>
                  {currentUser.about}
                </p>
              </div>
              <button
                disabled={removedFromGroup}
                onClick={toggleExitGroupPopup}
                className="ml-auto text-sm bg-red-400 text-white hover:bg-red-300 border-none"
              >
                Exit group
              </button>
            </div>
          )}

          {otherMembers.map((member) => (
            <div key={member.userId} className="flex items-center mb-2">
              <div
                className="w-8 h-8 rounded-full mr-2"
                style={{
                  backgroundImage: `url(${member.profilePicture})`,
                  backgroundSize: 'cover',
                }}
              ></div> 
              <div>
                <span className={`${darkMode ? 'text-white' : ''} font-semibold`}>{member.userName}</span>
                <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}>
                  {member.about}
                </p>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm ml-auto`}>
                {creator === member.userId ? 'Owner' : ''}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
