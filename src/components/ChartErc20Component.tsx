import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registering necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

type TokenData = {
  symbol: string;
  AddressHasErc20: {
    balance: string;
  };
  price_usd: string;
};

type ChartErc20ComponentProps = {
  data: TokenData[];
};

// ChartErc20Component: A functional component to render a Doughnut chart of ERC20 token values
const ChartErc20Component = ({ data }: ChartErc20ComponentProps) => {
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  // Initializing chartData with type ChartData<'doughnut'>
  let chartData: ChartData<'doughnut'>;

  // Processing data to be used in the chart
  if (data && Array.isArray(data)) {
    chartData = {
      labels: data.map((token) => token.symbol),
      datasets: [
        {
          label: 'ERC20 Token Value in USD',
          data: data.map(
            (token) => parseFloat(token.AddressHasErc20.balance) * parseFloat(token.price_usd)
          ),
          backgroundColor: data.map((_, index) => colors[index % colors.length]),
          borderWidth: 1
        }
      ]
    };
  } else {
    chartData = {
      labels: [],
      datasets: []
    };
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="flex flex-col p-2 mx-4 my-4 md:mt-0 bg-grey_block shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-box ">
      <h3 className="m-4 text-base font-bold text-left">
        Overview of ERC20 Holdings in USD at Address
      </h3>
      <div className="pb-4 m-auto md: md:w-1/3">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartErc20Component;
