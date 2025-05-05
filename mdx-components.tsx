import type { MDXComponents } from 'mdx/types'
import * as typography from '@/components/typography'
import * as layouts from '@/components/layouts'
import * as interactive from '@/components/interactive'

import { 
    FloatingPointNumber, 
    FloatingPointIntuition
} from '@/components/mdx/float-number'

import { HumanNumber } from '@/components/number/human'
import { BinaryNumber } from '@/components/mdx/binary-number'
import { References } from '@/components/mdx/references'
import { CodeBlock } from '@/components/code/code-block'
import { MatrixRain } from '@/components/ui/matrix-code'
import { ASCIIViewer } from '@/components/string/ascii-viewer'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...typography,
    ...layouts,
    ...interactive,
    FloatingPointNumber,
    FloatingPointIntuition,
    HumanNumber,
    ASCIIViewer,
    MatrixRain,
    BinaryNumber,
    References,
    pre: pre,
    Center: center,
    wrapper
  }
}

function wrapper({ children }: React.PropsWithChildren) {
    return (<div className='max-w-screen-md'>
        { children }
    </div>)
}

function pre({ children }: React.PropsWithChildren) {
    let language = 'python'
    let code = ''
    let filename = ''
    
    if (children) {
        const props = (children as any).props
        if (props.className && props.children) {
            language = props.className.replace(/^language\-/, '')
            code = props.children.trim()
            filename = {
                python: 'code.py',
                typescript: 'code.ts',
                javascript: 'code.js'
            }[language] || 'code.txt'
        }
    }

    return (
        <pre className='text-md text-gray-700 dark:text-gray-300 font-normal my-4'>
            <CodeBlock language={ language } filename={ filename } code={ code } />
        </pre>
    )
}

function center({ children }: React.PropsWithChildren) {
    return (<div className="text-center">
        { children }
    </div>)
}