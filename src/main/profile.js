import tpl from './profile.hbs';
import './profile.css';


import pageProfile from '../pages/pageProfile'

const props = {
};
document.getElementById('root').innerHTML = tpl(props);
