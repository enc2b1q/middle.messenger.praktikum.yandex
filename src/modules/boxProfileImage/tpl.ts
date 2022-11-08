const tpl: string = `
<div class="image-box-inner">
    <div class="image-box">
        <div class="image-self">
            
        </div>
    </div>
    <span class="image-username">
        {{username}}
    </span>
</div>
`;

export default tpl;

/*
<div class="image-outerBox">
    <div class="image-box-inner">
        <div class="image-box">
            <div class="image-self">

            </div>
        </div>
        <span class="image-username">
            {{#if username}}{{username}}{{else}}&nbsp;{{/if}}
        </span>
    </div>
</div>
*/
