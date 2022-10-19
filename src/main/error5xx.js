import tpl from './error5xx.hbs';
import './error5xx.css';

import layoutempty from '../layout/empty'
import pageError from '../pages/pageError';

const props = {
    number: '500',
    text: 'Мы уже фиксим'
};
document.getElementById('root').innerHTML = tpl(props);
