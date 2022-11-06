const tpl: string = `
{{> profileParamBox name="email" labelText='Почта' type='email' readonly="readonly" }}
{{> profileParamBox name="login" labelText='Логин' type='text' readonly="readonly" }}
{{> profileParamBox name="first_name" labelText='Имя' type='text' readonly="readonly" }}
{{> profileParamBox name="second_name" labelText='Фамилия' type='text' readonly="readonly" }}
{{> profileParamBox name="display_name" labelText='Имя в чате' type='text' readonly="readonly" }}
{{> profileParamBox name="phone" labelText='Телефон' type='tel' readonly="readonly" }}
`;

export default tpl;

/*
{{> profileParamBox name="email" labelText='Почта' type='email' readonly="readonly" }}
{{> profileParamBox name="login" labelText='Логин' type='text' readonly="readonly" }}
{{> profileParamBox name="first_name" labelText='Имя' type='text' readonly="readonly" }}
{{> profileParamBox name="second_name" labelText='Фамилия' type='text' readonly="readonly" }}
{{> profileParamBox name="display_name" labelText='Имя в чате' type='text' readonly="readonly" }}
{{> profileParamBox name="phone" labelText='Телефон' type='tel' readonly="readonly" }}
*/