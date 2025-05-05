import type { Metadata, Viewport } from 'next'
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from '../components/footer/footer'
import { ThemeProvider } from 'next-themes'
import clsx from 'clsx'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'number.rest',
  description:
    'A free and open-source guide to numerical representations and states in digital computation.',
}

const serifFont = Noto_Sans({
  variable: '--font-serif',
  subsets: ['latin'],
})

const monoFont = Noto_Sans_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${ serifFont.variable } ${monoFont.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}>
                <ThemeProvider
                    enableSystem={true}
                    attribute="class"
                    storageKey="theme"
                    defaultTheme="system"
                >
                    <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-serif)]">
                        <div className={clsx(
                            "relative mx-auto w-full flex-1 px-4 pt-20",
                            "max-w-screen-md"
                        )}>
                            <Header />
                            { children }
                            <Footer />
                        </div>
                    </div>
                </ThemeProvider>
                
                <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
            </body>
        </html>
    )
}
