import { setUpAlchemy } from '../hooks/setUpAlchemy';
import { ERC20DataType } from '../@types/ERC20DataType';

export async function fetchERC20(address: string): Promise<ERC20DataType[]> {
  try {
    const balances = await setUpAlchemy().core.getTokenBalances(address);

    const erc20DataArray: ERC20DataType[] = [];
    //On vérifie que la balance est bien un nombre et supérieur a 0
    const filteredBalances = balances.tokenBalances.filter((token) => {
      const balanceValue = Number(token.tokenBalance);
      const isValidBalance = !isNaN(balanceValue) && balanceValue > 0;

      return isValidBalance;
    });

    //Ici on boucle sur le tableau d'objet que nous renvoie l'API et on fait quelques check pour éviter les SPAM
    for (const token of filteredBalances) {
      const erc20 = await setUpAlchemy().core.getTokenMetadata(token.contractAddress);

      if (
        erc20.name &&
        erc20.decimals !== null &&
        erc20.symbol !== null &&
        !erc20.name.startsWith('$') &&
        !erc20.name.startsWith('#') &&
        !erc20.name.endsWith('.com') &&
        !erc20.name.endsWith('.site')
      ) {
        //On convertie le résultat en nombre plus lisible
        const rawBalance = Number(token.tokenBalance);
        const decimals = erc20.decimals;
        const balance = rawBalance / Math.pow(10, decimals);
        const formattedBalance = parseFloat(balance.toFixed(4));

        //On vérifie que apres la balance ne soit pas égale a 0 après le .toFixed
        if (formattedBalance !== 0) {
          erc20DataArray.push({
            tokenAddress: token.contractAddress,
            decimals: erc20.decimals,
            logo: erc20.logo,
            name: erc20.name,
            symbol: erc20.symbol,
            balance: formattedBalance
          });
        }
      }
    }

    return erc20DataArray;
  } catch (error) {
    console.error('Internal Function error (fetchERC20()):', error);
    throw error;
  }
}
