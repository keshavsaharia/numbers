import clsx from "clsx"

export function MatrixDisplay({ matrix }: { matrix: number[][] }) {
  const width = matrix[0].length
  const height = matrix.length
  const precision = Math.max(2, width - 6);

  return (
    <div className={clsx(
      'grid gap-2 relative px-2 font-mono',
      ['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6'][width]
    )}>
      <MatrixBrackets/>

      {new Array(width).fill(0).map((_, j) => (
        <div key={j}
          className='flex flex-col gap-2'>
          { new Array(height).fill(0).map((_, i) => {
            const value = matrix[i][j].toFixed(precision).replace(/\.?0+$/, '')
            return (
              <div key={j} className='text-center'>
                { value }
              </div>
            )
          }) }
        </div>
      ))}
    </div>
  )
}

const MatrixBrackets = () => {
  return (<>
    <div className='absolute top-0 left-0 bottom-0 h-full w-0.5 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute top-0 left-0 h-0.5 w-2 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute bottom-0 left-0 h-0.5 w-2 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute top-0 right-0 bottom-0 h-full w-0.5 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute top-0 right-0 h-0.5 w-2 bg-zinc-400 dark:bg-zinc-600'></div>
    <div className='absolute bottom-0 right-0 h-0.5 w-2 bg-zinc-400 dark:bg-zinc-600'></div>
  </>)
}