const tpl: string = `
<div class="layout-login-enter-header">
    {{ loginHeader }}
</div>
{{!-- NOTE: onsubmit сделана заглушка --}}
<form id="form" action="#" method="POST" onsubmit="event.preventDefault();">
    <div class="layout-login-creds-box">
        {{{ loginBody }}}
    </div>
    <div class="layout-login-container-enter-buttons">
        {{{ loginBtns }}}
    </div>
</form>
`;

export default tpl;

/*
 <article class="layout-login-box">
		<div class="layout-login-enter-header">
			{{> loginHeader}}
		</div>
		{{!-- NOTE: onsubmit сделана заглушка --}}
		<form id="form" action="#" method="POST" onsubmit="return false">
			<div class="layout-login-creds-box">
				{{> loginBody }}
			</div>
			<div class="layout-login-empty"></div>
			<div class="layout-login-container-enter-buttons">
				{{> loginBtns }}
			</div>
		</form>
</article>
*/