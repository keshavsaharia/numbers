import { SectionLink } from "../components/types"

type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type Lesson = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Advanced components and templates to craft beautiful websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI kit to make beautiful, animated interfaces.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Reglazed Studio',
    title: 'CEO',
    start: '2024',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work1',
  },
  {
    company: 'Freelance',
    title: 'Design Engineer',
    start: '2022',
    end: '2024',
    link: 'https://ibelick.com',
    id: 'work2',
  },
  {
    company: 'Freelance',
    title: 'Front-end Developer',
    start: '2017',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work3',
  },
]

export const BINARY_LESSONS = [
  {
    title: 'Binary integers',
    description: 'Learn how whole numbers are stored in a digital computer.',
    link: '/learn/binary'
  },
  {
    title: 'Binary arithmetic',
    description:
      'A visual guide to binary arithmetic.',
    link: '/learn/arithmetic'
  },
  {
    title: 'Floating point numbers',
    description:
      'Learn how floating point numbers are represented in a digital computer.',
    link: '/learn/floats'
  },
] satisfies SectionLink[]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/keshavsaharia/numbers',
  },
  {
    label: 'Share on Twitter',
    link: 'https://twitter.com/intent/tweet?text=I%20learned%20everything%20about%20numbers%20and%20their%20digital%20representations%20at%20https%3A%2F%2Fnumber.rest&url=https%3A%2F%2Fnumber.rest',
  }
]

export const EMAIL = 'keshav@keshavsaharia.com'
