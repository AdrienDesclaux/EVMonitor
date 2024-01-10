import { Dispatch, SetStateAction, createContext } from 'react';
import { tWallet } from '../@types/tWallet';
type tUserAddress = {
  addresses: tWallet[];
  setAddresses: Dispatch<SetStateAction<tWallet[]>>;
};
type tUserBalance = {
  totalBalanceOwned: number;
  setTotalBalanceOwned: Dispatch<SetStateAction<number>>;
};

export const userBookmarkedAddressesContext = createContext<tUserAddress>({
  addresses: [],
  setAddresses: () => undefined
});

export const userPersonalAddressesContext = createContext<tUserAddress>({
  addresses: [],
  setAddresses: () => undefined
});

export const userPersonalTotalBalance = createContext<tUserBalance>({
  totalBalanceOwned: 0,
  setTotalBalanceOwned: () => 0
});
