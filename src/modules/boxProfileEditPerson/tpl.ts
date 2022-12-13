const tpl = `
{{> profileParamBox name="email" labelText='Почта' type='email' }}
{{> profileParamBox name="login" labelText='Логин' type='text' }}
{{> profileParamBox name="first_name" labelText='Имя' type='text' }}
{{> profileParamBox name="second_name" labelText='Фамилия' type='text' }}
{{> profileParamBox name="display_name" labelText='Имя в чате' type='text' }}
{{> profileParamBox name="phone" labelText='Телефон' type='tel' }}
`;

export default tpl;
