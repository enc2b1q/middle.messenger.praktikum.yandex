import { expect } from 'chai';
import isEqual from "./isEqual";

describe('Compare objects', () => {

    it('Will return true for equal objects', () => {
        expect(isEqual( {a:1}, {a:1})).to.equal(true);
    });

    it('Will return false for non equal objects (different keys)', () => {
        expect(isEqual( {a:1}, {b:1})).to.equal(false);
    });
    it('Will return false for non equal objects (different number of keys)', () => {
        expect(isEqual( {a:1, b:2}, {a:1})).to.equal(false);
    });

});
