import { FP8 } from '@/data/fp8'
import { enumerateFP8 } from './fp8'
import { Interactive } from '../number/interactive'

export function FloatDistribution({ fp, bins = 100 }: { fp: FP8, bins?: number }) {
    const bin = new Array(bins).fill(0).map((_, i) => ({ x: 0, v: [] as number[] }))

    // Filter NaN/infinity and get max in one pass
    let max = 0
    const values = enumerateFP8(fp).filter(({ decoded, value }) => {
        if (decoded.nan || decoded.inf)
            return false
        max = Math.max(max, value)
        return true
    })

    // Compute bins and max bin
    let maxBin = 0
    values.forEach(({ value }) => {
        const index = Math.floor(bin.length * value / max)
        if (bin[index]) {
            bin[index].v.push(value)
            maxBin = Math.max(maxBin, Math.log10(bin[index].v.length))
        }
    })

    const width = (100 / bin.length) + '%'
    return (<Interactive instructions={
        `Log-scaled distribution of positive values for ${ fp.name } floating point numbers.`
    }>
        <div className='rounded-md flex w-full overflow-hidden'>
            { bin.map((b, i) => {
                const scaled = Math.min(255, Math.floor(255.0 * b.v.length / maxBin))
                console.log('scaled', scaled)
                return (<span
                    key={ 'bin' + i }
                    style={{ 
                        width,
                        height: '10px',
                        background: `rgb(${ 255 - scaled }, ${ scaled }, 0)`
                    }}>
                    &nbsp;
                </span>)
            }) }
        </div>
        <div className='flex w-full justify-between text-zinc-700 dark:text-zinc-300 font-bold'>
            <div>0</div>
            <div>{ Math.round(max / 4) }</div>
            <div>{ Math.round(max / 2) }</div>
            <div>{ Math.round(3 * max / 4) }</div>
            <div>{ max }</div>
        </div>
    </Interactive>)
}