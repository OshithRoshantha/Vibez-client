import axios from 'axios';

export const createAccount = async (email: string, name: string, password: string, picture: string, about: string) => {
    const response = await axios.post('http://localhost:8080/vibez/register', {
        userName: name,
        email: email,
        password: password,
        profilePicture: picture,
        about: about
    });
    return response.data;
}

export const fetchUserProfile = async () => {
    const response = await axios.get('http://localhost:8080/vibez/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const updateDarkMode = async (darkMode: boolean) => {
    await axios.put(
        `http://localhost:8080/vibez/profile/darkmode/${localStorage.getItem('userId')}/${darkMode}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
}

export const getdarkModePreference = async () => {
    const response = await axios.get('http://localhost:8080/vibez/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.darkMode;   
}
