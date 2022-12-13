const tpl = `
{{> inputBox name="email" labelText='Почта' type='email' }}
{{> inputBox name="login" labelText='Логин' type='text' }}
{{> inputBox name="first_name" labelText='Имя' type='text' }}
{{> inputBox name="second_name" labelText='Фамилия' type='text' }}
{{> inputBox name="phone" labelText='Телефон' type='tel' }}
{{> inputBox name="password" labelText='Пароль' type='password' }}
{{> inputBox name="password_repeat" labelText='Пароль (ещё раз)' type='password' }}
`;

export default tpl;
