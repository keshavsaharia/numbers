import { SectionGroup } from '@/components/types'

export default {
    title: 'Floating point formats',
    base: '/format',
    sections: [
        {
            identifier: 'FP64',
            path: 'fp64',
            title: 'Double precision',
            description: 'A 64-bit format offering very high precision and a wide dynamic range, commonly used in scientific computing.'
        },
        {
            identifier: 'FP32',
            path: 'fp32',
            title: 'Single precision',
            description: 'A 32-bit format balancing precision and performance, widely used in general-purpose computing and graphics.'
        },
        {
            identifier: 'FP16',
            path: 'fp16',
            title: 'Half precision',
            description: 'Optimized for memory efficiency and speed with lower precision and dynamic range, used in AI and graphics.',
        },
        {
            identifier: 'BF16',
            path: 'bf16',
            title: 'Brain Floating Point',
            description: 'Same exponent size as FP32 but reduced mantissa, enabling faster computation while retaining dynamic range.',
        },
        {
            identifier: 'FP8',
            path: 'fp8',
            title: '8-bit floating point',
            description: 'A low precision format for maximum efficiency, mainly used in deep learning models for training and inference.'
        },
        {
            identifier: 'FP4',
            path: 'fp4',
            title: '4-bit floating point',
            description: 'An extremely compact format used in specialized machine learning and graphics applications.',
        }
    ]
} satisfies SectionGroup