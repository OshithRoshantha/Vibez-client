import axios from 'axios';

export const checkAccount = async (email : string) => {
    const response = await axios.get(`http://localhost:8080/vibez/profile/isExist/${email}`);
    return response.data;
}

export const directLoginAuth = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:8080/vibez/login', {
      email: email,
      password: password
    });
    return response.data;
}

export const googleLoginAuth = async (email: string, name: string, picture: string, password: string) => {
    const response = await axios.post('http://localhost:8080/vibez/GoogleAuth', {
      email: email,
      userName: name,
      profilePicture: picture,
      password: password
    });
    return response.data; 
}
  