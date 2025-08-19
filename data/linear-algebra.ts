import { SectionGroup } from "@/components/types"

export default {
  title: 'Linear Algebra',
  description: 'Linear algebra is the study of structure and change through linear transformations.',
  base: '/linalg',
  sections: [
    {
      id: 'vectors',
      title: 'Vectors',
      description: 'Vectors are a sequence of numbers that often represent a magnitude and direction in a coordinate system.',
      link: '/linalg/vectors',
      path: 'vectors'
    },
    {
      id: 'matrices',
      title: 'Matrices',
      description: 'Matrices are rectangular arrays of numbers that are often used to represent linear transformations.',
      link: '/linalg/matrices',
      path: 'matrices'
    },
    {
      id: 'linear-transformations',
      title: 'Linear Transformations',
      description: 'Linear transformations are functions that map vectors to other vectors, often represented as matrices.',
      link: '/linalg/linear-transformations',
      path: 'linear-transformations'
    },
    {
      id: 'eigenvalues-and-eigenvectors',
      title: 'Eigenvalues and Eigenvectors',
      description: 'Eigenvalues and eigenvectors are important concepts in linear algebra. Eigenvalues are the values that scale the eigenvectors when a linear transformation is applied to them. Eigenvectors are the vectors that are scaled by the eigenvalues when a linear transformation is applied to them.',
      link: '/linalg/eigenvalues-and-eigenvectors',
      path: 'eigenvalues-and-eigenvectors'
    }
  ]
} satisfies SectionGroup