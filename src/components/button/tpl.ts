const tpl: string = `
<span>{{text}}</span>
`;

export default tpl;

/*
<button id="{{id}}" type="submit" class="button" {{#if url}}onclick="window.location.href='{{url}}';"{{else}}{{/if}}>
	{{text}}
</button>
*/
