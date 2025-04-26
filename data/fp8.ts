export type FP8Format = 'e4m3' | 'e4m3fnuz' | 'e5m2' | 'e5m2fnuz'

export interface FP8 {
    name: string
    signed?: boolean
    mantissa: number
    exponent: number
    maxExponent: number     // cached for computations
    bias: number
    range: number           // cached for computations
    finite?: boolean
    unsignedZero?: boolean
}

export interface DecodedFP8 {
    sign: number    // sign bit
    exp: number     // exponent
    sig: number     // mantissa/significand
    nan?: boolean   // NaN
    inf?: boolean   // Infinity
}

export const fp8: Record<FP8Format, FP8> = {
    e4m3: {
        name: 'E4M3',
        signed: true,
        exponent: 4,
        maxExponent: 15,
        bias: 7,
        mantissa: 3,
        range: 8
    },
    e4m3fnuz: {
        name: 'E4M3FNUZ',
        signed: true,
        exponent: 4,
        maxExponent: 15,
        bias: 8,
        mantissa: 3,
        range: 8,
        finite: true,
        unsignedZero: true
    },
    e5m2: {
        name: 'E5M2',
        signed: true,
        exponent: 5,
        maxExponent: 31,
        bias: 15,
        mantissa: 2,
        range: 4
    },
    e5m2fnuz: {
        name: 'E5M2FNUZ',
        signed: true,
        exponent: 5,
        maxExponent: 31,
        bias: 16,
        mantissa: 2,
        range: 4,
        finite: true,
        unsignedZero: true
    }
}