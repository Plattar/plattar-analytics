const _lut: string[] = [];

for (let i = 0; i < 256; i++) {
    _lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

/**
 * Static Utility Functions
 */
export class Util {
    public static generateUUID(): string {
        const d0: number = Math.random() * 0xffffffff | 0;
        const d1: number = Math.random() * 0xffffffff | 0;
        const d2: number = Math.random() * 0xffffffff | 0;
        const d3: number = Math.random() * 0xffffffff | 0;

        const uuid: string = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' +
            _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' +
            _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] +
            _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];

        return uuid.toLowerCase();
    }
}