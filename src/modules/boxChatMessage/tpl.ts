const tpl: string = `
<div class="boxChatMessage_inner">
    <div class="boxChatMessage_attach_box">
    </div>
    {{!-- NOTE: onsubmit сделана заглушка --}}
    <form id="form" action="#" method="POST" onsubmit="return false" class="boxChatMessage_form">
        <div class="boxChatMessage_input_box">
            <input type="text" id="message" name="message" class="boxChatMessage_input">
        </div>
        <div class="boxChatMessage_send_box">
            <input type="submit" id="boxChatMessage_send_btn-id" name="boxChatMessage_send_btn-id" class="boxChatMessage_send_btn" value="&rarr;">
        </div>
    </form>
</div>
`;

export default tpl;

/*
<div class="boxChatMessage_wrapper">
    <div class="boxChatMessage_inner">
        <div class="boxChatMessage_attach_box">
        </div>
        {{!-- NOTE: onsubmit сделана заглушка --}}
		<form id="form" action="#" method="POST" onsubmit="return false" class="boxChatMessage_form">
            <div class="boxChatMessage_input_box">
                <input type="text" id="message" name="message" class="boxChatMessage_input">
            </div>
            <div class="boxChatMessage_send_box">
                <input type="submit" id="boxChatMessage_send_btn-id" name="boxChatMessage_send_btn-id" class="boxChatMessage_send_btn" value="&rarr;">
            </div>
        </form>
    </div>
</div>
*/