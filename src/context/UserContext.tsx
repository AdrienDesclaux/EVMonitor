import { Dispatch, SetStateAction, createContext } from 'react';

type tLogged = {
  isLogged: boolean | undefined;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
};

type tUserName = {
  userName: string | undefined;
  setUserName: Dispatch<SetStateAction<string>>;
};

type tUpdatedAt = {
  updatedAt: string | undefined;
  setUpdatedAt: Dispatch<SetStateAction<string>>;
};

export const userLoggedContext = createContext<tLogged>({
  isLogged: false,
  setIsLogged: () => undefined
});

export const userNameContext = createContext<tUserName>({
  userName: '',
  setUserName: () => undefined
});

export const updatedAtContext = createContext<tUpdatedAt>({
  updatedAt: '',
  setUpdatedAt: () => undefined
});
