import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [directChats, setDirectChats] = useState([]);
  const [loadingDirectChats, setLoadingDirectChats] = useState(true);
  const [groupChats, setGroupChats] = useState([]);
  const [loadingGroupChats, setLoadingGroupChats] = useState(true);
  const [pendingProfiles, setPendingProfiles] = useState([]);
  const [acceptedProfiles, setAcceptedProfiles] = useState([]);
  const [loadingFriendships, setLoadingFriendships] = useState(true);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const value = {
    directChats,
    setDirectChats,
    loadingDirectChats,
    setLoadingDirectChats,
    groupChats,
    setGroupChats,
    loadingGroupChats,
    setLoadingGroupChats,
    pendingProfiles,
    setPendingProfiles,
    acceptedProfiles,
    setAcceptedProfiles,
    loadingFriendships,
    setLoadingFriendships,
    name,
    email,
    about,
    profilePicture,
    setName,
    setEmail,
    setAbout,
    setProfilePicture
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}


export function useGlobalStore() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalStore must be used within a GlobalProvider');
  }
  return context;
}