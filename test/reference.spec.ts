import TXON from '../src';
import { expect } from 'chai';

describe('object reference', () => {
    it('should serialize/deserialize reference correctly', () => {
        const a: any = {
            a: {}
        };
        a.b = a.a;
        const txon = TXON.stringify(a);
        expect(txon).to.be.eq(
            JSON.stringify({
                i: {
                    b: 'ref'
                },
                d: {
                    a: {},
                    b: 'a'
                }
            })
        );
    });
    it('should serialize/deserialize reference in nested object correcly', () => {
        const a: any = {
            a: {},
            b: {
                c: {}
            }
        };
        a.b.c.a = a.a;
        const txon = TXON.stringify(a);
        expect(txon).to.be.eq(
            JSON.stringify({
                i: {
                    'b.c.a': 'ref'
                },
                d: {
                    a: {},
                    b: {
                        c: {
                            a: 'a'
                        }
                    }
                }
            })
        );
        expect(TXON.parse(txon)).to.be.eql(a);
    });
    it('should serialize/deserialize reference in nested array correcly', () => {
        const a: any = {
            a: {},
            b: {
                c: []
            }
        };
        a.b.c[0] = a.a;
        const txon = TXON.stringify(a);
        expect(txon).to.be.eq(
            JSON.stringify({
                i: {
                    'b.c.0': 'ref'
                },
                d: {
                    a: {},
                    b: {
                        c: ['a']
                    }
                }
            })
        );
        expect(TXON.parse(txon)).to.be.eql(a);
    });
});
