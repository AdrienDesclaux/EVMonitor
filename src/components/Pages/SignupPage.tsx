import { FormEvent, useContext, useState } from 'react';
import { tPostSignup } from '../../@types/tPostAuthAPI';
import fetchAPI_EVMonitor from '../../hooks/fetchAPI_EVMonitor';
import { Link, useNavigate } from 'react-router-dom';
import { userLoggedContext, userNameContext } from '../../context/UserContext';

export default function SignupPage() {
  const { isLogged } = useContext(userLoggedContext);
  const { userName } = useContext(userNameContext);
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState<string>('');
  const [inputUsername, setInputUsername] = useState<string>('');
  const [alertConfirmation, setAlertConfirmation] = useState<boolean>(false);
  const [otherAlert, setOtherAlert] = useState<{ tilt: boolean; error: string }>({
    tilt: false,
    error: ''
  });

  const navigate = useNavigate();
  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtherAlert({ tilt: false, error: '' });
    if (inputPassword !== inputPasswordConfirm) {
      setAlertConfirmation(true);
      return;
    }
    setAlertConfirmation(false);
    const fetchParams = {
      route: '/users/signup',
      method: 'post'
    };
    const payload: tPostSignup = {
      email: inputEmail,
      password: inputPassword,
      username: inputUsername
    };
    try {
      await fetchAPI_EVMonitor(fetchParams, payload);
      setOtherAlert({ tilt: false, error: '' });
      navigate('/login');
    } catch (error) {
      console.error(error);
      setOtherAlert({ tilt: true, error: `${error}` });
    }
  };

  return (
    <div className="flex flex-col justify-start w-full h-full signupPage">
      <form
        className="flex flex-col items-center h-full min-w-fit  p-1 m-4 text-sm rounded-box bg-dark_grey md:text-base justify-evenly"
        action=""
        onSubmit={(e) => handleSignupSubmit(e)}
        method="post">
        <h1 className="m-4 text-xl font-bold rounded-sm px-4 py-2 text-xl font-mono uppercase">
          SIGNUP
        </h1>
        {!isLogged && (
          <div className="flex flex-col items-center md:items-stretch gap-1">
            <label className="flex flex-col md:flex-row items-center md:self-end justify-center gap-1 label">
              <p>Email : </p>
              <input
                type="email"
                name="email"
                id="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="input input-sm md:input-md  input-bordered bg-dark_grey "
              />
            </label>

            <label className="flex flex-col md:flex-row items-center md:self-end justify-center gap-1 label">
              Password :
              <input
                type="password"
                name="password"
                id="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                required
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className=" input input-sm md:input-md  input-bordered bg-dark_grey "
              />
            </label>
            <label className="flex flex-col md:flex-row  items-center  md:self-end justify-center gap-1 label">
              Confirm password :
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                value={inputPasswordConfirm}
                onChange={(e) => setInputPasswordConfirm(e.target.value)}
                className=" input input-sm md:input-md  input-bordered bg-dark_grey "
              />
            </label>
            {alertConfirmation && (
              <div className="alert alert-warning toast toast-center md:toast-end toast-bottom mx-auto w-fit md:mr-4 mb-20">
                <p className="text-xs">Password and Confirmation are not identical</p>
              </div>
            )}
            {otherAlert.tilt && (
              <div className="alert alert-error toast toast-center md:toast-end toast-bottom mx-auto w-fit md:mr-4 mb-20">
                <span className="text-xs">{otherAlert.error}</span>
              </div>
            )}
            <label className="flex flex-col md:flex-row  items-center  md:self-end justify-center gap-1 label">
              Username :{' '}
              <input
                type="text"
                maxLength={15}
                name="username"
                id="username"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                className="input input-sm md:input-md  input-bordered bg-dark_grey "
              />
            </label>
            <div className="md:self-center">
              <button
                className="w-28 btn m-2 bg-dark_grey outline outline-gray hover:bg-blue_nav text-blue_light uppercase"
                type="submit">
                Register new account
              </button>
            </div>
          </div>
        )}
        {isLogged && (
          <div>
            <p>Logged in as : {userName}</p>
          </div>
        )}
        <Link to="/">
          {' '}
          <button className="btn btn-secondary uppercase mb-4">Back to HOMEPAGE </button>
        </Link>
      </form>
    </div>
  );
}
