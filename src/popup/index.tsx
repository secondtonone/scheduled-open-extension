import { createRoot } from 'react-dom/client';
import Popup from './Popup';

import './styles.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode  as HTMLElement);

root.render(<Popup />);
