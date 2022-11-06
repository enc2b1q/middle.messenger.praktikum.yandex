const tpl: string = `
{{#each items}}
    {{{this}}}   
{{/each}}
`;

export default tpl;

/*
{{> inputBox name="login" labelText='Логин' type='text' }}
{{> inputBox name="password" labelText='Пароль' type='password' }}
*/