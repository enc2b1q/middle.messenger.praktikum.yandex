const tpl: string = `
<article class="layout_profileParams_box">
    <div class="layout_profileParams_image_box">
        {{{ profileParams_image_box }}}
    </div>
    {{!-- NOTE: onsubmit сделана заглушка --}}
    <form id="form" action="#" method="POST" onsubmit="return false" class="layout_profileParams_form">
        <div class="layout_profileParams-params_box">
            {{{ profileParams_params_box }}}
        </div>
        <div class="layout_profileParams_buttons_box">
            {{{ profileParams_buttons_box }}}
        </div>
    </form>
</article>
`;

export default tpl;

/*
<div class="layout_profileParams_outer_box">

	<article class="layout_profileParams_box">

		<div class="layout_profileParams_image_box">
			{{#> profileParams_image_box}}
				default profileParams_image_box
			{{/profileParams_image_box}}
		</div>
		{{!-- NOTE: onsubmit сделана заглушка --}}
		<form id="form" action="#" method="POST" onsubmit="return false" class="layout_profileParams_form">
			<div class="layout_profileParams-params_box">
				{{#> profileParams_params_box}}
					default profileParams_params_box
				{{/profileParams_params_box}}

			</div>
			<div class="layout_profileParams_buttons_box">
				{{#> profileParams_buttons_box}}
					default profileParams_buttons_box
				{{/profileParams_buttons_box}}
			</div>
		</form>

	</article>

</div>
*/