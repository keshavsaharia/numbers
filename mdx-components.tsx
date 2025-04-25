import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

import { 
    FloatingPointNumber, 
    FloatingPointIntuition
} from '@/components/mdx/float-number'

import { TableOfContents } from '@/components/mdx/table-of-contents'
import { BinaryNumber } from '@/components/mdx/binary-number'
import { References } from '@/components/mdx/references'
import { Theorem } from '@/components/mdx/theorem'
import { SectionListBox } from '@/components/section/listbox'
import { SectionList } from '@/components/section/list'
import { CodeBlock } from '@/components/code/code-block'
import { FP8Table } from '@/components/float/table'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    TableOfContents,
    FloatingPointNumber,
    FloatingPointIntuition,
    FP8Table,
    BinaryNumber,
    References,
    SectionListBox,
    SectionList,
    Theorem,
    h1: heading1,
    h2: heading2,
    h3: heading3,
    p: paragraph,
    a: link,
    code: code,
    pre: pre,
    Center: center,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <img src={src} alt={alt} className="rounded-xl" />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    },
  }
}

function heading1({ children }: React.PropsWithChildren) {
    return (
        <h1 className='text-2xl text-gray-900 dark:text-gray-100 font-bold mt-12 mb-4'>
            { children }
        </h1>
    )
}

function heading2({ children }: React.PropsWithChildren) {
    return (
        <h2 className='text-xl text-gray-800 dark:text-gray-200 font-bold mt-8 mb-4'>
            { children }
        </h2>
    )
}

function heading3({ children }: React.PropsWithChildren) {
    return (
        <h2 className='text-lg text-gray-800 dark:text-gray-200 font-bold mt-8 mb-4'>
            { children }
        </h2>
    )
}

function paragraph({ children }: React.PropsWithChildren) {
    return (
        <p className='text-md text-gray-700 dark:text-gray-300 font-normal my-4'>
            { children }
        </p>
    )
}

function code({ children }: React.PropsWithChildren) {
    return (
        <code className='text-md text-gray-700 dark:text-gray-300 font-normal my-4'>
            { children }
        </code>
    )
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

function link({ children, href }: React.PropsWithChildren & { href: string }) {
    // Rewrite github links
    if (href.startsWith('@github')) {
        href = href.replace(/^\@github/, 'https://github.com/keshavsaharia/number-rest')
    }
    return (
        <Link href={ href } className='text-md border-b border-indigo-800 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 font-normal cursor-pointer'>
            { children }
        </Link>
    )
}

function center({ children }: React.PropsWithChildren) {
    return (<div className="text-center">
        { children }
    </div>)
}