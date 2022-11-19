const tpl: string = `
{{{ layoutChatPage }}}
`;

export default tpl;

/*
{{#> layoutChatPage}}

    {{#*inline "sideBar"}}
        {{> layoutChatSideBox}}
    {{/inline}}

    {{#*inline "chat_content_block"}}
        {{> chatEmptyContent}}
    {{/inline}}

{{/layoutChatPage}}
*/
