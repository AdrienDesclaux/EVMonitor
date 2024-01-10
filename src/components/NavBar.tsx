import { useState } from 'react';
import UserNavigation from './UserNavigation';

type NavBarProps = {
  onSearch: (query: string) => void;
  isLoading: boolean;
};

function NavBar({ onSearch, isLoading }: NavBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex flex-wrap items-center justify-between rounded-b-lg md:rounded-box navBar md:mx-4 bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-3">
      <h1 className="order-first bg-grey_block mainTitle ml-2">
        <a className="text-base md:text-xl btn btn-ghost">EVMonitorV1</a>
      </h1>

      <form
        className="justify-center order-2 p-2 searchBar join grow "
        onSubmit={(e) => handleSearch(e)}>
        <input
          className="w-2/3 text-xs md:text-base input input-bordered join-item bg-grey_block"
          type="text"
          placeholder="Ethereum address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="w-1/3 text-xs rounded-r-full md:text-base btn join-item bg-blue_nav"
          type="submit"
          onClick={(e) => handleSearch(e)}
          // On désactive le bouton de recherche et on le remplace par un Loading
          disabled={isLoading}>
          {isLoading ? (
            <>
              Loading <span className="loading loading-dots loading-xs"></span>
            </>
          ) : (
            'Rechercher'
          )}
        </button>
      </form>

      <UserNavigation />
    </div>
  );
}

export default NavBar;
