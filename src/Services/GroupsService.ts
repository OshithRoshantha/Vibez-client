import axios from 'axios';

const API = import.meta.env.VITE_API;

export const getAllGroups = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/allGroups/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getGroupInfo = async (groupId: string) => {
    const response = await axios.get(`http://${API}/vibez/group/info/${groupId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const checkAdmin = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/group/isAdmin/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const groupAddList = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/group/getAddList/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const isGroupRelated = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/group/isRelated/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getGroupMessages = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/message/groupChat/${userId}/${groupId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const markGroupMessagesAsRead = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    
    const response = await axios.put(
        `http://${API}/vibez/message/markAsReadGroup/${userId}/${groupId}`, 
        {},  
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}

export const getUnreadGroupMessages = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/message/unreadGroup/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const checkIsUnreadGroup = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/messages/checkUnreadGroup/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}

export const sendMessage = async (groupId: string, messageToSend: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const senderId = sessionStorage.getItem('userId');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'messageService',
                body: {
                    senderId,
                    groupId,
                    message: messageToSend,
                },
            };
        socket.send(JSON.stringify(message));
        resolve(); 
        };
    });   
}

export const createGroup = async (groupName: string, groupIcon: string, groupDesc: string, memberIds: string[]): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'groupService',
                body: {
                    creatorId: userId,
                    groupName,
                    groupIcon,
                    groupDesc,
                    memberIds
                },
            };
            socket.send(JSON.stringify(message));
            resolve(); 
        };
    });
};

export const updateGroup = async (groupId: string, groupName: string, groupIcon: string, groupDesc: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'groupService',
                body: {
                    groupId,
                    groupName,
                    groupIcon,
                    groupDesc,
                },
            };
            socket.send(JSON.stringify(message));
            resolve(); 
        };
    });
};

export const addMembers = async (groupId: string, memberList: string[]): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'groupService',
                groupAction: {
                    groupId,
                    action: 'addUsers',	
                    userIds:memberList
                },
            };
            socket.send(JSON.stringify(message));
            resolve(); 
        };
    });
};

export const removeMembers = async (groupId: string, memberList: string[]): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'groupService',
                groupAction: {
                    groupId,
                    action: 'removeUsers',	
                    userIds:memberList
                },
            };
            socket.send(JSON.stringify(message));
            resolve(); 
        };
    });
};

export const deleteGroup = async (groupId: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'groupService',
                groupAction: {
                    groupId,
                    action: 'deleteGroup'
                },
            };
            socket.send(JSON.stringify(message));
            resolve(); 
        };
    });
};

export const searchGroups = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/group/find/${userId}/${keyword}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}