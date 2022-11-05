import tpl from './chatDetails.hbs';
import './chatDetails.scss';

import pageChatDetails from '../pages/pageChatDetails';

const props = {
};
document.getElementById('root').innerHTML = tpl(props);
