'use client'

import { FP8 } from '@/data/fp8'
import { enumerateFP8 } from './fp8'
import { Interactive } from '../number/interactive'
import { useRef, useState } from 'react'


export function FP8Zoom({ fp }: { fp: FP8 }) {
    const values = enumerateFP8(fp)
    const maxRange = Math.max(...values.map(({ decoded, value }) => 
        (decoded.inf || decoded.nan ? 0 : value)))

    

    return (<Interactive>
        <div>
            { maxRange }
        </div>
    </Interactive>)
}