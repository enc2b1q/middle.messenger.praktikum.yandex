const tpl = `
<div class="layout_chatSideBox_header layout_chatSideBox_elem">
    <div class="layout_chatSideBox_header_profileLinkBox">
        {{{ chatAddBtn }}}
        {{{ profileLink }}}
    </div>
    <div class="layout_chatSideBox_header_searchBox">
        {{!-- NOTE: onsubmit сделана заглушка --}}
        {{{ formChatSideBox }}}
    </div>
</div>
<div class="layout_chatSideBox_chatList">
    {{{ boxChatList }}}
</div>
`;

export default tpl;
