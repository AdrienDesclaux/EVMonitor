import { useState, useEffect } from 'react';
import { ERC20DataType } from '../../@types/ERC20DataType';
import { NFTDataType } from '../../@types/NFTDataType';
import { fetchNFT } from '../../hooks/fetchNFT';
import { fetchERC20 } from '../../hooks/fetchERC20';
import Message from '../Message';
import SearchBarResultERC20 from '../SearchBarResultERC20';
import SearchBarResultNFT from '../SearchBarResultNFT';
import NavBar from '../NavBar';
import DescriptionApp from '../DescriptionApp';
//Address test = 0x50636eA92A6EA8Bce533CCFee02D5C8E4384fe50    0x8F245CCDF8B9145902A5A7Ee894a2Dcd96A7Af6e

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState({ text: '', type: 'info' });
  const [searchResultsNFT, setSearchResultsNFT] = useState<NFTDataType[]>([]);
  const [searchResultsERC20, setSearchResultsERC20] = useState<ERC20DataType[]>([]);

  //On vérifie ici que c'est bien le format d'une addresse ethereum qui est entrée dans le champ.
  const handleSearchQuery = (query: string) => {
    const cleanedQuery = query.trim();
    const isValidEthereumAddress =
      cleanedQuery.length === 42 && cleanedQuery.toLowerCase().startsWith('0x');

    if (isValidEthereumAddress) {
      setSearchQuery(cleanedQuery);
      setSearchResultsERC20([]);
      setSearchResultsNFT([]);
    } else {
      setMessage({
        text: 'Veuillez entrer une adresse Ethereum valide.',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    //C'est ici qu'on fait appel a la fonction qui fetch les données API avec la recherche de l'utilisateur
    const fetchData = async () => {
      if (searchQuery) {
        try {
          setIsLoading(true);
          const address = searchQuery;
          const filteredErc20 = await fetchERC20(address);
          const filteredNfts = await fetchNFT(address);

          if (filteredErc20.length === 0 && filteredNfts.length === 0) {
            setMessage({
              text: 'Aucun résultat trouvé',
              type: 'error'
            });
          } else {
            setSearchResultsERC20((prevResults) => [...prevResults, ...filteredErc20]);
            setSearchResultsNFT((prevResults) => [...prevResults, ...filteredNfts]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setMessage({
            text: "Une erreur s'est produite lors de la recherche",
            type: 'error'
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="flex flex-col justify-start w-screen h-screen grow rounded-box bg-dark_grey md:mx-4 homepage">
      <NavBar onSearch={handleSearchQuery} isLoading={isLoading} />

      {/* Render DescriptionApp only if no search results are found */}
      {searchResultsERC20.length === 0 && searchResultsNFT.length === 0 && <DescriptionApp />}

      <section>{message.text && <Message text={message.text} type={message.type} />}</section>

      {!isLoading && (searchResultsERC20.length > 0 || searchResultsNFT.length > 0) && (
        <>
          <h2 className="mx-6 mb-2 text-lg font-bold md:mt-4">Address details</h2>

          <div className="flex flex-col w-full md:flex-row overflow-y-auto mb-16 md:mb-4">
            {searchResultsERC20.length > 0 && (
              <div className="p-4 md:w-1/2">
                <SearchBarResultERC20 results={searchResultsERC20} />
              </div>
            )}

            {searchResultsNFT.length > 0 && (
              <>
                {searchResultsERC20.length > 0 && (
                  <div className="divider lg:divider-horizontal"></div>
                )}
                <div className="p-4 md:w-1/2">
                  <SearchBarResultNFT nftsResult={searchResultsNFT} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
