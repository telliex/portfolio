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

type BlogPost = {
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
    name: 'Subscription Landing Page',
    description:
      'Multi-Project subscription landing page with a focus on user experience and conversion rate optimization.',
    link: 'https://subscribe.activo.quest',
    video: 'https://vimeo.com/1065359670',
    id: 'project1',
  },
  {
    name: 'Point trading system - staff end',
    description:
      'Point trading system for staff end with a focus on user experience and conversion rate optimization.',
    link: '',
    video: 'https://vimeo.com/1065359662',
    id: 'project2',
  },
  {
    name: 'Point trading system - user end',
    description:
      'Point trading system for user end with a focus on user experience and conversion rate optimization.',
    link: '',
    video: 'https://vimeo.com/1065359644',
    id: 'project3',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Awkns',
    title: 'Software Engineer',
    start: '2024',
    end: 'Present',
    link: '',
    id: 'work1',
  },
  {
    company: 'ECloudyValley',
    title: 'Software Engineer ',
    start: '2022',
    end: '2024',
    link: '',
    id: 'work2',
  },
  {
    company: 'Shinho',
    title: 'Senior Frontend Engineer & Frontend Leader',
    start: '2015',
    end: '2022',
    link: '',
    id: 'work3',
  },
  {
    company: 'Yahoo',
    title: 'Frontend Creative Engineer',
    start: '2010',
    end: '2015',
    link: '',
    id: 'work4',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  // {
  //   title: 'Exploring the Intersection of Design, AI, and Design Engineering',
  //   description: 'How AI is changing the way we design',
  //   link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
  //   uid: 'blog-1',
  // },
  // {
  //   title: 'Why I left my job to start my own company',
  //   description:
  //     'A deep dive into my decision to leave my job and start my own company',
  //   link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
  //   uid: 'blog-2',
  // },
  // {
  //   title: 'What I learned from my first year of freelancing',
  //   description:
  //     'A look back at my first year of freelancing and what I learned',
  //   link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
  //   uid: 'blog-3',
  // },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/telliex',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/telliex-chiu-5639b7142/',
  },
]

export const EMAIL = 'telliexyuzo@gmail.com'
