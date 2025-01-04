import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function PreiviewAcceptedRequests({darkMode, user, about, toggleBlockPopup, toggleUnfriendPopup}) {
  return (
                                <div className="flex items-center justify-between border-border py-0 mt-2">
                                    <div className="flex items-center">
                                        <img src="https://placehold.co/40x40" className="rounded-full mr-2" />
                                        <div>
                                            <p className={`${darkMode ? 'text-white' : ''} font-medium`}>{user}</p>
                                            <p className={`${darkMode ? 'text-gray-400' : 'text-muted-foreground'} text-sm `}>{about}</p>
                                        </div>
                                    </div>
                                    <div className="btn-container">
                                        <div className="ml-mr-4 btns">
                                            <i className="bi bi-chat-fill text-primary"></i>
                                        </div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <div className="btns">
                                                    <i
                                                        className={`${darkMode ? 'text-white' : ''} bi bi-three-dots-vertical`}
                                                    ></i>
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                style={{
                                                    width: '220px',
                                                    marginRight: '200px',
                                                    height: '105px',
                                                    backgroundColor: darkMode ? '#262729' : '',
                                                }}
                                            >
                                                <div className="bg-card text-card-foreground p-0 rounded-lg ">
                                                    <div
                                                        className="flex-grow friend-buttons"
                                                        style={{
                                                            marginLeft: '-20px',
                                                            marginTop: '-17px',
                                                            backgroundColor: darkMode ? '#262729' : '',
                                                        }}
                                                    >
                                                        <button
                                                            onClick={toggleBlockPopup}
                                                            className="flex flex-grow items-center w-full p-2 text-left rounded bg-transparent text-black border-none focus:ring-0 hover:border-none"
                                                        >
                                                            <span
                                                                className="material-icons"
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    backgroundColor: darkMode ? '#3b3c3e' : '#d1d1d1',
                                                                    width: '29px',
                                                                    height: '29px',
                                                                    borderRadius: '50%',
                                                                }}
                                                            >
                                                                <i className="bi bi-slash-circle-fill text-red-500"></i>
                                                            </span>
                                                            Block
                                                        </button>
                                                        <button
                                                            onClick={toggleUnfriendPopup}
                                                            className="flex flex-grow items-center w-full p-2 text-left rounded bg-transparent text-black border-none focus:ring-0 hover:border-none"
                                                        >
                                                            <span
                                                                className="material-icons"
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    backgroundColor: darkMode ? '#3b3c3e' : '#d1d1d1',
                                                                    width: '29px',
                                                                    height: '29px',
                                                                    borderRadius: '50%',
                                                                }}
                                                            >
                                                                <i className="bi bi-person-x-fill text-red-500"></i>
                                                            </span>
                                                            Remove Friend
                                                        </button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
  )
}
