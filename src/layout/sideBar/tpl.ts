const tpl: string = `
<aside class="sideBar elemSideBar {{sizeClass}}">
{{{ sideBar }}}
</aside>
<div class="sideBarContent elemSideBar">
{{{ sideBarContent }}}
</div>
`;

export default tpl;


/*
<div class="container">
  <aside class="sideBar elemSideBar {{#if sizeClass}}{{sizeClass}}{{else}}sideBar-default{{/if}}">
    {{#> sideBar}}
        default sideBar
    {{/sideBar}}
  </aside>
  <div class="sideBarContent elemSideBar">
    {{#> sideBarContent}}
        default sideBarContent
    {{/sideBarContent}}
  </div>
</div>
*/