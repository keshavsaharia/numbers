export type FPFormat = 'fp16' | 'fp32' | 'fp64' | 'fp128'

export interface FP {
    id: string
    name: string
    signed?: boolean
    mantissa: number
    exponent: number
    exponentRange: [number, number]
    maxExponent: bigint     // cached for computations
    bias: number
    range: bigint           // cached for computations
    finite?: boolean
    unsignedZero?: boolean
    length: number
}

export interface DecodedFP {
    sign: number    // sign bit
    exp: number     // exponent
    sig: number     // mantissa/significand
    nan?: boolean   // NaN
    inf?: boolean   // Infinity
}

export const fp: Record<FPFormat, FP> = {
    fp16: {
        id: 'fp16',
        name: 'Half Precision',
        signed: true,
        exponent: 5,
        exponentRange: [-14, 15],
        maxExponent: BigInt(31),
        bias: 15,
        mantissa: 10,
        range: BigInt(1024),
        length: 16
    },
    fp32: {
        id: 'fp32',
        name: 'Single Precision',
        signed: true,
        exponent: 8,
        exponentRange: [-126, 127],
        maxExponent: BigInt(255),
        bias: 127,
        mantissa: 23,
        range: BigInt(8388608),
        length: 32
    },
    fp64: {
        id: 'fp64',
        name: 'Double Precision',
        signed: true,
        exponent: 11,
        exponentRange: [-1022, 1023],
        maxExponent: BigInt(2047),
        bias: 1023,
        mantissa: 52,
        range: BigInt(4503599627370496),
        length: 64
    },
    fp128: {
        id: 'fp128',
        name: 'Quadruple Precision',
        signed: true,
        exponent: 15,
        exponentRange: [-16382, 16383],
        maxExponent: BigInt(32767),
        bias: 16383,
        mantissa: 112,
        range: BigInt(5192296858534827628530496329220096),
        length: 128
    }
} 