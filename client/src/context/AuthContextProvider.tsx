import React from 'react';
import { IFormInputs } from '../components/AuthForm';
import AuthContext, { AuthContextType, ReqInit } from './AuthContext';

type User = {
  userId: string;
};

export const AuthProvider: React.FC = props => {
  const signUp = async (values: IFormInputs): Promise<void> => {
    try {
      const data: User = await request('/auth/signUp', { body: values });
      if (!localStorage.getItem('userId')) localStorage.setItem('userId', data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  const request = async <B, R>(endpoint: RequestInfo, config: ReqInit<B> = {}): Promise<R> => {
    const { body, ...customConfig } = config;

    const reqConfig: RequestInit = {
      method: body ? 'POST' : 'GET',
      ...customConfig,
      body: body ? JSON.stringify(body) : null,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        ...customConfig.headers
      }
    };

    return window.fetch(`${process.env.REACT_APP_SERVER}/api${endpoint}`, reqConfig).then(async response => {
      const data = await response.json();

      if (response.status === 401) {
        return null;
      }

      if (response.ok) {
        return data;
      }

      return Promise.reject(data);
    });
  };

  const values: AuthContextType = {
    actions: { signUp, request }
  };

  return <AuthContext.Provider value={values} {...props} />;
};
