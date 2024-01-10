export type Erc20Token = {
  id: number;
  contract_address: string;
  name: string;
  logo: string;
  total_supply: string;
  symbol: string;
  price_usd: string;
  price_eth: string;
  createdAt: string;
  updatedAt: string;
  AddressHasErc20: {
    balance: string;
  };
};

export type Erc20DataItem = {
  id: number;
  public_key: string;
  createdAt: string;
  updatedAt: string;
  erc20s: Erc20Token[];
};
