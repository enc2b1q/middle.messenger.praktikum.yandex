import tpl from './test.hbs';
import './test.css';

import layoutempty from '../layout/empty'
import pageError from '../pages/pageError';

const props = {
    number: '3334',
    text: 'Hey'
};
document.getElementById('root').innerHTML = tpl(props);
