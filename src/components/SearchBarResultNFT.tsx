import { NFTDataType } from '../@types/NFTDataType';

type AddressResultProps = {
  nftsResult: NFTDataType[];
};

function SearchBarResultNFT({ nftsResult }: AddressResultProps) {
  return (
    <div className="flex flex-col grow md:max-h-[80vh] p-2 mx-4 md:overflow-y-auto md:mt-0 bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-box ERC20Component">
      <div className="flex flex-col justify-start h-full overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-neutral-500 list scrollbar-track-neutral-700">
        <h2 className="m-4 text-base font-bold">NFT</h2>
        <p></p>
        {nftsResult.map((nft) => (
          <div key={nft.id} className="p-2 m-2 border rounded">
            <div className="flex items-center">
              <img src={nft.image} alt={`${nft.collectionName}`} className="w-20 h-20 mr-2" />
              <div>
                <h3 className="font-bold">{nft.collectionName}</h3>

                <p>Floor Price: {nft.floorPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBarResultNFT;
