export type Erc721Token = {
  id: number;
  contract_address: string;
  collection_name: string;
  token_id: number;
  floor_price: string;
  image: string;
};

export type Erc721TokenData = {
  id: number;
  public_key: string;
  erc721s: Erc721Token[];
};

const Erc721Component = ({ data }: { data: Erc721TokenData[] }) => {
  return (
    <div className="flex flex-col p-2 mx-4 md:mt-0 rounded-box md:max-h-[75vh] bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-neutral-500 list scrollbar-track-neutral-700">
        <h2 className="m-4 text-base font-bold">NFT</h2>

        {data[0].erc721s.length > 0 ? (
          data[0].erc721s.map((nft) => (
            <div key={nft.id} className="p-2 m-2 border rounded">
              <div className="flex items-center">
                <img src={nft.image} alt={`${nft.collection_name}`} className="w-20 h-20 mr-2" />
                <div>
                  <h3 className="font-bold">{nft.collection_name}</h3>
                  <p>Token ID: {nft.token_id}</p>
                  <p>Floor Price: {nft.floor_price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center mb-10">
            <p>No NFTs found for this address.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Erc721Component;
