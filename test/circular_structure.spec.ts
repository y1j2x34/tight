import TXON from '../src';
import { expect } from 'chai';

describe('serialize circular structure', () => {
    it('should serialize/deserialize circular structure correctly', () => {
        const circularStructure: any = {};
        circularStructure.member = circularStructure;
        const txonString = TXON.stringify(circularStructure);
        expect(txonString).to.be.eq(
            JSON.stringify({
                i: {
                    member: 'ref'
                },
                d: {
                    member: ''
                }
            })
        );
        const parsed = TXON.parse(txonString);
        expect(parsed).to.be.eql(circularStructure);
    });
    it('should serialize/deserialize circular structure in deeply nested object correctly', () => {
        const a = {
            b: {
                c: {}
            }
        };
        (a.b.c as any).a = a;

        const txon = TXON.stringify(a);
        expect(txon).to.be.eq(
            JSON.stringify({
                i: {
                    'b.c.a': 'ref'
                },
                d: {
                    b: {
                        c: {
                            a: ''
                        }
                    }
                }
            })
        );
        expect(TXON.parse(txon)).to.be.eql(a);
    });
    it('should serialize/deserialize circular structure in deeply nested array correctly', () => {
        const dcsjso = {
            object: {},
            array: [
                {
                    array: []
                }
            ]
        };
        (dcsjso.array[0].array as any[])[0] = dcsjso.array;

        const dcsjson = TXON.stringify(dcsjso);
        expect(dcsjson).to.be.eq(
            JSON.stringify({
                i: {
                    'array.0.array.0': 'ref'
                },
                d: {
                    object: {},
                    array: [
                        {
                            array: ['array']
                        }
                    ]
                }
            })
        );
        const parsed = TXON.parse(dcsjson);
        expect(parsed.array[0].array[0]).to.be.equal(parsed.array);
        expect(parsed).to.be.eql(dcsjso);
    });
});
