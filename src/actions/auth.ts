import axios from 'axios';
import Router from 'next/router';
import cookie from 'js-cookie';
import { baseUrl, catchErrors } from '../utils';

export const setToken = (token) => {
  cookie.set('token', token);
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    // it means user on server side
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    // user on client side
    Router.push(location);
  }
};

export const registerUser = async (
  user: any,
  profilePicUrl: string | undefined,
  setIsLoading: Function,
  setErrors: Function
) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/register/`, {
      user,
      profilePicUrl,
    });

    setToken(data);
    Router.push('/');
  } catch (error) {
    setErrors(catchErrors(error));
  }
  setIsLoading(false);
};

export const loginUser = async (
  credentials: string,
  password: string,
  setIsLoading: Function,
  setErrors: Function
) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/auth`, {
      credentials,
      password,
    });

    setToken(data);
    Router.push('/');
  } catch (error) {
    setErrors(catchErrors(error));
  }
  setIsLoading(false);
};
