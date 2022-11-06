const tpl: string = `
<div class="layout_chatSideBox_header layout_chatSideBox_elem">
    <div class="layout_chatSideBox_header_profileLinkBox">
        {{{ profileLink }}}
    </div>
    <div class="layout_chatSideBox_header_searchBox">
        {{!-- NOTE: onsubmit сделана заглушка --}}
        <form id="form" action="#" method="POST" onsubmit="event.preventDefault();" class="layout_chatSideBox_searchBox_form">
            <input type="text" id="search" name="search" class="layout_chatSideBox_searchBox_input" placeholder="Поиск">
            <input type="submit" id="search-submit" hidden />
        </form>
    </div>
</div>
<div class="layout_chatSideBox_chatList">
    {{{ boxChatList }}}
</div>
`;

export default tpl;

/*
<div class="layout_chatSideBox_wrapper_box">
	<div class="layout_chatSideBox_header layout_chatSideBox_elem">
		<div class="layout_chatSideBox_header_profileLinkBox">
			{{> profileLinkEdit url="/profile.html" linkText="Профиль >" profileLinkEdit_color_class="profileLinkEdit_a_gray" profileLinkEdit_text_align_class="profileLinkEdit_text_align_end"}}
		</div>
		<div class="layout_chatSideBox_header_searchBox">
			{{!-- NOTE: onsubmit сделана заглушка --}}
			<form id="form" action="#" method="POST" onsubmit="return false" class="layout_chatSideBox_searchBox_form">
				<input type="text" id="search" name="search" class="layout_chatSideBox_searchBox_input" placeholder="Поиск">
				<input type="submit" id="search-submit" hidden />
			</form>
		</div>
	</div>
	<div class="layout_chatSideBox_chatList layout_chatSideBox_elem">
		{{> boxChatList}}
	</div>
</div>
*/