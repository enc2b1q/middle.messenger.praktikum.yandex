import tpl from './chatDetails.hbs';
import './chatDetails.css';

import pageChatDetails from '../pages/pageChatDetails';

const props = {
};
document.getElementById('root').innerHTML = tpl(props);
