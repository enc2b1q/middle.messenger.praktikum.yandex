import tpl from './login.hbs';
import './login.css';

import layoutempty from '../layout/empty'
import pageEnter from '../pages/pageEnter';

const props = {
};
document.getElementById('root').innerHTML = tpl(props);
