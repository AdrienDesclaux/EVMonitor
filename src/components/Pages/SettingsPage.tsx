import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLoggedContext, userNameContext, updatedAtContext } from '../../context/UserContext';
import {
  tPostUpdatePassword,
  tPostUpdateUsername,
  tPostVerifyPassword
} from '../../@types/tPostAuthAPI';
import Overview from '../Overview';

const SettingsPage = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [showUsernameUpdateToast, setShowUsernameUpdateToast] = useState(false);
  const [showCheckedPasswordToast, setShowCheckedPasswordToast] = useState(false);
  const [showPasswordAlertToast, setShowPasswordAlertToast] = useState(false);
  const [showPasswordTimeoutToast, setShowPasswordTimeoutToast] = useState(false);

  const [, setFailedAttempts] = useState<number>(0);
  const [disableButton, setDisableButton] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  const { setIsLogged } = useContext(userLoggedContext);
  const { setUserName } = useContext(userNameContext);
  const { setUpdatedAt } = useContext(updatedAtContext);

  //useEffect pour faire disparaitre les Toasts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUsernameUpdateToast(false);
      setShowCheckedPasswordToast(false);
      setShowPasswordAlertToast(false);
      setShowPasswordTimeoutToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [
    showUsernameUpdateToast,
    showCheckedPasswordToast,
    showPasswordAlertToast,
    showPasswordTimeoutToast
  ]);

  const showPasswordAlert = () => {
    setShowConfirmation(true);
  };

  const hidePasswordAlert = () => {
    setShowConfirmation(false);
  };

  const showDeleteAlert = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteAlert = () => {
    setShowDeleteConfirmation(false);
  };

  //fonction de vérification de mot de passe
  const handlePasswordVerification = async () => {
    try {
      const data: tPostVerifyPassword = {
        password: password
      };

      const response = await fetch('https://evmonitor.onrender.com/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      //On incrémente un compteur pour bloquer le bouton de submit en cas d'échecs répétés
      if (!response.ok) {
        setFailedAttempts((prevAttempts: number) => {
          const newAttempts = prevAttempts + 1;

          if (newAttempts >= 10) {
            setDisableButton(true);
            setShowPasswordTimeoutToast(true);

            setTimeout(
              () => {
                setDisableButton(false);
                setFailedAttempts(0);
              },
              1 * 60 * 1000
            );
          }

          return newAttempts;
        });

        throw new Error('Incorrect password');
      }

      setIsPasswordValid(true);
      setShowCheckedPasswordToast(true);
      console.log('Password verified successfully');
    } catch (error) {
      console.error(error);
      setShowPasswordAlertToast(true);
    }
  };

  //Fonction de mise a jour du mot de passe
  const updatePassword = async () => {
    try {
      const data: tPostUpdatePassword = {
        newPassword: newPassword
      };

      const response = await fetch('https://evmonitor.onrender.com/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      // On déconnecte bien l'utilisateur
      setIsLogged(false);
      setUserName('');

      //On met a jour la date de la dernière MAJ, on redirige vers /login et on cache l'alert de confirmation.
      setUpdatedAt(new Date().toISOString());
      navigate('/login');
      hidePasswordAlert();
    } catch (error) {
      console.error(error);
    }
  };

  //Fonction de mise a jour du nom d'utilisateur
  const updateUsername = async () => {
    try {
      const data: tPostUpdateUsername = {
        username: newUsername
      };

      const response = await fetch('https://evmonitor.onrender.com/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to update username');
      }

      //On change le nom d'utilisateur, on met a jour la date de la MAJ et on fait pop un toast de confirmation.
      setUserName(newUsername);
      setUpdatedAt(new Date().toISOString());
      setShowUsernameUpdateToast(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour effacer son compte
  const deleteAccount = async () => {
    try {
      const deleteResponse = await fetch('https://evmonitor.onrender.com/user', {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete account');
      }

      // On déconnecte, on redirige et on chache l'alerte de confirmation
      setIsLogged(false);
      setUserName('');
      navigate('/');
      hideDeleteAlert();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-start h-screen w-screen grow rounded-box bg-dark_grey md:mx-4">
      <Overview />
      <div className="flex flex-col items-center overflow-y-auto md:overflow-y-none p-2 m-4 my-16 md:my-4 grow rounded-box bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <h1 className="m-4 text-xl font-bold">Settings Page</h1>
        <section>
          <div className="my-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="items-start">
              <label className="text-lg font-bold mb-2">
                Password:
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full input input-bordered"
                />
              </label>
              {/* On cache et désactive le bouton en cas d'échecs répétés */}
              <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${
                  disableButton ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={disableButton}
                onClick={handlePasswordVerification}>
                Submit Password
              </button>
            </form>
          </div>
          <div className="my-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showPasswordAlert();
              }}
              className="items-start">
              <label className="text-lg font-bold mb-2">
                New Password:
                <input
                  type="password"
                  disabled={!isPasswordValid}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full input input-bordered"
                />
              </label>
              {/* On désactive le bouton et le formulaire */}
              <button
                type="submit"
                disabled={!isPasswordValid}
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${
                  !isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                Edit Password
              </button>
            </form>
          </div>
          <div className="my-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUsername();
              }}
              className="items-start">
              {/* On désactive le bouton et le formulaire */}
              <label className="text-lg font-bold mb-2">
                New Username:
                <input
                  type="text"
                  maxLength={15}
                  disabled={!isPasswordValid}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full input input-bordered"
                />
              </label>
              {/* On désactive le bouton et le formulaire */}
              <button
                type="submit"
                disabled={!isPasswordValid}
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${
                  !isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                Edit Username
              </button>
            </form>
          </div>
        </section>
        <section className="my-4">
          <button
            onClick={showDeleteAlert}
            disabled={!isPasswordValid}
            className={`bg-red-500 text-white px-2 py-2 rounded mt-2 ${
              !isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            Delete My Account
          </button>
        </section>
        {showConfirmation && (
          <div role="alert" className="alert alert-warning absolute md:max-w-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-white">You will be logout after this action.</span>
            <div>
              <button className="btn text-white btn-sm mr-2" onClick={hidePasswordAlert}>
                Deny
              </button>
              <button className="btn btn-sm btn-primary" onClick={updatePassword}>
                Accept
              </button>
            </div>
          </div>
        )}
        {showDeleteConfirmation && (
          <div role="alert" className="alert alert-warning absolute md:max-w-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-white">Are you sure you want to delete your account ?</span>
            <div>
              <button className="btn btn-sm mr-2" onClick={hideDeleteAlert}>
                Deny
              </button>
              <button className="btn text-white btn-sm btn-primary" onClick={deleteAccount}>
                Accept
              </button>
            </div>
          </div>
        )}
        {showUsernameUpdateToast && (
          <div className="toast toast-center mb-12 md:toast-end md:toast-bottom md:mb-0 mr-4">
            <div className="alert bg-blue-500">
              <span>Username updated successfully!</span>
            </div>
          </div>
        )}
        {showCheckedPasswordToast && (
          <div className="toast toast-center mb-12 md:toast-end md:toast-bottom md:mb-0 mr-4">
            <div className="alert bg-blue-500">
              <span>Password verified successfully!</span>
            </div>
          </div>
        )}
        {showPasswordAlertToast && (
          <div className="toast toast-center mb-12 md:toast-end md:toast-bottom md:mb-0 mr-4">
            <div className="alert bg-warning text-black">
              <span>Incorrect Password</span>
            </div>
          </div>
        )}
        {showPasswordTimeoutToast && (
          <div className="toast toast-center mb-12 md:toast-end md:toast-bottom md:mb-0 mr-4">
            <div className="alert bg-warning text-black">
              <span>Please wait before trying again.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
