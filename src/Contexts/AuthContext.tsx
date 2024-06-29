import {
  createContext,
  useContext,
  ReactElement,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { AxiosError } from 'axios';
import { instance } from 'api';

interface Props {
  children: ReactElement;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Context {
  currUser: User | undefined;
  setCurruser: Dispatch<SetStateAction<User | undefined>>;
  login: (values: Values) => Promise<void>;
  logout: () => void;
}

interface Values {
  email: string;
  password: string;
}

const defaultValues: Context = {
  currUser: undefined,
  setCurruser: () => {},
  login: async () => {},
  logout: () => {},
};

const AuthContext = createContext<Context>(defaultValues);

const AuthContextProvider = ({ children }: Props) => {
  const [currUser, setCurruser] = useState<User | undefined>();

  const getUser = async () => {
    try {
      const res = await instance.get('/auth/get-user');
      if (res && res.data) {
        console.log(res.data);
        setCurruser(res.data.staff);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message || error.message);
      } else {
        console.log('An unknown error occurred.');
      }
    }
  };
  const login = async (values: Values) => {
    try {
      const res = await instance.post('/auth/login', values);
      if (res && res.data) {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        getUser();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message || error.message);
      } else {
        console.log('An unknown error occurred.');
      }
    }
  };

  const logout = () => {
    setCurruser(undefined);
    localStorage.removeItem('token');
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currUser, setCurruser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
