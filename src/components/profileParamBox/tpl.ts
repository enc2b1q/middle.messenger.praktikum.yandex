const tpl: string = `
<label for="{{name}}" class="profileParam-label">{{labelText}}</label>
{{{ input }}}
<label for="{{name}}" class="validation">validation data</label>
`;

export default tpl;

/*
<label for="{{name}}" class="profileParam-label">{{labelText}}</label>
<input type="{{type}}"
    id="{{name}}" name="{{name}}"
    class="profileParam-input"
    {{{ readonly }}}
    placeholder="data here">
<label for="{{name}}" class="profileParam-validation">validation data</label>
*/

/*
<div class="profileParamBox">
	<label for="{{name}}" class="profileParam-label">{{labelText}}</label>
	<input type="{{type}}"
		id="{{name}}" name="{{name}}"
		class="profileParam-input"
		{{#if readonly}}readonly="readonly"{{else}}{{/if}}
		placeholder="data here">
	<label for="{{name}}" class="profileParam-validation">validation data</label>
</div>
*/
