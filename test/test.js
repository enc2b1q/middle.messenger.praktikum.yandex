const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM('<div id="root"></div>', {
        url: 'http://localhost:3000'
    }
);
const {document, FormData} = window;
global.window = window;
global.document = document;
global.XMLHttpRequest = window.XMLHttpRequest;
global.FormData = FormData;
