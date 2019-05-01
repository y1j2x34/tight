import { hello } from '../src/index';
import { expect } from 'chai';

describe('test hello world', () => {
    it('hello', () => {
        expect(hello()).to.be.eq('world');
    });
});
