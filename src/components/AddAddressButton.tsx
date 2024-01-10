import { useEffect, useState } from 'react';
import { tPostAddress } from '../@types/tPostAddress';
import fetchAPI_EVMonitor from '../hooks/fetchAPI_EVMonitor';
interface AddAddressButtonProps {
  onAddAddress: () => void;
}

export default function AddAddressButton({ onAddAddress }: AddAddressButtonProps) {
  // State to hold the address input by the user
  const [address, setAddress] = useState<string>('');
  const [subname, setSubname] = useState<string>('');
  // State to hold the alerts from the back
  const [otherAlert, setOtherAlert] = useState<{ tilt: boolean; error: string }>({
    tilt: false,
    error: ''
  });
  /**
   * Handles adding an address as either a favorite or owned.
   * It makes a POST request to the server with the address,
   * and flags for whether the address is a favorite or owned.
   */
  const handleAddAddress = async (isFavorite: boolean, isOwned: boolean) => {
    setOtherAlert({ tilt: false, error: '' });
    if (address === '' || subname === '') {
      return setOtherAlert({ tilt: true, error: `Please fill all information` });
    }
    const fetchParams = {
      route: '/addresses',
      method: 'post'
    };
    const payload: tPostAddress = {
      address,
      isFavorite,
      isOwned,
      subname
    };
    try {
      await fetchAPI_EVMonitor(fetchParams, payload);
      onAddAddress();
    } catch (error) {
      console.error(error);
      setOtherAlert({ tilt: true, error: `${error}` });
    }
  };

  // Updates the address state based on user input.
  const handleInputAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  // Updates the subname state based on user input
  const handleInputSubnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubname(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOtherAlert({ tilt: false, error: '' });
    }, 3000);

    return () => clearTimeout(timer);
  }, [otherAlert]);

  return (
    <div className="flex flex-col items-center justify-center w-11/12 m-2 addAddressForm">
      <label className="w-full m-4 md:w-1/2 form-control">
        <div className="label">
          <span className="label-text">Which address would you like to add? </span>
        </div>
        <input
          type="text"
          required
          placeholder="Type here"
          className="w-full input input-bordered bg-dark_grey"
          value={address}
          onChange={handleInputAddressChange}
        />
      </label>
      <label className="w-full m-4 md:w-1/2 form-control">
        <div className="label">
          <span className="label-text">Name of the address : </span>
        </div>
        <input
          type="text"
          maxLength={15}
          required
          placeholder="Type here"
          className="w-full input input-bordered bg-dark_grey"
          value={subname}
          onChange={handleInputSubnameChange}
        />
      </label>
      <div className="flex flex-row justify-center w-1/2 gap-5 md:w-full md:gap-10">
        <button
          className="btn px-1 text-xs md:text-base md:p-2 bg-dark_grey outline outline-gray hover:bg-blue_nav text-blue_light"
          onClick={() => handleAddAddress(false, true)}>
          Add to owned
        </button>
        <button
          className="btn px-1 text-xs md:text-base md:p-2 bg-dark_grey outline outline-gray hover:bg-blue_nav text-blue_light"
          onClick={() => handleAddAddress(true, false)}>
          Add to favorite
        </button>
      </div>
      {otherAlert.tilt && (
        <div className="alert alert-error toast toast-center md:toast-end toast-bottom mx-auto w-fit md:mr-4 mb-16">
          <span className="text-xs">{otherAlert.error}</span>
        </div>
      )}
    </div>
  );
}
