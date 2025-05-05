import clsx from 'clsx'
import { Clock, HardDrive } from 'lucide-react'
import Link from 'next/link'

interface Algorithm {
  name: string
  link: string
  path: string
  time: Complexity
  space: Complexity
}

const ComplexityOrder = ['1', 'n', 'plus', 'dot', 'log', 'nlog', 'n2', 'n3', '2n', 'n!'] as const
type Complexity = typeof ComplexityOrder[number]
type ComplexityMap = Partial<Record<Complexity, Partial<Record<Complexity, Algorithm[]>>>>

const complexityColors = [
  'bg-green-200 dark:bg-green-800', 
  'bg-orange-200 dark:bg-orange-800', 
  'bg-red-200 dark:bg-red-800',
  'bg-purple-200 dark:bg-purple-800', 
  'bg-blue-200 dark:bg-blue-800', 
  'bg-yellow-200 dark:bg-yellow-800'
]

function addToComplexityMap(complexityMap: ComplexityMap, algorithm: Algorithm) {
  if (!complexityMap[algorithm.time]) {
    complexityMap[algorithm.time] = {}
  }
  const timeComplexity = complexityMap[algorithm.time]!
  if (! timeComplexity[algorithm.space])
    timeComplexity[algorithm.space] = []

  timeComplexity[algorithm.space]!.push(algorithm)
}

export function BigOComplexityTable({ algorithms, selected }: { algorithms: Algorithm[], selected?: string }) {

  const complexityMap: ComplexityMap = {}
  algorithms.forEach((algorithm) => {
    addToComplexityMap(complexityMap, algorithm)
  })

  // Limit to 6 keys, otherwise the columns are too narrow
  const timeKeys = Object.keys(complexityMap).sort((a, b) => 
    ComplexityOrder.indexOf(a as Complexity) - ComplexityOrder.indexOf(b as Complexity)).slice(0, 6) as Complexity[]

  // Calculate all possible space keys so the table is accurately sized
  const spaceKeySet: Set<Complexity> = new Set()
  for (const timeKey of timeKeys) {
    Object.keys(complexityMap[timeKey]!).forEach((spaceKey) => {
      spaceKeySet.add(spaceKey as Complexity)
    })
  }
  // Sort in descending order so the least space-efficient algorithms are at the top
  const spaceKeys = Array.from(spaceKeySet).sort((a, b) => 
    ComplexityOrder.indexOf(b as Complexity) - ComplexityOrder.indexOf(a as Complexity)) as Complexity[]

  return (
    <div className="flex gap-4">
      <div className="flex flex-col justify-between pb-8">
        <BigO complexity={ spaceKeys[0] } />
        <Label>
          <div className="text-center">
            <HardDrive className="w-6 h-6 text-gray-300" />
          </div>
          space
        </Label>
        <BigO complexity={ spaceKeys[spaceKeys.length - 1] } />
      </div>
      <div className="w-full">
        <div className={clsx('grid gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-2 min-h-60', [
          'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6'
        ][timeKeys.length - 1])}>
          {timeKeys.map((timeKey, index) => {
            const timeComplexity = complexityMap[timeKey]!
            const timeColor = complexityColors[index]

            return (
              <div key={timeKey}
                className={clsx('flex flex-col justify-between')}
                >
                {spaceKeys.map((spaceKey) => {
                  const algorithms = timeComplexity[spaceKey]

                  return (
                    <div key={spaceKey} className={ clsx(
                      algorithms ? timeColor : '', 
                      'rounded-md overflow-hidden')
                    }>
                      { algorithms && <div className='flex gap-1 justify-center items-center bg-black/10'>
                        <Clock className="w-4 h-4 text-gray-300" />
                        <BigO complexity={timeKey as Complexity} />
                        <span>&middot;</span>
                        <HardDrive className="w-4 h-4 text-gray-300" />
                        <BigO complexity={spaceKey as Complexity} />
                      </div> }
                      <div className='px-2 py-1'>
                        { algorithms?.map((algorithm) => (
                          <div key={algorithm.name} className={clsx('text-sm', 
                            selected === algorithm.path ? 
                              'font-bold text-gray-900 dark:text-gray-100' : 
                              'text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100')}>
                            <Link href={algorithm.link}>{algorithm.name}</Link>
                          </div>
                        )) }
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className='flex justify-between mt-2'>
          <BigO complexity={ timeKeys[0] } />
          <Label className='flex items-center gap-2'>
            <Clock className="w-4 h-4 text-gray-300" />
            time
          </Label>
          <BigO complexity={ timeKeys[timeKeys.length - 1] } />
        </div>
      </div>
    </div>
  )
}

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={clsx("text-xl font-mono whitespace-nowrap text-right", className)}>{children}</div>
)

export function BigO({ complexity }: { complexity: Complexity }) {
  return (
    <span className="text-md font-mono whitespace-nowrap text-right">{
      {
        '1': <>O(1)</>,
        'dot': <>O(m&middot;n)</>,
        'plus': <>O(m+n)</>,
        'n': <>O(n)</>, 
        'log': <>O(log n)</>,
        'nlog': <>O(n log n)</>,
        'n2': <>O(n<sup>2</sup>)</>,
        'n3': <>O(n<sup>3</sup>)</>,
        '2n': <>O(2<sup>n</sup>)</>,
        'n!': <>O(n!)</>
      }[complexity]
    }</span>
  )
}


/* <div className="relative h-80 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
<div className='absolute top-[50%] right-[50%] -ml-2 -mt-2 w-4 h-4 bg-yellow-300 dark:bg-yellow-800 rounded-full'/>
<div className='absolute top-[25%] right-[25%] -ml-2 -mt-2 w-4 h-4 bg-orange-200 dark:bg-orange-800 rounded-full'/>
<div className='absolute bottom-0 right-0 w-4 h-4 bg-green-200 dark:bg-green-800 rounded-full'/>

<div className='absolute top-0 right-0 w-4 h-4 bg-red-200 dark:bg-red-800 rounded-full'/>
<div className='absolute top-4 right-4 w-32 rounded-lg bg-red-200/60 dark:bg-red-800/60'>
    <div className='flex items-center justify-center gap-2'>
        <Clock className="w-4 h-4 text-gray-300" />
        <BigO complexity='dot' />
    </div>
    <div className='flex items-center justify-center gap-2'>
        <HardDrive className="w-4 h-4 text-gray-300" />
        <BigO complexity='dot' />
    </div>
    <div>Levenschtein</div>
    <div>Levenschtein</div>
</div>
<div className='absolute bottom-4 right-4 w-32 rounded-lg bg-green-200 dark:bg-green-800'>
  <div>Jaro Winkler</div>
</div> */