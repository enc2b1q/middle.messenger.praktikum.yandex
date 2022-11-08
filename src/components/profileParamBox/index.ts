import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import GenericTag from "../genericTag";
import * as validator from "../../utils/processFormData";
import { validationInputHandler} from "../../utils/processFormData";

export default class ProfileParamBox extends Block {
	render() {
		console.log('profileParamBox render');
		return this.compile(tpl);
	}
}

export function getNewProfileParamInput(props: { validatorPropName: string, type?: string, className?: string , readonly?: string } ): GenericTag {
	const defaultProps = { validatorPropName: "", type: "text", className: "profileParam-input", readonly: ""};
	if(!props) {
		props = defaultProps;
	}

	let attr: {
		type: string,
		id: string,
		name: string,
		class: string,
		pattern?: string,
		title?: string,
		readonly? : string,
		placeholder?: string
	} = {
			type: props.type ?? defaultProps.type,
			id: props.validatorPropName,
			name: props.validatorPropName,
			class: props.className ?? defaultProps.className,
			placeholder: "data here",
	};
	if (props.readonly){
		attr["readonly"] = "readonly";
	}
	else {
		attr["pattern"] = validator.getValidationPatternString(props.validatorPropName);
		attr["title"] = validator.getValidationMsg(props.validatorPropName);
	}

	return new GenericTag (
		"input",
		{
			attr: attr,
			events: {
				focus: validationInputHandler,
				blur: validationInputHandler,
			},
		}
	);
}


// Handlebars.registerPartial('profileParamBox', tpl);
//
// export default (props = {}) => {
// 	return tpl({props});
// }
