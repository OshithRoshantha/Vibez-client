import axios from 'axios';

export const searchPeople = async (keyword: string) => {
    const response = await axios.get(`http://localhost:8080/vibez/search/${keyword}`);
    return response.data;
}