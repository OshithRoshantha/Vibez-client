import axios from 'axios';

const API = '3.88.247.66:8080';

export const checkAccount = async (email : string) => {
    const response = await axios.get(`http://${API}/vibez/profile/isExist/${email}`);
    return response.data;
}

export const directLoginAuth = async (email: string, password: string) => {
    const response = await axios.post(`http://${API}/vibez/login`, {
      email: email,
      password: password
    });
    return response.data;
}

export const googleLoginAuth = async (email: string, name: string, picture: string, password: string) => {
    const response = await axios.post(`http://${API}/vibez/GoogleAuth`, {
      email: email,
      userName: name,
      profilePicture: picture,
      password: password
    });
    return response.data; 
}
  