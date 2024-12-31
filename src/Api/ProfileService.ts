import axios from 'axios';

export const createAccount = async (email: string, name: string, password: string) => {
    const response = await axios.post('http://localhost:8080/vibez/register', {
        email: email,
        userName: name,
        password: password
    });
    return response.data;
}