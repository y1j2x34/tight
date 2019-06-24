import { expect } from 'chai';
import * as base64 from '../src/base64';
import TXON from '../src';

describe('Full TXON', () => {
    it('should correctly serialize/deserialize object with all types', () => {
        const time = new Date();
        const buffer = generageRangomBuffer(16);
        const ui8a = new Uint8Array(buffer);
        const ui16a = new Uint16Array(buffer);
        const ui32a = new Uint32Array(buffer);
        const i8a = new Int8Array(buffer);
        const i16a = new Int16Array(buffer);
        const i32a = new Int32Array(buffer);
        const f32a = new Float32Array(buffer);
        const f64a = new Float64Array(buffer);

        const text = '汉字,한국어，こんにちは，hello world';
        const object: any = {
            int: 100,
            float: Math.PI,
            string: text,
            date: time,
            bool: false,
            buffer,
            ui8a,
            ui16a,
            ui32a,
            i8a,
            i16a,
            i32a,
            f32a,
            f64a,
            array: [true, 1024, Math.E, text, buffer, time, {}],
            ref: buffer,
            nest: {}
        };
        object.nest.circular = object;
        const str = TXON.stringify(object);
        expect(TXON.parse(str)).to.be.eql(object);
    });
    it('should correctly serialize/deserialize NaN', () => {
        const str = TXON.stringify(NaN);
        expect(str).to.eql(
            JSON.stringify({
                i: {
                    '': 'NaN'
                },
                d: 'NaN'
            })
        );
        expect(TXON.parse(str)).to.be.NaN;
    });
    it('should correctly serialize/deserialize Infinity', () => {
        const str = TXON.stringify(Infinity);
        expect(str).to.eql(
            JSON.stringify({
                i: {
                    '': 'inf'
                },
                d: 'Infinity'
            })
        );
        expect(TXON.parse(str)).to.be.eq(Infinity);
    });
    it('should correctly serialize/deserialize Date', () => {
        const date = new Date();
        const str = TXON.stringify(date);
        expect(str).to.eql(
            JSON.stringify({
                i: {
                    '': 'date'
                },
                d: date
            })
        );
        expect(TXON.parse(str)).to.be.eql(date);
    });
    it('should correctly serialize/deserialize RegExp', () => {
        const reg = /^([0-9a-zA-Z]+?)((?:\.\d+$)|(?:\.[a-z]+))/gim;
        const str = TXON.stringify(reg);
        expect(str).to.eql(
            JSON.stringify({
                i: {
                    '': 'regexp'
                },
                d: ['^([0-9a-zA-Z]+?)((?:\\.\\d+$)|(?:\\.[a-z]+))', 'gim']
            })
        );
        expect(TXON.parse(str)).to.be.eql(reg);
    });
    it('should correctly serialize/deserialize ArrayBuffer', () => {
        const text = 'hello world';
        const textBase64 = base64.encode(text);
        const buffer = generageBuffer(text);

        const str = TXON.stringify(buffer);
        expect(str).to.be.eq(
            JSON.stringify({
                i: {
                    '': 'buffer'
                },
                d: textBase64
            })
        );
        expect(TXON.parse(str)).to.be.eql(buffer);
    });
    function generageRangomBuffer(length: number): ArrayBuffer {
        const view = new Uint8Array(length);
        view.set(
            Array(length)
                .fill(0)
                .map(x => Math.floor(0xff * Math.random()))
        );
        return view.buffer;
    }
    function generageBuffer(text: string): ArrayBuffer {
        const view = new Uint8Array(text.length);
        view.set(text.split('').map(x => x.charCodeAt(0)), 0);
        return view.buffer;
    }
});
