import { Reference } from '../types'
import references from '@/data/references'

export function References({ reference }: { reference: Array<Reference | string> }) {
    // Get references from ids
    const refs = reference.map((ref) => {
        if (typeof ref === 'string') {
            return references.find((r) => r.id === ref)
        }
        else return ref
    }).filter((r) => r != null) as Reference[]

    // Display element with each reference
    return (
        <div>
            <p>References</p>
            { refs.map((ref, index) => (<p key={ ref.id }>
                { index + 1 }. <em>{ ref.title }</em> { ref.author }
            </p>))}
        </div>
    )
}