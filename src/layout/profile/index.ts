import tpl from './tpl';
import './style.scss';
import Block from "../../services/block";

export default class LayoutProfile extends Block {
    render() {
        console.log('layoutProfile render');
        return this.compile(tpl);
    }
}

// import layoutSideBar from '../sideBar';
//
// Handlebars.registerPartial('layoutProfile', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
