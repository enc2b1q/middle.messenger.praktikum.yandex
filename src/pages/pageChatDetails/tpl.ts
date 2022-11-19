const tpl: string = `
{{{ layoutChatPage }}}
`;

export default tpl;

/*
{{#> layoutChatPage}}

    {{#*inline "sideBar"}}
        {{> layoutChatSideBox}}
    {{/inline}}

    {{#*inline "chat_content_header"}}
        {{> boxChatHeader}}
    {{/inline}}
    {{#*inline "chat_content_block"}}
        Контент чата
    {{/inline}}
    {{#*inline "chat_content_footer"}}
        {{> boxChatMessage}}
    {{/inline}}

{{/layoutChatPage}}
*/
