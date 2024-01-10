import { Dispatch, SetStateAction } from 'react';

import { tWallet } from '../@types/tWallet';

interface UserHasAddresses {
  id_user: number;
  id_address: number;
  is_favorite: boolean;
  is_owned: boolean;
  subname: string;
}

interface User {
  id: number;
  is_admin: boolean;
  UserHasAddresses: UserHasAddresses;
}

interface NativeCoin {
  id: number;
  symbol: string;
  evm: string;
  AddressHasNativeCoin: {
    id_nativecoin: number;
    balance: string;
  };
}

interface Address {
  id: number;
  public_key: string;
  users: User[];
  nativecoins: NativeCoin[];
}

interface ApiResponse {
  user: Address[];
  totalBalanceOwned?: number;
}

type fetchAllAddressesProps = {
  setPersonalAddresses: Dispatch<SetStateAction<tWallet[]>>;
  setBookmarkedAddresses: Dispatch<SetStateAction<tWallet[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setTotalBalanceOwned: Dispatch<SetStateAction<number>>;
};

const fetchAllAddresses = ({
  setPersonalAddresses,
  setBookmarkedAddresses,
  setIsLoading,
  setTotalBalanceOwned
}: fetchAllAddressesProps) => {
  // Fetches Wallet data from the server.
  const fetchAPI = async () => {
    try {
      const response = await fetch('http://localhost:3000/addresses', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data: ApiResponse = await response.json();

      // Set total balance and filter Wallets based on ownership and favorites.
      if (data.totalBalanceOwned === 0) setTotalBalanceOwned(0);
      else {
        if (data.totalBalanceOwned) setTotalBalanceOwned(data.totalBalanceOwned);
      }
      if (data.user && data.user.length > 0) {
        const addresses = data.user.map(
          (userAddress): tWallet => ({
            id: userAddress.id,
            public_key: userAddress.public_key,
            is_owned: userAddress.users[0].UserHasAddresses.is_owned,
            is_favorite: userAddress.users[0].UserHasAddresses.is_favorite,
            subname: userAddress.users[0].UserHasAddresses.subname,
            balance:
              userAddress.nativecoins.length > 0
                ? userAddress.nativecoins[0].AddressHasNativeCoin.balance
                : '0'
          })
        );

        // Separate Wallets into personal and favorite categories.
        setPersonalAddresses(addresses.filter((addr) => addr.is_owned));
        setBookmarkedAddresses(addresses.filter((addr) => addr.is_favorite));
      } else {
        // If no addresses are returned, clear the state.
        setPersonalAddresses([]);
        setBookmarkedAddresses([]);
        setTotalBalanceOwned(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Update loading status after the data fetch is complete.
      setIsLoading(false);
    }
  };
  setIsLoading(true);
  fetchAPI();
  return {};
};

export default fetchAllAddresses;
