import {assert, expect} from 'chai';
import Block from "./block";
import Route from "./route";
import isEqual from "../utils/isEqual";

const tpl = '{{content}}';
const testString = 'ContentTestString';
const tag = "div";
const url = "/testPage";
const props = {rootQuery: "#root"};


class TestBlock extends Block {
    constructor() {
        super(tag, {content: testString,});
    }

    render() {
        return this.compile(tpl);
    }
}

const route = new Route(url, TestBlock, props);

describe('Test route ctor', () => {

    it('route ctor _pathname', () => {
        assert.equal(route._pathname, url);
    });
    it('route ctor _blockClass', () => {
        const blockClass = (new route._blockClass()) as Object;
        const expName = (new TestBlock()) as Object;
        expect(blockClass.constructor.name).to.equal(expName.constructor.name);
    });
    it('route ctor _props', () => {
        assert.equal(isEqual(route._props, props), true);
    });
    it('route ctor _block by default is empty', () => {
        assert.equal(route._block, null);
    });

});

