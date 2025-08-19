import { SectionGroup } from "@/components/types";

export const encodings = {
  title: "Encodings",
  description: "How strings are encoded in different ways.",
  sections: [
    {
      title: "ASCII",
      description: "The American Standard Code for Information Interchange (ASCII) was developed in the early 1960s as a standardized character encoding scheme for communication between different computer systems.",
      path: 'ascii',
      id: 'ascii',
    },
    {
      title: "Unicode",
      description: "Unicode was first introduced in 1991 to provide a universal character encoding standard that could accommodate all characters in the world's writing systems. It assigns a unique code point to each character, providing a consistent and unambiguous representation of text.",
      path: 'unicode',
      id: 'unicode',
    },
    {
      title: "UTF-8",
      description: "UTF-8 is a variable-width character encoding standard that uses one to four bytes to represent each character. It was developed to overcome the limitations of ASCII, which can only represent 128 different characters.",
      path: 'utf-8',
      id: 'utf-8',
    },
    {
      title: "UTF-16",
      description: "UTF-16 uses two or four bytes to represent each character, originally developed to overcome the limitations of ASCII.",
      path: 'utf-16',
      id: 'utf-16',
    },
    {
      title: "UTF-32",
      description: "UTF-32 uses a fixed-width of four bytes (32 bits) to assign a unique 32-bit code point to each character, providing a straightforward and unambiguous representation of text.",
      path: 'utf-32',
      id: 'utf-32',
    },
    {
      title: "UTF-EBCDIC",
      description: "UTF-EBCDIC is designed to map Unicode characters to the Extended Binary Coded Decimal Interchange Code (EBCDIC) character set, an 8-bit character encoding used primarily on IBM mainframe and midrange computer systems.",
      path: 'utf-ebcdic',
      id: 'utf-ebcdic',
    },
  ],
} satisfies SectionGroup;