
interface FP8Props {
    sign?: boolean
    exponent: number
    mantissa: number
    bias: number
}

// bias = 7 E4M3

export function FP8E4M3Table() {
    return (<FP8Table exponent={4} mantissa={3} bias={7}/>)
}

export function FP8Table({ sign, exponent, mantissa, bias }: FP8Props) {
    const range = (2 ** mantissa)

    /**
     * first and second byte
     * @param x 
     * @param y 
     */
    function compute(first: number, second: number) {
        const value = (first << 4) & second;
        const sign = value & 0b10000000;
        const exp = (value & (0xff << mantissa)) >> mantissa
        const sig = (value & (0xff >> (1 + exponent)))

        return ((sign == 0) ? 1 : -1) * (1 + sig / range) * (2 ** (exp - bias))
    }

    return (
        <div className="grid grid-cols-8">
        { new Array(8).fill(0).map((_, second) => {
            return (
                <div key={'col' + second} className="col-span-1">
                    { new Array(8).fill(0).map((_, first) => {

                        return (
                            <div key={'row' + first}>
                                { compute(first, second) }
                            </div>
                        )

                    })}
                </div>
            )
        }) }
        </div>
    )
}