import createMDX from '@next/mdx'

import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    distDir: 'build'
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
        rehypeMathjax
    ],
    remarkPlugins: [
        remarkMath
    ]
  }
});

export default withMDX(nextConfig)
