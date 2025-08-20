
export function FPFormatName({ name }: { name: string }) {
    return (
        <span className='font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-800 rounded-md px-2 py-1 font-mono mr-2 uppercase'>
            { name }
        </span>
    )
}