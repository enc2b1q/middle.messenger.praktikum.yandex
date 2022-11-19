const tpl: string = `
<div class="chat_content_head">
    {{{ chat_content_header }}}
</div>
<div class="chat_content_body">
    {{{ chat_content_block }}} 
</div>
<div class="chat_content_nav">
    {{{ chat_content_footer }}}
</div>
`;

export default tpl;

/*
div class="chat_content_wrapper">
	<div class="chat_content_head">
		{{#> chat_content_header}}
		{{/chat_content_header}}
	</div>
	<div class="chat_content_body">
	{{#> chat_content_block}}
		default chat_content_block
	{{/chat_content_block}}
	</div>
	<div class="chat_content_nav">
		{{#> chat_content_footer}}
		{{/chat_content_footer}}
	</div>

</div>
*/
