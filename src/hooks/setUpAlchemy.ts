import { Alchemy, Network } from 'alchemy-sdk';

export function setUpAlchemy() {
  //Setup alchemy
  //TODO  .env API_KEY
  const alchemyApiKey = 'WbQQ8Z4RKr3r91qBrMwOdHwLwF0FIVf7';
  const alchemy = new Alchemy({
    apiKey: alchemyApiKey,
    network: Network.ETH_MAINNET
  });
  return alchemy;
}
