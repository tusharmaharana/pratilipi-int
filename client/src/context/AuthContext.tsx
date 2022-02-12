import React from 'react';
import { IFormInputs } from '../components/AuthForm';

type ReqMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ReqInit<B> extends Omit<RequestInit, 'body'> {
  method?: ReqMethod;
  body?: B;
}

interface Actions {
  //   signIn: (values: IFormInputs) => Promise<void>;
  signUp: (values: IFormInputs) => Promise<void>;
  //   signOut: () => Promise<void>;
  request: <B, R>(endpoint: RequestInfo, config: ReqInit<B>) => Promise<R>;
}

export interface AuthContextType {
  actions?: Actions;
}

const AuthContext = React.createContext<AuthContextType>({});
export const useAuth = (): AuthContextType => React.useContext(AuthContext);

export default AuthContext;
