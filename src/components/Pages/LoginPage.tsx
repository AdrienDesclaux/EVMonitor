/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLoggedContext, userNameContext } from '../../context/UserContext';
import { tPostLogin } from '../../@types/tPostAuthAPI';
import fetchAPI_EVMonitor from '../../hooks/fetchAPI_EVMonitor';
import useGetUserName from '../../hooks/useGetUserName';
import useStoreLoginInfo from '../../hooks/useStoreLoginInfo';
import Overview from '../Overview';

export default function LoginPage() {
  // Stored in context
  const { isLogged, setIsLogged } = useContext(userLoggedContext);
  const { userName, setUserName } = useContext(userNameContext);
  // Stored locally in component
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [otherAlert, setOtherAlert] = useState<{ tilt: boolean; error: string }>({
    tilt: false,
    error: ''
  });
  const navigate = useNavigate();
  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtherAlert({ tilt: false, error: '' });
    const fetchParamsLogin = {
      route: '/users/login',
      method: 'post'
    };
    const payloadLogin: tPostLogin = {
      email: inputEmail,
      password: inputPassword
    };
    try {
      await fetchAPI_EVMonitor(fetchParamsLogin, payloadLogin);
      setIsLogged(true);
      const userAPI = await useGetUserName();

      if (userAPI) {
        setUserName(userAPI);
        useStoreLoginInfo(true, userAPI);
      }
      setOtherAlert({ tilt: false, error: '' });
      navigate('/dashboard');
    } catch (error) {
      setOtherAlert({ tilt: true, error: `${error}` });
    }
  };

  const handleLogoutSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtherAlert({ tilt: false, error: '' });
    const fetchParamsLogout = {
      route: '/users/logout',
      method: 'delete'
    };
    const payloadEmpty: null = null;
    try {
      await fetchAPI_EVMonitor(fetchParamsLogout, payloadEmpty);
      setIsLogged(false);
      setUserName('');
      useStoreLoginInfo(false, '');
      setOtherAlert({ tilt: false, error: '' });
    } catch (error) {
      console.error(error);
      setOtherAlert({ tilt: true, error: `${error}` });
    }
  };

  return (
    <div className="flex flex-col justify-start w-full h-full loginPage">
      {isLogged && <Overview />}
      <form
        className="flex flex-col items-center h-full min-w-fit  p-1 m-4 text-sm rounded-box bg-dark_grey md:text-base justify-evenly"
        action=""
        onSubmit={(e) => {
          if (!isLogged) handleLoginSubmit(e);
          else handleLogoutSubmit(e);
        }}
        method="post">
        {!isLogged && (
          <h1 className="m-4 text-xl font-bold px-4 py-2 text-xl font-mono uppercase">LOGIN</h1>
        )}
        {isLogged && (
          <h1 className="m-4 text-xl font-bold px-4 py-2 text-xl font-mono uppercase">LOGOUT</h1>
        )}

        <div className="flex flex-col items-center md:items-stretch shrink w-fit gap-1">
          {/* cas login, pour visiteur non loggé */}
          {!isLogged && (
            <>
              <label className="flex flex-col md:flex-row items-center md:self-end justify-center gap-1 label">
                <p>Email : </p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="input input-sm md:input-md  input-bordered bg-dark_grey shrink"
                />
              </label>

              <label className="flex flex-col md:flex-row items-center md:self-end justify-center gap-1 label">
                <p>Password :</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className=" input input-sm md:input-md input-bordered bg-dark_grey shrink p-0"
                />
              </label>
            </>
          )}
          {/* cas membre loggé */}
          {isLogged && <p>Logged in as : {userName}</p>}
          {/* button dynamique selon état de connexion */}
          <div className="md:self-center">
            <button
              className="w-24 btn m-2 bg-dark_grey outline outline-gray hover:bg-blue_nav text-blue_light uppercase"
              type="submit">
              {!isLogged && 'Connect'}
              {isLogged && 'LOGOUT'}
            </button>
          </div>
        </div>
        <Link to="/">
          {' '}
          <button className="btn btn-secondary uppercase mb-4">Back to HOMEPAGE </button>
        </Link>
        {otherAlert.tilt && (
          <div className="alert alert-warning toast toast-center md:toast-end toast-bottom mx-auto w-fit md:mr-4 mb-20">
            <span className="text-xs">{otherAlert.error}</span>
          </div>
        )}
      </form>
    </div>
  );
}
