import { SectionGroup } from '@/components/types'

export default {
  title: 'Theories',
  description: 'These are the theoretical frameworks that form the mathematical foundations of modern science and technology.',
  base: '/theory',
  sections: [
    {
      title: 'Information Theory',
      description: 'Information theory is the study of quantifying, encoding, and transmitting information, focusing on measures like entropy to understand uncertainty, communication efficiency, and data compression.',
      link: '/theory/information',
      path: 'information'
    },
    {
      title: 'Graph Theory',
      description: 'Graph theory is the study of networks made of nodes and connections (vertices and edges), focusing on how these structures behave, relate, and solve problems involving relationships and paths.',
      link: '/theory/graph',
      path: 'graph'
    },
    {
      title: 'Probability Theory',
      description: 'Probability theory is the mathematical study of uncertainty, providing a framework to quantify how likely events are to occur and to reason about random phenomena.',
      link: '/theory/probability',
      path: 'probability'
    },
    
    {
      title: 'Statistics',
      description: 'Statistics is the science of collecting, analyzing, and interpreting data to understand patterns, make decisions, and draw conclusions under uncertainty.',
      link: '/theory/statistics',
      path: 'statistics'
    },
    
    {
      title: 'Game Theory',
      description: 'Game theory is the study of how individuals or groups make strategic decisions when their outcomes depend not only on their own choices, but also on the choices of others. It analyzes conflict, cooperation, and competition through models of rational decision-making.',
      link: '/theory/game',
      path: 'game'
    }
  ]
} satisfies SectionGroup