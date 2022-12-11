const tpl: string = `
<div class="boxChatHeader_inner">
    <div class="boxChatHeader_image_box"></div>
    <div class="boxChatHeader_username_box">
        <span class="boxChatHeader_username">Username</span>
    </div>
    <div class="boxChatHeader_btn_box">
        {{{ menuBtn }}}
    </div>
    <div class="boxChatHeader_menu">
        {{{ btnAdd }}}
        {{{ btnDelete }}}
        {{{ btnDeleteChat }}}
    </div>    
</div>
`;

export default tpl;
