import { Erc20DataItem } from '../@types/Erc20Token';

const Erc20Component = ({ data }: { data: Erc20DataItem[] }) => {
  const defaultLogo = '/inconnu_erc20.png';

  return (
    <div className="flex flex-col grow md:max-h-[37vh] p-2 mx-4 md:overflow-y-auto md:mt-0 bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-box ERC20Component">
      <div className="flex flex-col justify-start h-full overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-neutral-500 list scrollbar-track-neutral-700">
        <h2 className="m-4 text-base font-bold">Token ERC20</h2>
        {data.map((parentToken) =>
          parentToken.erc20s.map((token) => {
            const totalValueInUSD =
              parseFloat(token.price_usd) * parseFloat(token.AddressHasErc20.balance);
            return (
              <div key={token.id}>
                <div className="p-2 m-2 border rounded">
                  <div className="flex items-center">
                    <img
                      src={token.logo || defaultLogo}
                      alt={`${token.name} logo`}
                      className="w-8 h-8 mr-2"
                    />
                    <h3 className="font-bold">
                      {token.name} ({token.symbol})
                    </h3>
                  </div>
                  <p>Price (USD): {token.price_usd}</p>
                  <p>Price (ETH): {token.price_eth}</p>
                  <p>Total Value (USD): {totalValueInUSD.toFixed(2)}</p>
                  <p>Balance : {token.AddressHasErc20.balance}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Erc20Component;
