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
    const response = await axios.post('http://localhost:8080/vibez//googleAuth/Check', {
      email: email,
      name: name,
      picture: picture,
      password: password
    });
    return response.data; // returns false if user is not registered
}
  