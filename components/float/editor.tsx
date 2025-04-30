'use client'

import { Interactive } from '../number/interactive'

export function FloatEditor({ 
    instructions = 'Try editing the underlying numbers or bits of the floating point number.'
}: { instructions?: string }) {
    return (<Interactive instructions={instructions}>
        <div className="grid grid-cols-7 md:grid-cols-9">
            <div className="col-span-1">
                sign
            </div>
            <div className="col-span-3 md:col-span-4 bg-red-500">
                exponent
            </div>
            <div className="col-span-3 md:col-span-4 bg-green-500">
                mantissa
            </div>
        </div>
    </Interactive>)
}