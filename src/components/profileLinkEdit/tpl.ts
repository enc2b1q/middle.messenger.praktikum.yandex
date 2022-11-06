const tpl: string = `
<a href="{{url}}" class={{profileLinkEdit_color_class}}>{{linkText}}</a>
`;

export default tpl;

/*
<nav class="profileLinkEdit {{#if profileLinkEdit_text_align_class}}{{profileLinkEdit_text_align_class}}{{else}}profileLinkEdit_text_align_start{{/if}}">
	<a href="{{url}}" class={{#if profileLinkEdit_color_class}}{{profileLinkEdit_color_class}}{{else}}"profileLinkEdit_a_blue"{{/if}}>{{linkText}}</a>
</nav>

*/