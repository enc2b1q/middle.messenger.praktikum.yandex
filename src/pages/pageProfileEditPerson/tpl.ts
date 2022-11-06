const tpl: string = `
{{{ layoutProfile }}}
`;

export default tpl;

/*
{{#> layoutProfile}}

    {{#*inline "sideBar"}}
        {{> backArrowBtn url="/profile.html"}}
    {{/inline}}

    {{#*inline "sideBarContent"}}
        {{#> layoutProfileParamsBox}}
            {{#*inline "profileParams_image_box"}}
                {{> boxProfileImage}}
            {{/inline}}
            {{#*inline "profileParams_params_box"}}
                {{> boxProfileEditPerson}}
            {{/inline}}
            {{#*inline "profileParams_buttons_box"}}
                {{> boxProfilePersonEditBtn}}
            {{/inline}}

        {{/layoutProfileParamsBox}}
    {{/inline}}

{{/layoutProfile}}
*/