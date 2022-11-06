const tpl: string = `
{{{ layoutLogin }}}
`;

export default tpl;

/*
{{#> layoutLogin}}
  {{#*inline "loginHeader"}}
		Регистрация
  {{/inline}}
  {{#*inline "loginBody"}}
		{{> boxRegister }}
  {{/inline}}
  {{#*inline "loginBtns"}}
		{{> button id='btnEnterId' text='Зарегистрироваться' url='#'}}
		{{> link id="lnkRegId" url='login.html' text='Войти' }}
  {{/inline}}
{{/layoutLogin}}
*/