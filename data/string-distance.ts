import { SectionGroup } from "@/components/types"

interface StringDistanceFunction {
  name: string
  description: string
  path: string
  time: Complexity
  space: Complexity
}

type Complexity = '1' | 'dot' | 'n' | 'plus'

export const stringDistance = {
  title: 'String Distance',
  base: '/string/distance',
  sections: [
    {
      title: 'Jaro-Winkler distance',
      link: '/string/distance/jaro-winkler',
      description: 'The Jaro-Winkler distance measures string similarity by considering matching characters and their order, with a preference for common prefixes.',
      name: 'Jaro-Winkler distance',
      path: 'jaro-winkler',
      time: 'dot',
      space: '1'
    },
    {
      title: 'Levenshtein distance',
      link: '/string/distance/levenshtein',
      description: 'The Levenshtein distance quantifies similarity by counting the minimum number of single-character edits needed to change one string into another.',
      name: 'Levenshtein distance',
      path: 'levenshtein',
      time: 'dot',
      space: 'dot'
    },
    {
      title: 'Hamming distance',
      link: '/string/distance/hamming',
      description: 'The Hamming distance measures similarity between two equal-length strings by counting differing character positions.',
      name: 'Hamming distance',
      path: 'hamming',
      time: 'n',
      space: '1'
    },
    {
      title: 'Cosine distance',
      link: '/string/distance/cosine',
      description: 'The cosine distance evaluates similarity by measuring the angle between two string vectors in a multi-dimensional space.',
      name: 'Cosine distance',
      path: 'cosine',
      time: 'n',
      space: 'n'
    },
    {
      title: 'Jaccard distance',
      link: '/string/distance/jaccard',
      description: 'The Jaccard distance assesses similarity by comparing the size of the intersection to the union of character sets in two strings.',
      name: 'Jaccard distance',
      path: 'jaccard',
      time: 'plus',
      space: 'plus'
    },
    {
      title: 'Damerau-Levenshtein distance',
      link: '/string/distance/damerau-levenshtein',
      description: 'The Damerau-Levenshtein distance measures similarity by counting the minimum number of single-character edits, including transpositions, needed to transform one string into another.',
      name: 'Damerau-Levenshtein distance',
      path: 'damerau-levenshtein',
      time: 'dot',
      space: 'dot'
    },
    {
      title: 'Sorensen-Dice coefficient',
      link: '/string/distance/sorensen-dice',
      description: 'The Sorensen-Dice coefficient evaluates similarity by calculating the proportion of shared bigrams between two strings.',
      name: 'Sorensen-Dice coefficient',
      path: 'sorensen-dice',
      time: 'plus',
      space: 'plus'
    },
    {
      title: 'Overlap coefficient',
      link: '/string/distance/overlap',
      description: 'The Overlap coefficient measures similarity by dividing the size of the intersection by the size of the smaller character set of the two strings.',
      name: 'Overlap coefficient',
      path: 'overlap',
      time: 'plus',
      space: 'plus'
    }
  ]
} satisfies SectionGroup<StringDistanceFunction>
  