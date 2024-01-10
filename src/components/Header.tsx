import { Link } from 'react-router-dom';
import { userNameContext } from '../context/UserContext';
import { useContext } from 'react';

export default function Sidebar() {
  const { userName } = useContext(userNameContext);

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex flex-row justify-between h-16 mb-2 md:relative bg-base-200 place-items-center md:mx-4 md:rounded-box md:h-24">
      <div>
        <div className="pl-4 m-2 text-sm md:text-base">Net Worth</div>
        <div className="pl-4 m-2 text-sm md:text-base">
          124,500.02 $ {/* AJOUTER CALCUL DE LA NET WORTH TOTAL DES WALLETS PERSO*/}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="pr-4 m-2 text-sm md:text-base">Welcome {userName}</div>
        <Link to="/login" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mb-2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <span className="pr-4 mb-2 text-sm md:text-base">Logout</span>
        </Link>
      </div>
    </div>
  );
}
