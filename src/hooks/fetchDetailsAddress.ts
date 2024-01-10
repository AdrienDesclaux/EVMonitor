import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Erc20DataItem } from '../@types/Erc20Token';
const useFetchDetailsAddress = () => {
  const { address } = useParams();
  const [dataErc20, setDataErc20] = useState<Erc20DataItem[]>([]);
  const [dataErc721, setDataErc721] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetailsAddress = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/addresses/${address}`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      setDataErc20(data.data.erc20Data);
      setDataErc721(data.data.erc721Data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsAddress();
  }, [address]);

  return { dataErc20, dataErc721, isLoading, setIsLoading, fetchDetailsAddress };
};

export default useFetchDetailsAddress;
