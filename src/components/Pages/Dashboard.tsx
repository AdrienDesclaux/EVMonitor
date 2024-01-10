import AllAddresses from '../AllAddresses';
import Overview from '../Overview';

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-start h-screen w-screen grow rounded-box bg-dark_grey md:mx-4 dashboard">
      <Overview />
      <AllAddresses />
    </div>
  );
}
