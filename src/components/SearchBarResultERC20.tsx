import { ERC20DataType } from '../@types/ERC20DataType';

type AddressResultProps = {
  results: ERC20DataType[];
};

function SearchBarResultERC20({ results }: AddressResultProps) {
  const defaultLogo = '/inconnu_erc20.png';
  return (
    <div>
      <div className="flex flex-col grow md:max-h-[80vh] p-2 mx-4 md:overflow-y-auto md:mt-0 bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-box ERC20Component">
        <div className="flex flex-col justify-start h-full overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-neutral-500 list scrollbar-track-neutral-700">
          <h2 className="m-4 text-base font-bold">Token ERC20</h2>
          {results.map((token) => (
            <div key={token.symbol} className="p-2 m-2 border rounded">
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
              <p>Balance : {token.balance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBarResultERC20;
