import { userLoggedContext, userNameContext, updatedAtContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { tUserInfos } from '../@types/tUserInfos';

import fetchAPI_EVMonitor from '../hooks/fetchAPI_EVMonitor';

export default function UserNavigation() {
  const { isLogged } = useContext(userLoggedContext);
  const { userName } = useContext(userNameContext);
  const { updatedAt } = useContext(updatedAtContext);
  const [userInfo, setUserInfo] = useState<tUserInfos | undefined>();

  async function getInfos(): Promise<tUserInfos | undefined> {
    const fetchParamsUserName = {
      route: '/user',
      method: 'get'
    };
    const payloadEmpty: null = null;

    try {
      const dataAPI = await fetchAPI_EVMonitor(fetchParamsUserName, payloadEmpty);
      const userInfos = await dataAPI.user;
      return userInfos;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isLogged) {
      const fetchUserInfo = async () => {
        const userInfos = await getInfos();
        setUserInfo(userInfos);
      };

      fetchUserInfo();
    }
  }, [isLogged, userName, updatedAt]);

  return (
    <div className="flex items-center order-1 p-1 m-1 userNav card card-side bg-grey_block sm:order-last sm:pr-2 sm:m-2 userNav">
      {!isLogged && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-warning text-primary-content shadow-[0px_0px_20px_5px_#1a202c]">
            <div className="card-body">
              <h3 className="card-title">Oups !</h3>
              <p>Login or Sign up first...</p>
            </div>
          </div>
        </div>
      )}

      {isLogged && <h3 className="text-sm md:p-2">{userName}</h3>}
      {isLogged && userInfo && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-dark_grey text-base shadow-[0px_0px_20px_5px_#1a202c]">
            <div className="card-body">
              <h3 className="card-title">User infos: </h3>
              <p>Email: {userInfo.email}</p>
              <p>Registered at: {new Date(userInfo.createdAt).toLocaleDateString()}</p>
              <p>Last Updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
