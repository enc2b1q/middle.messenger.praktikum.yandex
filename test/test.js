const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM('<div id="root"></div>', {
        url: 'http://localhost:3000'
    }
);
const {document} = window;
global.window = window;
global.document = document;


