import { Reference } from '../types'
import references from '@/data/references'

export function References({ reference }: { reference: Array<Reference | string> }) {
    // Get references from ids
    const refs = reference.map((ref) => {
        if (typeof ref === 'string') {
            const refPage = ref.indexOf('@') > 0
            const refId = refPage ? ref.substring(0, ref.indexOf('@')) : ref
            
            return references.find((r) => r.id === ref)
        }
        else return ref
    }).filter((r) => r != null) as Reference[]

    // Display element with each reference
    return (
        <div className='text-md mt-12'>
            <p className='text-xl font-bold mb-4'>References</p>
            <ol className='pl-6 list-decimal'>
                { refs.map((ref) => (<li key={ ref.id }
                    className='text-md text-gray-700 dark:text-gray-300 font-normal pl-2'>
                    <ReferenceText reference={ref}/>
                </li>)) }
            </ol>
        </div>
    )
}

function ReferenceText({ reference }: { reference: Reference }) {
    return (<>
        { Array.isArray(reference.author) ? 
            reference.author.map((a) => authorName(a)).join(', ') :
            authorName(reference.author) 
        }. ({ reference.year }). <em>{ reference.title }</em>. { reference.publication }.
    </>)
}

function authorName(name: string) {
    const parts = name.split(' ')
    if (parts.length == 1)
        return parts[0]
    else
        return `${parts[parts.length - 1]} ${parts[0].substring(0, 1).toUpperCase()}.`
}