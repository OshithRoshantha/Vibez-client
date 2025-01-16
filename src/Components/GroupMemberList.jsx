import {useState} from 'react'
import GlobalAlert from './GlobalAlert';
import { Skeleton } from "@/components/ui/skeleton";
import { removeMembers } from '../Services/GroupsService';

export default function GroupMemberList({darkMode, members, groupName, loading, groupId}) {

  const userId = sessionStorage.getItem('userId');
  const [deleteGroupPopup, setDeleteGroupPopup] = useState(false);
  const [removeMemberPopup, setRemoveMemberPopup] = useState(false);
  const [member, setMember] = useState('');
  const [memberId, setMemberId] = useState([]);

  const removeMemberFromGroup = async () => {
    await removeMembers(groupId, memberId);
  }

  function toggleDeleteGroupPopup(memberName = ''){
    setMember(memberName);
    setDeleteGroupPopup(!deleteGroupPopup);
  }

  function toggleRemoveMemberPopup(memberName = ''){
    setMember(memberName);
    setRemoveMemberPopup(!removeMemberPopup);
  }

  const removeMember = async () => {
    toggleRemoveMemberPopup();
    await removeMemberFromGroup();
    setMemberId([]);
  }

  return (
    <div className="mt-0">
        {deleteGroupPopup && <GlobalAlert darkMode={darkMode} text={`Delete "${groupName}" group?`} textOP={'Deleting this group will remove it permanently for all members. '} button1={'Cancel'} button2={'Delete group'} btn1Function={toggleDeleteGroupPopup} btn2Function={toggleDeleteGroupPopup}/>}
        {removeMemberPopup && <GlobalAlert darkMode={darkMode} text={`Remove ${member} from "${groupName}" group?`} textOP={'This action cannot be undone. '} button1={'Cancel'} button2={'Remove'} btn1Function={toggleRemoveMemberPopup} btn2Function={removeMember}/>}
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
          members
            .sort((a, b) => (a.userId === userId ? -1 : b.userId === userId ? 1 : 0)) 
            .map(member =>
              member.userId === userId ? (
                <div key={member.userId} className="flex items-center mb-2">
                  <div
                    className="w-8 h-8 rounded-full mr-2"
                    style={{
                      backgroundImage: `url(${member.profilePicture})`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <div>
                    <span className={`${darkMode ? 'text-white' : ''} font-semibold`}>You</span>
                    <p
                      className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}
                    >
                      {member.about}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleDeleteGroupPopup(member.userName)}
                    className="ml-auto text-sm bg-red-400 text-white hover:bg-red-300 border-none"
                  >
                    Delete group
                  </button>
                </div>
              ) : (
                <div key={member.userId} className="flex items-center mb-2">
                  <div
                    className="w-8 h-8 rounded-full mr-2"
                    style={{
                      backgroundImage: `url(${member.profilePicture})`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <div>
                    <span className={`${darkMode ? 'text-white' : ''} font-semibold`}>
                      {member.userName}
                    </span>
                    <p
                      className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}
                    >
                      {member.about}
                    </p>
                  </div>
                  <button
                    onClick={() => {setMemberId((prevIds) => [...prevIds, member.userId]); toggleRemoveMemberPopup(member.userName);}}
                    className={`${
                      darkMode
                        ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]'
                        : 'bg-gray-300 text-gray-600 hover:bg-gray-200'
                    } border-none ml-auto text-sm`}
                  >
                    Remove
                  </button>
                </div>
              )
            )
        )}
    </div>
  )
}
