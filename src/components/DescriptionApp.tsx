import { useContext } from 'react';
import TradingViewWidget from './TradingViewWidget';
import { Link } from 'react-router-dom';
import { userLoggedContext } from '../context/UserContext';

export default function DescriptionApp() {
  const { isLogged } = useContext(userLoggedContext);

  return (
    <div className="flex flex-col items-center p-2 m-4 mb-16 overflow-y-auto shadow-lg md:my-4 grow rounded-box bg-grey_block scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-700">
      <h2 className="m-4 text-base font-bold text-center md:text-2xl">Welcome to EVMonitor</h2>

      <div className="flex p-4 mx-4 shadow-xl just card bg-dark_grey">
        <p className="text-sm md:text-base">
          Discover a new way to monitor your Ethereum blockchain assets. EVMonitor enables you to
          track everything from personal portfolios to major 'whale' wallets.
        </p>
        <p className="text-sm md:text-base">
          Stay informed about the latest trends and movements in the crypto and NFT space.
        </p>
        <div>
          <p className="m-4 text-sm md:text-base ">
            Our platform provides real-time insights into:
            <ul className="list-disc list-inside">
              <li>Your asset holdings</li>
              <li>Speculative value changes of your portfolio</li>
            </ul>
          </p>
        </div>
        <p className="mt-2 text-sm md:text-base">
          Additionally, create and manage your collection of portfolios to watch, enhancing your
          investment strategy.
        </p>
      </div>
      {!isLogged && (
        <Link to="/signup" className="mt-6 mb-4 btn btn-primary outline outline-white md:mb-0">
          Join EVMonitor today and revolutionize the way you interact with the Ethereum blockchain!
        </Link>
      )}
      <div className="hidden w-2/3 md:m-6 h-2/3 md:block ">
        <TradingViewWidget />
      </div>
    </div>
  );
}
