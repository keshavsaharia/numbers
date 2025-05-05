import { FP } from "@/data/fp";
import { FP8 } from "@/data/fp8";

export function NormalizedValueFormula({ fp }: { fp: FP | FP8 }) {
    return (
        <div className="flex justify-center gap-1 font-mono text-sm text-center leading-8">
            <span className="text-xl">(-1)<sup className='text-red-500'>s</sup></span>
            <span>&middot;</span>
            <span className="text-xl">(</span>
            <span className="text-lg">1</span>
            <span>+</span>
            <span>
                <div className="flex flex-col text-xs">
                    <div className="border-b border-gray-900 dark:border-gray-100">
                        <span className="text-blue-500">m</span>
                    </div>
                    <div>
                        { fp.range.toString() }
                    </div>
                </div>
            </span>
            <span className="text-xl">)</span>
            <span>&middot;</span>
            <span className="text-lg">
                2
                <sup className="px-1">
                    <span className='text-green-500'>e</span>
                    <span>-</span>
                    <span>{ fp.bias }</span>
                </sup></span>
        </div>
    )
}

export function SubnormalValueFormula({ fp }: { fp: FP | FP8 }) {
    return (
        <div className="flex justify-center gap-1 font-mono text-sm text-center leading-8">
            <span className="text-xl">(-1)<sup className='text-red-500'>s</sup></span>
            <span>&middot;</span>
            <span className="text-xl">(</span>
            <span>
                <div className="flex flex-col text-xs">
                    <div className="border-b border-gray-900 dark:border-gray-100">
                        <span className="text-blue-500">m</span>
                    </div>
                    <div>
                        { fp.range.toString() }
                    </div>
                </div>
            </span>
            <span className="text-xl">)</span>
            <span>&middot;</span>
            <span className="text-lg">
                2
                <sup className="px-1">
                    <span>{ fp.exponentRange[0] }</span>
                </sup></span>
        </div>
    )
}