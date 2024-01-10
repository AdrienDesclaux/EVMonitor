import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { userLoggedContext, userNameContext, updatedAtContext } from '../../context/UserContext';
import { addressIsAddedContext, addressIsDeletedContext } from '../../context/AddressReloadContext';
import {
  userBookmarkedAddressesContext,
  userPersonalAddressesContext,
  userPersonalTotalBalance
} from '../../context/UserAddressesContext';
import fetchNewToken from '../../hooks/fetchNewToken';
import Sidebar from '../SideBar';
import { tWallet } from '../../@types/tWallet';
function App() {
  const storedIsLogged = window.localStorage.getItem('logged') === 'true';
  const storedUserName = window.localStorage.getItem('user');

  // stored locally in app then given to the context provider
  // thus children will be all able to use the state and the set freely with useContext

  const [isLogged, setIsLogged] = useState<boolean>(storedIsLogged || false);
  const [userName, setUserName] = useState<string>(storedUserName || '');
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [addressIsDeleted, setAddressIsDeleted] = useState<boolean>(false);
  const [addressIsAdded, setAddressIsAdded] = useState<boolean>(false);
  const [personalAddresses, setPersonalAddresses] = useState<tWallet[]>([]);
  const [bookmarkedAddresses, setBookmarkedAddresses] = useState<tWallet[]>([]);
  const [totalBalanceOwned, setTotalBalanceOwned] = useState<number>(0);
  useEffect(() => {
    if (isLogged) fetchNewToken();
  }, []);
  return (
    <userLoggedContext.Provider value={{ isLogged, setIsLogged }}>
      <userNameContext.Provider value={{ userName, setUserName }}>
        <addressIsDeletedContext.Provider value={{ addressIsDeleted, setAddressIsDeleted }}>
          <addressIsAddedContext.Provider value={{ addressIsAdded, setAddressIsAdded }}>
            <userBookmarkedAddressesContext.Provider
              value={{ addresses: bookmarkedAddresses, setAddresses: setBookmarkedAddresses }}>
              <userPersonalAddressesContext.Provider
                value={{ addresses: personalAddresses, setAddresses: setPersonalAddresses }}>
                <userPersonalTotalBalance.Provider
                  value={{ totalBalanceOwned, setTotalBalanceOwned }}>
                  <updatedAtContext.Provider value={{ updatedAt, setUpdatedAt }}>
                    <div className="flex flex-col items-center justify-center h-screen text-bas min-w-screen app bg-background_dark">
                      <div className="flex flex-col items-stretch self-stretch justify-start grow md:h-screen md:flex-row main">
                        <Sidebar />
                        <Outlet />
                      </div>
                    </div>
                  </updatedAtContext.Provider>
                </userPersonalTotalBalance.Provider>
              </userPersonalAddressesContext.Provider>
            </userBookmarkedAddressesContext.Provider>
          </addressIsAddedContext.Provider>
        </addressIsDeletedContext.Provider>
      </userNameContext.Provider>
    </userLoggedContext.Provider>
  );
}

export default App;
