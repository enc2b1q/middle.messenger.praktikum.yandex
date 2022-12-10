const tpl: string = `
<div class="chatListItem_image_wrapper">
    <div class="chatListItem_image">
    
    </div>
</div>
<div class="chatListItem_text_wrapper">
    <div class="chatListItem_text_chatName">
        {{ title }}
    </div>
    <div class="chatListItem_text_lastMsgPreview">
        <span class="chatListItem_text_lastMsgPreview_user">
        {{ lastUser }}
        </span>
        <span class="chatListItem_text_lastMsgPreview_text">
        {{ messageText }}
        </span>
    </div>
</div>
<div class="chatListItem_numbers_wrapper">
    <div class="chatListItem_numbers_date">
        {{ dateTime }}
    </div>
    <div class="chatListItem_numbers_num_wrapper">
        <span class="chatListItem_numbers_num">
        {{ unread_count }}
        </span>
    </div>
</div>

`;

export default tpl;
