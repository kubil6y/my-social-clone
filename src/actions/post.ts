import axios from 'axios';
import cookie from 'js-cookie';
import { baseUrl, catchErrors } from '../utils';

const Axios = axios.create({
  baseURL: baseUrl + '/api',
  headers: {
    Authorization: cookie.get('token'),
  },
});

export const deletePost = async (postId, setPosts, setShowAlert) => {
  try {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
    setShowAlert(false);
    await Axios.delete(`/posts/${postId}`);
  } catch (error) {
    console.log(catchErrors(error));
  }
};
