import { SectionGroup } from '@/components/types'

export default {
    title: 'Concepts',
    base: '/concept',
    sections: [
        {
            path: 'ulp',
            title: 'ULPs',
            description: 'Units in the last place (ulps) is a common measurement of mathematical accuracy in floating point computation.',
            alias: ['ulp', 'ulps', 'units in the last place']
        }
    ]
} satisfies SectionGroup