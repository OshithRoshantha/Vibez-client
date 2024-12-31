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