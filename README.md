# Number Representations & States

*Number Representations & States* is a free and open-source educational resource that explains how computers handle numbers behind the scenes.

Programmers use numbers every day, but the precision and limitations of those numbers are often misunderstood or overlooked. This guide aims to make that knowledge accessible to a broader audience, and covers everything from binary representations and numerical analysis to floating-point numbers and character encodings.

Understanding how numbers are stored and manipulated at the machine level is critical when building systems that require precision and performance. From debugging subtle bugs in data pipelines to writing reliable financial code or training neural networks, the information here is foundational to many areas of computing.

## What is within scope

- How integers and floating-point numbers are represented in binary
- Why floating-point arithmetic introduces rounding errors
- The role of endianness and bit-width in computation
- Character encodings like ASCII and UTF-8
- Common pitfalls and best practices in numerical computing
- Real-world applications in databases, machine learning, and large language models (LLMs)
- Numerical analysis of floating point arithmetic 

Consequently, there are some topics that are **not in scope** (unless you want to write them):

- High-precision numerical computing libraries like GMP and MPFR
- Hardware design or electrical engineering topics (transistor logic, gate design, analog signals)
- Advanced numerical methods for scientific computing (finite element analysis, numerical PDEs)
- Formal methods or proofs about number representations - while some formalism is useful, this guide emphasizes intuition and practical understanding over rigorous proofs
- extensive coverage of every character encoding - we'll cover common standards like ASCII and UTF-8, but not every niche encoding (e.g., EBCDIC or ISCII).
- architecture-specific quirks outside of mainstream behavior (e.g., unusual bit patterns in obscure CPUs) - we'll cover endianness and 32/64-bit architecture basics, but not edge cases found in exotic or legacy systems
- converting between number bases by hand, beyond simple examples

## Who This Is For

This guide is targeted at:

- Software developers
- Systems engineers
- ML and AI practitioners working with low-level representations
- Database and compiler developers
- Curious programmers who want to understand the "magic" behind numbers

No advanced math or prior knowledge of computer architecture is required — just curiosity and a willingness to explore how computers really think about numbers. 

## Licensing

This site and all of its content is **100% free and open-source**. You may use, modify, and distribute any part of it — including code snippets — in any commercial or non-commercial project without restriction.

## Contributing

Pull requests, bug reports, and improvements are most welcome - see [CONTRIBUTING.md](CONTRIBUTING.md) for details.