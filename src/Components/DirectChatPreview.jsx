import { useState, useEffect } from 'react'
import { checkIsUnreadChat} from '../Services/ChatService';
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from '../hooks/useIsMobile';

export default function DirectChatPreview({chatId, showDirectMessages, darkMode, friendId, friendName, lastMessage, lastActiveTime, lastMessageSender, friendAvatar, setReceiverId, setShowMobileRight}) {

    const isMobile = useIsMobile();
    const [isUnread, setIsUnread] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChatClick = () => {
        if(friendName !== 'No longer available') {
            setReceiverId(friendId);
            setIsUnread(false);
            if(isMobile) {
                setShowMobileRight(true);
                showDirectMessages();
            }else{
                showDirectMessages();
            }
        }
    }

    const fetchIsUnread = async () => {
        try{
            const response = await checkIsUnreadChat(chatId);
            setIsUnread(response);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchIsUnread();
    }, []);

  return (
    <div onClick={handleChatClick} className="space-y-2" style={{cursor: 'pointer'}}>
        {loading ? (<>
        <div className={`${darkMode ? 'hover:bg-[#2d3243]' : 'hover:bg-muted'} flex items-center p-2 rounded`}>
        <Skeleton className="rounded-full mr-2 w-18 h-18" style={{ height: '45px', width: '45px' }} />
        <div className="flex-grow">
            <Skeleton className="h-4 w-[120px] mb-1" />
            <Skeleton className="h-3 w-[180px]" />
        </div>
        <Skeleton className="ml-auto h-3 w-[50px]" />
        </div>
        </>) : (<>
        <div className={`${darkMode ? 'hover:bg-[#2d3243]' : 'hover:bg-muted'} flex items-center p-2 rounded`}>
            <div className="rounded-full mr-2" style={{ height: '45px', width: '45px', background: `center / cover no-repeat url(${friendAvatar})` }}></div>
            <div>
                <div className={`${darkMode ? 'text-white' : ''} font-medium`}>
                {friendName}{'   '}
                {friendName === 'VIBEZ' && <i className="ml-1 bi bi-patch-check-fill text-primary"></i>}
                </div>
                <div className={`${isUnread ? (darkMode ? 'text-white font-bold' : 'text-black font-bold') : (darkMode ? 'text-gray-400' : 'text-muted-foreground')} text-sm`}>
                    {lastMessageSender}: {lastMessage.length > (isMobile ? 15 : 30) ? `${lastMessage.substring(0, isMobile ? 15 : 30)}...` : lastMessage}
                </div>
            </div>
            <span className={`${isUnread ? (darkMode ? 'text-white font-bold' : 'text-black font-bold') : (darkMode ? 'text-gray-400' : '')} ml-auto text-xs`}>{lastActiveTime}</span>
        </div>
        </>)}
    </div>
  )
}


