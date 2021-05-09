import axios from 'axios';
import cookie from 'js-cookie';
import { baseUrl, catchErrors } from '../utils';

const Axios = axios.create({
  baseURL: baseUrl + '/api/posts',
  headers: {
    Authorization: cookie.get('token'),
  },
});

export const sendPost = async (
  body: any,
  setPosts: Function,
  setMediaState: Function,
  setLocation: Function,
  setText: Function
) => {
  try {
    const { data } = await Axios.post('/', body);
    setPosts((prev: any) => [data, ...prev]);
    setLocation({
      locationValue: '',
      locationConfirmed: false,
      showLocationField: false,
    });
    setMediaState((prev) => ({
      ...prev,
      mediaPreview: null,
    }));
    setText('');
  } catch (error) {
    console.log(catchErrors(error));
  }
};

export const deletePost = async (
  postId: string,
  setPosts: Function,
  setShowAlert: Function
) => {
  try {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
    setShowAlert(false);
    await Axios.delete(`/${postId}`);
  } catch (error) {
    console.log(catchErrors(error));
  }
};

export const likePost = async (
  userId: string,
  postId: string,
  setLikes: Function,
  like: boolean
) => {
  try {
    if (like) {
      setLikes((prev: any) => [
        { user: userId, createdAt: new Date() },
        ...prev,
      ]);

      await Axios.post(`/like/${postId}`);
    } else if (!like) {
      setLikes((prev: any) => prev.filter((l: any) => l.user !== userId));
      await Axios.delete(`/dislike/${postId}`);
    }
  } catch (error) {
    console.log(catchErrors(error));
  }
};

// TODO
export const addComment = async (
  postId: string,
  text: string,
  setText: Function,
  setComments: Function,
  onClose: Function
) => {
  try {
    const { data } = await Axios.post(`/comment/${postId}`, { text });
    setComments((prev) => [data, ...prev]);
    setText('');
    onClose();
  } catch (error) {
    console.log(catchErrors(error));
  }
};
