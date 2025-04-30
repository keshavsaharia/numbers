'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-light text-gray-800 dark:text-gray-200 text-xl">
          <BoldText>Number</BoldText>{' '}
          <BoldText>Re</BoldText>presentations &amp;{' '}
          <BoldText>St</BoldText>ates
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-500"
          delay={0.2}
        >
          "how numbers are stored and used in computers"
        </TextEffect>
      </div>
    </header>
  )
}

function BoldText(props: React.PropsWithChildren) {
    return (
        <strong className="text-black dark:text-white font-bold">
            { props.children }
        </strong>
    )
}