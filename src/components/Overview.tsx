import { useContext } from 'react';
import UserNavigation from './UserNavigation';
import { userPersonalTotalBalance } from '../context/UserAddressesContext';

export default function Overview() {
  const { totalBalanceOwned } = useContext(userPersonalTotalBalance);
  const truncateBalance = (balance: string = '0') => {
    const mobileScreenSize = 768;
    if (window.innerWidth <= mobileScreenSize && balance.length > 10) {
      return `${balance.substring(0, 10)}`;
    }
    return balance;
  };
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex flex-row justify-between h-16 stretch mb-2 md:relative place-items-center md:mx-4 md:rounded-box md:h-24 bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-3">
      <div>
        <div className="sm:pl-4 m-2 text-sm md:text-base">
          Total ETH <span className="text-xs">(without erc20)</span>
        </div>
        <div className="pl-2 sm:pl-4 m-2 text-xs md:text-base">
          {truncateBalance(totalBalanceOwned?.toFixed(4))} ETH
        </div>
      </div>
      <UserNavigation />
    </div>
  );
}
