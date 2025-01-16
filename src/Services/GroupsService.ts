import axios from 'axios';

export const getAllGroups = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/allGroups/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getGroupInfo = async (groupId: string) => {
    const response = await axios.get(`http://localhost:8080/vibez/group/info/${groupId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const checkAdmin = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/group/isAdmin/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const groupAddList = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/group/getAddList/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const updateGroup = async (groupId: string, groupName: string, groupIcon: string, groupDesc: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

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

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

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

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

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