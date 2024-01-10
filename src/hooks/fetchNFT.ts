import { FloorPriceMarketplace } from '../../node_modules/alchemy-sdk';
import { setUpAlchemy } from '../hooks/setUpAlchemy';
import { NFTDataType } from '../@types/NFTDataType';

export async function fetchNFT(address: string): Promise<NFTDataType[]> {
  try {
    const options = {
      'excludeFilters[]': 'SPAM&excludeFilters[]=AIRDROPS',
      pageSize: 20,
      omitMetadata: false
    };
    const nfts = await setUpAlchemy().nft.getNftsForOwner(address, options);
    const nftDataArray: NFTDataType[] = [];

    const nftList = nfts['ownedNfts'];

    for (const nft of nftList) {
      const isSpamContract = await setUpAlchemy().nft.isSpamContract(nft.contract.address);
      const isERC721 = nft.tokenType === 'ERC721';

      const getNftFloorPriceMetadata = await setUpAlchemy().nft.getFloorPrice(nft.contract.address);

      //Assertion de type sur getNftMarketPrice pour confirmé a TS le bon type de l'objet.
      const getNftMarketPrice = getNftFloorPriceMetadata.openSea as FloorPriceMarketplace;
      const nftFloorPrice = `${getNftMarketPrice.floorPrice} ${getNftMarketPrice.priceCurrency}`;

      if (
        nft.collection?.name &&
        nft.image.thumbnailUrl &&
        !isSpamContract.isSpamContract &&
        isERC721
      ) {
        nftDataArray.push({
          id: nft.tokenId,
          contractAddress: nft.contract.address,
          collectionName: nft.collection?.name,
          image: nft.image.thumbnailUrl,
          floorPrice: nftFloorPrice
        });
      }
    }

    return nftDataArray;
  } catch (error) {
    console.error('Internal Function error (fetchNFT()):', error);
    throw error;
  }
}
