const tpl: string = `
<div class="image-box-inner">
        <div class="image-box">
            {{{uploadImageForm}}}
        </div>
        <span class="image-username">
            {{username}}
        </span>
</div>
`;

export default tpl;

/*
<div class="image-box-inner">
        <div class="image-box">
            <form id="uploadImageForm" name="uploadImageForm" class="uploadImageFrm">
                <div class="image-self">

                </div>
                <div class="image-self-over">
                    <label for="fileElem" class="image-self-over-label">Поменять аватар</label>
                </div>
                <input
                  type="file"
                  id="fileElem"
                  accept="image/png, image/jpeg"
                  style="display:none" />
              </form>
        </div>
        <span class="image-username">
            {{username}}
        </span>
</div>
*/

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
