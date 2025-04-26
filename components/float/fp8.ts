import { fp8, FP8, DecodedFP8 } from '@/data/fp8'

/**
 * Decodes an FP8 value into sign, exponent, and mantissa
 * @param value 
 * @param param1 
 * @returns 
 */
export function decodeFP8(value: number, { mantissa, finite, maxExponent }: FP8): DecodedFP8 {
    const sign = ((value & 0b10000000) == 0 ? 1 : -1);
    const exp = (value >> mantissa) & (0xff >> (mantissa + 1))
    const sig = (value & (0xff >> (8 - mantissa)))
    const nan = finite ? (sign == -1 && exp == 0 && sig == 0) : (
        (exp === maxExponent) && 
        (mantissa == 2 ? sig > 0 : (sig === 2 ** mantissa - 1)))
    const inf = finite ? false : (mantissa == 2 && exp == maxExponent && sig == 0)
    return { sign, exp, sig, nan, inf }
}

export function isSubnormalFP8(decoded: DecodedFP8) {
    return decoded.exp == 0
}

export function subnormalE4M3(decoded: DecodedFP8) {
    return subnormalValueFP8(decoded, fp8.e4m3)
}

export function subnormalValueFP8({ sign, sig }: DecodedFP8, { mantissa, bias }: FP8) {
    const range = 2 ** mantissa
    return sign * (sig / range) * Math.pow(2, (1 - bias))
}

export function valueFP8({ sign, sig, exp }: DecodedFP8, { mantissa, bias }: FP8) {
    const range = 2 ** mantissa
    return sign * (1 + sig / range) * Math.pow(2, (exp - bias))
}

function rgb(r: number, g: number, b: number = 0): string {
    return `rgba(${r}, ${g}, ${b}, 0.8)`
}

const threshold = [1, 10, 100, 250, 100000]
const scale = [0, 40, 80, 100, 120]

export function getBackgroundFP8(value: number, decoded: DecodedFP8) {
    if (value === 0 || decoded.nan) {
        return rgb(0, 0, 255)
    }
    else if (decoded.exp === 0) {
        return rgb(0, 0, 200)
    }
    else {
        let i = 0
        while (i + 1 < threshold.length && Math.abs(value) >= threshold[i]) {
            i++
        }
        const t1 = threshold[i], t2 = threshold[i + 1] || 100000
        const s = scale[i], e = scale[i + 1] || 255
        const t = s + (value - t1)/(t2 - t1) * (e - s)

        return rgb(value < 0 ? Math.max(0, 255 - t) : 0, value < 0 ? 0 : Math.min(255, t))
    }
}

export function getColorFP8(value: number, decoded: DecodedFP8) {
    if (value === 0) {
        return 'bg-yellow-100 dark:bg-yellow-900'
    }
    // Subnormal number
    else if (decoded.exp == 0) {
        return 'bg-yellow-200 dark:bg-yellow-800'
    }
    // Small number
    else if (Math.abs(value) < 1) {
        return [
            'bg-yellow-300 dark:bg-yellow-700',
            'bg-yellow-400 dark:bg-yellow-600',
            'bg-yellow-500'
        ][Math.abs(Math.round(value / 0.1))] || 'bg-yellow-500'
    }
    else if (value > 0) {
        return [
            'bg-green-100 dark:bg-green-900',
            'bg-green-200 dark:bg-green-800',
            'bg-green-300 dark:bg-green-700',
            'bg-green-400 dark:bg-green-600',
            'bg-green-500'
        ][Math.floor(value / 100) ] || 'bg-green-500'
    }
    else {
        return [
            'bg-red-100 dark:bg-red-900',
            'bg-red-200 dark:bg-red-800',
            'bg-red-300 dark:bg-red-700',
            'bg-red-400 dark:bg-red-600',
            'bg-red-500'
        ][Math.floor(value / -100) ] || 'bg-red-500'
    }
}