import { SectionGroup } from "@/components/types";

export const stringNavigation = {
  title: "Strings",
  description: "Lessons and guides on strings and string algorithms.",
  base: "/string",
  sections: [
    {
      title: "Strings",
      description: "Lessons and guides on strings and string algorithms.",
      path: '',
      id: 'home',
    },
    {
      title: "Distance",
      description: "Distance measures for strings.",
      path: 'distance',
      id: 'distance',
    },
    {
      title: "Embedding",
      description: "Embedding algorithms for strings.",
      path: 'embedding',
      id: 'embedding',
    },
    {
      title: "Search",
      description: "Search algorithms for strings.",
      path: 'search',
      id: 'search',
    },
    {
      title: "Similarity",
      description: "Similarity measures for strings.",
      path: 'similarity',
      id: 'similarity',
    }
  ],
} satisfies SectionGroup;