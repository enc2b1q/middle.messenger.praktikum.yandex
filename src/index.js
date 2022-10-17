if (module.hot) {
    module.hot.accept();
}

// import './styles-native.css'; 

import styles from './styles-native.css';

import * as classes from './modules/style.module.scss';

// document.body.className = classes.body;

console.log('test');

// const Handlebars = require("handlebars");
import Handlebars from "handlebars";

const template = Handlebars.compile("user: {{name}}");
console.log(template({ name: "testuser" }));