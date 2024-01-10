import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './Router.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<RouterProvider router={router} />);
