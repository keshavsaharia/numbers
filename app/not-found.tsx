import { Entropy } from '@/components/entropy/entropy'
import { SectionList } from '@/components/section/list'

export default function NotFound() {
    return (
        <div>
            <p className="font-bold mb-4">
                The page you're looking for could not be found.
            </p>
            <div className="w-full mx-auto">
                <Entropy width={600} height={400} className="rounded-lg" />
            </div>
            <SectionList sections={[
                {
                    title: 'Interactive lessons',
                    description: 'A collection of interactive animations and visualizations of binary numbers and arithmetic.',
                    link: '/learn/binary'
                },
                {
                    title: 'Numerical analysis theorems',
                    description: 'A formal mathematical approach to defining the precision and limitations of floating point arithmetic.',
                    link: '/theorem'
                },
                {
                    title: 'Floating point formats',
                    description: 'A guide to all floating point formats.',
                    link: '/format/floats'
                }
            ]}/>
        </div>
    )
}