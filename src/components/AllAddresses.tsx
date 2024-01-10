import { useContext, useEffect, useState } from 'react';
import fetchAllAddresses from '../hooks/fetchAllAddresses';
import AddAddressButton from './AddAddressButton';
import AddressCard from './AddressCard';
import { addressIsAddedContext, addressIsDeletedContext } from '../context/AddressReloadContext';
import {
  userPersonalAddressesContext,
  userBookmarkedAddressesContext,
  userPersonalTotalBalance
} from '../context/UserAddressesContext';

export default function AllAddresses() {
  // Local
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Global
  const { addressIsAdded, setAddressIsAdded } = useContext(addressIsAddedContext);
  const { addressIsDeleted, setAddressIsDeleted } = useContext(addressIsDeletedContext);
  const { addresses: personalAddresses, setAddresses: setPersonalAddresses } = useContext(
    userPersonalAddressesContext
  );
  const { addresses: bookmarkedAddresses, setAddresses: setBookmarkedAddresses } = useContext(
    userBookmarkedAddressesContext
  );
  const { setTotalBalanceOwned } = useContext(userPersonalTotalBalance);

  // Effect to fetch Wallet data on component mount and when an address is deleted or added
  useEffect(() => {
    setIsLoading(true);
    fetchAllAddresses({
      setPersonalAddresses,
      setBookmarkedAddresses,
      setIsLoading,
      setTotalBalanceOwned
    });
    setAddressIsAdded(false);
    setAddressIsDeleted(false);
  }, [addressIsDeleted, addressIsAdded]);

  // const handleAddAddressSubmit = () => {
  //   setAddressIsAdded(true);
  // };
  if (isLoading) {
    return (
      <div className="flex flex-col items-center mx-4 mt-16 md:mt-0 ">
        <div className="w-full h-32 m-2 skeleton bg-grey_block"></div>
        <div className="w-full h-32 m-2 skeleton bg-grey_block"></div>
        <div className="w-full h-32 m-2 skeleton bg-grey_block"></div>
        <div className="w-full h-32 m-2 skeleton bg-grey_block"></div>
        <div className="w-full h-32 m-2 skeleton bg-grey_block"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center overflow-y-auto p-2 m-4 my-16 md:my-4 grow rounded-box bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-neutral-500 list scrollbar-track-neutral-700 allAddresses">
      <h1 className="m-4 text-xl font-bold ">Personal Wallets</h1>
      {personalAddresses.length > 0 ? (
        personalAddresses.map((wallet, index) => (
          <AddressCard
            key={index}
            address={wallet.public_key}
            id={wallet.id}
            balanceNativeCoin={wallet.balance}
            subname={wallet.subname}
            onDelete={() => setAddressIsDeleted(true)}
          />
        ))
      ) : (
        <p>No personal address, please add one.</p>
      )}

      <h1 className="m-4 text-xl font-bold">Favorite Wallets</h1>
      {bookmarkedAddresses.length > 0 ? (
        bookmarkedAddresses.map((wallet, index) => (
          <AddressCard
            key={index}
            address={wallet.public_key}
            id={wallet.id}
            balanceNativeCoin={wallet.balance}
            subname={wallet.subname}
            onDelete={() => setAddressIsDeleted(true)}
          />
        ))
      ) : (
        <p className="pb-4">No favorite address, please add one.</p>
      )}
      <AddAddressButton onAddAddress={() => setAddressIsAdded(true)} />
    </div>
  );
}
