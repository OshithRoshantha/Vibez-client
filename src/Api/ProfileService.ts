import axios from 'axios';

export const createAccount = async (email: string, name: string, password: string) => {
    const response = await axios.post('http://localhost:8080/vibez/register', {
        userName: name,
        email: email,
        password: password
    });
    return response.data;
}