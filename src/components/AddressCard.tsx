import { Link } from 'react-router-dom';

interface WalletCardProps {
  address: string;
  id: number;
  balanceNativeCoin: string;
  subname: string;
  onDelete: () => void;
}
const AddressCard = ({ address, id, balanceNativeCoin, subname, onDelete }: WalletCardProps) => {
  // Truncates the address for mobile screens
  const truncateAddress = (address: string) => {
    const mobileScreenSize = 768;
    if (window.innerWidth <= mobileScreenSize && address.length > 10) {
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    return address;
  };
  // Truncates the balance for mobile screens
  const truncateBalance = (balance: string) => {
    const mobileScreenSize = 768;
    if (window.innerWidth <= mobileScreenSize && balance.length > 10) {
      return `${balance.substring(0, 10)}`;
    }
    return balance;
  };
  // Handles the deletion of the address
  const onDeleteAddress = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/addresses/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        onDelete();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="w-11/12 m-2 text-xs sm:text-sm md:text-base">
      <div className="mx-4 transition duration-100 shadow-xl card bg-dark_grey hover:shadow-2xl hover:bg-background_dark">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <Link to={`/address/${address}`} className="hover:text-blue-500">
              <p>{subname}</p>
              <p className="card-title text-sm md:text-xl">{truncateAddress(address)}</p>
            </Link>
            <button onClick={() => onDeleteAddress(id)} className="hover:text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <p>{truncateBalance(balanceNativeCoin)} ETH</p>
            <Link to={`/address/${address}`} className="hover:text-blue-500">
              <p>More details...</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
