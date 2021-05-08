import axios from 'axios';
import Router from 'next/router';
import cookie from 'js-cookie';
import { baseUrl, catchErrors } from '../utils';

export const setToken = (token: any) => {
  cookie.set('token', token, {
    expires: 1,
  });
};

export const redirectUser = (ctx: any, location: string) => {
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
    setIsLoading(true);

    const { data } = await axios.post(`${baseUrl}/api/register/`, {
      user,
      profilePicUrl,
    });

    setToken(data);
    Router.push('/');
  } catch (error) {
    setErrors(catchErrors(error));
  } finally {
    setIsLoading(false);
  }
};

export const loginUser = async (
  credentials: string,
  password: string,
  setIsLoading: Function,
  setErrors: Function
) => {
  try {
    setIsLoading(true);

    const { data } = await axios.post(`${baseUrl}/api/auth`, {
      credentials,
      password,
    });

    setToken(data);
    Router.push('/');
  } catch (error) {
    setErrors(catchErrors(error));
  } finally {
    setIsLoading(false);
  }
};

export const logoutUser = (email: string) => {
  cookie.set('email', email, { expires: 7 });
  cookie.remove('token');
  Router.push('/login');
};
