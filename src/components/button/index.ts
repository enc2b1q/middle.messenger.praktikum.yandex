import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class Button extends Block {
	render() {
		console.log('button render');
		return this.compile(tpl);
	}

	addEvents() {
		this._element.querySelectorAll('.button').forEach(el => {
			if (this._props?.events){
				Object.entries(this._props.events).forEach(([key, value]) =>
					el.addEventListener(key, value)
				);
			}
		});
		super.addEvents();
	}
}

export const boxProfilePersonEditBtnSaveBts = new Button(
	"button",
	{
		text: "Сохранить",
		attr: {
			id: "btnSaveId",
			type: "submit",
			class : "button",
		},
		// events: {
		// 	click: (e: Event) => {
		// 		const target = e.target;
		// 		if(!target) {
		// 			return;
		// 		}
		// 		// window.location.assign(window.location.href + "#");
		// 		e.preventDefault();
		// 		e.stopPropagation();
		// 		processFormData();
		// 	},
		// },

	}
);


// Handlebars.registerPartial('button', tpl);
//
// export default (id, url, text) => {
// 	return tpl({ id, url, text});
// }
