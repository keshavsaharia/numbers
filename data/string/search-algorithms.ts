import { SectionGroup } from "@/components/types";

export default {
  title: "String Searching Algorithms",
  description: "Algorithms for searching for patterns in a string.",
  base: 'string/search',
  sections: [
    {
      title: "Aho-Corasick",
      description: "Aho-Corasick is a string searching algorithm that uses a finite automaton to efficiently search for multiple patterns in a text.",
      path: 'aho-corasick',
      id: 'aho-corasick',
    },
    {
      title: "Knuth-Morris-Pratt",
      description: "Knuth-Morris-Pratt is a string searching algorithm that uses a prefix table to skip over characters that are known to not match the pattern.",
      path: 'knuth-morris-pratt',
      id: 'knuth-morris-pratt',
    },
  ],
} as SectionGroup;