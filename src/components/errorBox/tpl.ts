const tpl: string = `
<header class="number">{{number}}</header>
<div class="text">{{text}}</div>
{{{ link }}}
`;

export default tpl;

/*
<section id="{{id}}" class="errorBox">
	<header class="number">{{number}}</header>
	<div class="text">{{text}}</div>
	{{> link id="lnkBackId" url='/selectChat.html' text='Назад к чатам' }}
</section>
*/
