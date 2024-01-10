import { useParams } from 'react-router-dom';
import useFetchDetailsAddress from '../../hooks/fetchDetailsAddress';
import ChartErc20Component from '../ChartErc20Component';
import Erc20Component from '../Erc20Component';
import Erc721Component from '../Erc721Component';
import Overview from '../Overview';
import { useState } from 'react';

export default function DetailAddressPage() {
  const { address } = useParams();
  const { dataErc20, dataErc721, isLoading, fetchDetailsAddress } = useFetchDetailsAddress();
  const [isRefreshing, setIsRefreshing] = useState(false); // état local pour le bouton refresh

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-h-screen md:overflow-hidden md:mx-4 rounded-box bg-dark_grey">
        <div className="flex flex-col gap-4 ">
          <div className="h-24 mb-4 md:mx-4 skeleton bg-grey_block"></div>
          <div className="flex flex-row h-screen">
            <div className="w-1/2 mx-4 skeleton bg-grey_block h-5/6"></div>
            <div className="w-1/2 mx-4 skeleton bg-grey_block h-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  async function handleRefresh() {
    try {
      setIsRefreshing(true);
      await fetch(`http://localhost:3000/addresses/${address}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      fetchDetailsAddress();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  }
  return (
    <div className="flex flex-col w-screen max-h-screen md:mx-4 rounded-box bg-dark_grey detailPage">
      <Overview />
      <div className="flex flex-row items-center justify-between m-4 mt-16 md:mt-4 p-2">
        <h2 className="text-lg font-bold">Address details</h2>
        <button className="btn btn-outline" onClick={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? (
            <>
              Loading <span className="loading loading-dots loading-xs"></span>
            </>
          ) : (
            'Refresh data'
          )}
        </button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-none md:flex-row mb-16 md:mb-0">
        <div className="flex flex-col md:w-1/2">
          {dataErc20[0].erc20s && dataErc20[0].erc20s.length > 0 ? (
            <>
              <ChartErc20Component data={dataErc20[0].erc20s} />
              <Erc20Component data={dataErc20} />
            </>
          ) : (
            <div className="flex flex-col grow md:max-h-[40vh] p-2 mx-4 md:overflow-y-auto md:mt-0 bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-box ERC20Component">
              <h3 className="m-4 text-base font-bold">Token ERC20</h3>
              <div className="flex items-center justify-center mb-10">
                <p>No ERC20 data available.</p>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <Erc721Component data={dataErc721} />
        </div>
      </div>
    </div>
  );
}
