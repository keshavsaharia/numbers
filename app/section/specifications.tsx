import { SectionList } from "@/components/section/list";

export function SpecsSection() {
    return (
        <SectionList title="Specifications" sections={[
            {
                title: 'IEEE 754',
                description: 'A common specification',
                link: '/spec/ieee754'
            },
            {
                title: 'IEEE 854',
                description: 'A common specification',
                link: '/spec/ieee854'
            },
            {
                title: 'OCP Microscaling Formats',
                description: 'An open specification of ',
                link: '/spec/ocpmx'
            }
        ]}/>
    )
}