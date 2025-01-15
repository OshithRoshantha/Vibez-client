import {useState, useEffect} from 'react'
import { groupAddList } from '../Services/GroupsService';
import { Skeleton } from "@/components/ui/skeleton";

export default function GroupAddMembers({showAddMemberMenu, darkMode, groupId}) {

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAddMembersList = async () => {
        try{
            const response = await groupAddList(groupId);
            setMembers(response);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAddMembersList();
    }, []); 

  return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className={`${darkMode ? 'bg-[#262729]' : 'bg-card'} rounded-lg shadow-lg w-full max-w-md`}>
            <div className={`${darkMode ? 'text-white border-gray-700' : 'border-border'} px-4 flex py-3 border-b justify-between items-center`}>
                <h2 className="text-lg font-semibold">Add members</h2>
                <i onClick={showAddMemberMenu} className="bi bi-arrow-left-circle-fill text-2xl" style={{cursor:'pointer'}}></i>
            </div>
            <div className="p-4">
                <h3 className={`${darkMode ? 'text-gray-300' : 'text-muted'} text-sm font-medium `}>FRIENDS</h3>
                <div className='w-full' style={{maxHeight:'40vh', overflowY:'auto', scrollbarWidth:'none'}}>
                    {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="mt-2">
                        <div className="flex items-center mb-2">
                            <Skeleton className="mr-2 h-4 w-4 rounded-sm" />
                            <Skeleton className="w-8 h-8 rounded-full mx-2" />
                            <div>
                            <Skeleton className="h-4 w-[80px] mb-1" />
                            <Skeleton className="h-3 w-[150px]" />
                            </div>
                        </div>
                        </div>
                    ))
                    ) : (
                    members.map((member, index) => (
                        <div key={index} className="mt-2">
                        <label className="flex items-center mb-2">
                            <input
                            type="checkbox"
                            className="mr-2"
                            style={{ cursor: 'pointer', width: '15px', height: '15px' }}
                            />
                            <img
                            src={member.profilePicture}
                            className="w-8 h-8 rounded-full mx-2"
                            alt="Member"
                            />
                            <div>
                            <span className={`${darkMode ? 'text-white' : ''} font-semibold`}>
                                {member.userName}
                            </span>
                            <p
                                className={`${
                                darkMode ? 'text-gray-400' : 'text-muted-foreground'
                                } text-xs`}
                            >
                                {member.about}
                            </p>
                            </div>
                        </label>
                        </div>
                    ))
                    )}
                </div>
            </div>
            <div className={`${darkMode ? 'border-gray-700' : 'border-border'} px-4 py-3 border-t`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm`}>
                Only you can add or remove members from this group.
            </p>
            <button onClick={showAddMemberMenu} className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-gray-300 text-gray-600 hover:bg-gray-200'} mt-2 border-none p-2 rounded-lg w-full`}>
                Add members
            </button>
            </div>
        </div>
        </div>

  )
}
