const tpl = `
{{#> layoutSideBar sizeClass="sideBar-big" }}
    {{#*inline "sideBarContent"}}
        {{> layoutChatContentBox}}
    {{/inline}}
{{/layoutSideBar}}
`;

export default tpl;
