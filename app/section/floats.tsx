import { SectionListBox } from "@/components/section/listbox";

export function FloatSection() {
    return (
    <SectionListBox 
        title="Floating Point Formats" 
        sections={[
            {
                identifier: 'FP4',
                title: '4-bit floating point',
                tags: [
                    'machine_learning',
                    'inference',
                    'quantization',
                    'graphics',
                    'embedded_systems'
                ],
                description: 'An extremely compact format used in specialized machine learning and graphics applications.',
                link: '/format/fp4'
            }
    ]}/>)
}