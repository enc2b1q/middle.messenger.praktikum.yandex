const tpl: string = `
{{{ layoutLogin }}}
`;

export default tpl;

/*
{{#> layoutLogin}}
  {{#*inline "loginHeader"}}
		Вход
  {{/inline}}
  {{#*inline "loginBody"}}
		{{> boxLogin }}
  {{/inline}}
  {{#*inline "loginBtns"}}
		{{> button id='btnEnterId' text='Войти' url='/selectChat.html'}}
		{{> link id="lnkRegId" url='/signIn.html' text='Нет аккаунта?' }}
  {{/inline}}
{{/layoutLogin}}
*/
