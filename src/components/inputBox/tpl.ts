const tpl: string = `
<label for="{{name}}" class="small-label">{{labelText}}</label>
{{{ input }}}
<label for="{{name}}" class="validation">validation data</label>
`;

export default tpl;

/*
<label for="{{name}}" class="small-label">{{labelText}}</label>
<input type="{{type}}" id="{{name}}" name="{{name}}" class="input-with-bottom-line">
<label for="{{name}}" class="validation">validation data</label>
*/

/*
<div class="inputBox">
	<label for="{{name}}" class="small-label">{{labelText}}</label>
	<input type="{{type}}" id="{{name}}" name="{{name}}" class="input-with-bottom-line">
	<label for="{{name}}" class="validation">validation data</label>
</div>
*/