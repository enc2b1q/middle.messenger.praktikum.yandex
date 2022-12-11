import {assert} from 'chai';
import Block from "./block";

const tpl = '{{content}}';
const testString = 'ContentTestString';
const tag = "div";
const className = "test-class";


class TestBlock extends Block {
    constructor() {
        super(tag, {
            content: testString,
            attr: {
                class: className,
            }
        });
    }

    render() {
        return this.compile(tpl);
    }
}

const blockInst = new TestBlock();

describe('Test base block render functionality', () => {

    it('Correct render content', () => {
        assert.equal(blockInst.getContent()?.innerHTML, testString);
    });

    it('Correct render tag', () => {
        assert.equal(blockInst.getContent()?.tagName.toLowerCase(), tag.toLowerCase());
    });

    it('Correct render attributes', () => {
        assert.equal(blockInst.getContent()?.className.toLowerCase(), className.toLowerCase());
    });

});

