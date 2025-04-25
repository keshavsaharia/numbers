import { SectionListBox } from '@/components/section/listbox'

export function FloatingPointTheorems() {
    return (
    <SectionListBox 
        title="Floating Point Theorems" 
        sections={[
            {
                path: '1',
                identifier: 'Theorem 1',
                title: 'Digits and relative error',
                description: 'Establishes an upper bound on relative error as a function of total digits.',
                link: '/theorem/1'
            },
            {
                path: '2',
                identifier: 'Theorem 2',
                title: 'Relative rounding error',
                description: 'Establishes the upper bound on relative rounding error.',
                link: '/theorem/2'
            },
            {
                path: '3',
                identifier: 'Theorem 3',
                title: 'Rounding error of triangle area',
                description: 'An illustrative example of how rounding error bounds might be established for a formula.',
                link: '/theorem/3'
            },
            {
                path: '4',
                identifier: 'Theorem 4',
                title: 'Catastrophic collision',
                description: 'Explores the implications of rounding errors and collision when computing ln(1 + x).',
                link: '/theorem/4'
            },
            {
                path: '5',
                identifier: 'Theorem 5',
                title: 'Rounding halfway',
                description: 'Considers the implications of rounding at halfway points like 0.5.',
                link: '/theorem/5'
            },
            {
                path: '7',
                identifier: 'Theorem 7',
                title: 'Exact multiplications and divisions',
                description: 'Behavior of floating point arithmetic when the base is 2 and operations are exactly rounded.',
                link: '/theorem/7'
            },
            {
                path: '9',
                identifier: 'Theorem 9',
                title: 'Rounding error of subtraction',
                description: 'Establishes bounds on relative error for certain subtraction operations.',
                link: '/theorem/9'
            },
            {
                path: '10',
                identifier: 'Theorem 10',
                title: 'Relative error of addition',
                description: 'Establishes bounds on relative error for certain subtraction operations.',
                link: '/theorem/10'
            },
            {
                path: '11',
                identifier: 'Theorem 11',
                title: 'Performing exact subtractions',
                description: 'Establishes conditions by which an exact subtraction may be performed in floating point arithmetic.',
                link: '/theorem/11'
            },
            {
                path: '15',
                identifier: 'Theorem 15',
                title: 'Decimal precision',
                description: 'Conversion between decimal precision numbers.',
                link: '/theorem/15'
            }
        ]}/>
    )
}