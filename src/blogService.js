import axios from 'axios';

const API_URL = 'http://localhost:5000/dashboard'; // Replace with your backend API URL

export const getBlogs = async () => {
  try {
    const response = await axios.get(API_URL,{withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};
export const getYourBlogs = async () => {
    try {
        const response = await axios.get('http://localhost:5000/Your_blogs',{withCredentials: true});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}

export const getBlogById = async (id) =>{
  try{
    const response = await axios.get(`http://localhost:5000/blog/${id}`,{withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        throw error;
    }
}
