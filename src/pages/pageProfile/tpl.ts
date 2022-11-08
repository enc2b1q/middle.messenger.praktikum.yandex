const tpl: string = `
{{{ layoutProfile }}}
`;

export default tpl;

/*
{{#> layoutProfile}}

    {{#*inline "sideBar"}}
        {{> backArrowBtn url="/selectChat.html"}}
    {{/inline}}

    {{#*inline "sideBarContent"}}
        {{#> layoutProfileParamsBox}}
            {{#*inline "profileParams_image_box"}}
                {{> boxProfileImage username="name"}}
            {{/inline}}
            {{#*inline "profileParams_params_box"}}
                {{> boxProfile}}
            {{/inline}}
            {{#*inline "profileParams_buttons_box"}}
                {{> boxProfileBtnsEdit}}
            {{/inline}}

        {{/layoutProfileParamsBox}}
    {{/inline}}

{{/layoutProfile}}
*/
