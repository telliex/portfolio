type Project = {
  name: string
  description: string[]
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
    description: [
      'This project is a high-performance landing page tailored for subscription-based services, designed to captivate potential customers and boost conversion rates. Built with Next.js and React, it features a responsive, intuitive interface paired with clear CTAs (calls-to-action) and a seamless user experience. Whether for SaaS platforms, content creators, or online courses, this landing page adapts effortlessly, leveraging modern design and technology to showcase product value and drive subscription growth. ',
      '這個專案是一個專為訂閱制服務設計的高效登陸頁，旨在吸引潛在客戶並提升轉換率。我們利用 Next.js 和 React 打造響應式且直觀的介面，結合清晰的 CTA（行動號召）和流暢的使用者體驗，幫助企業快速展示產品價值並推動訂閱成長。無論是 SaaS 平台、內容創作者還是線上課程，這個登陸頁都能靈活適配，並透過現代化設計與技術實現最佳效果。',
    ],
    link: 'https://demo-subscribe.activo.quest',
    video: 'https://vimeo.com/1065359670',
    id: 'project1',
  },
  {
    name: 'Point trading system - staff end',
    description: [
      'This project is a point redemption system tailored for offline events, specifically designed to meet the operational needs of staff at merchant event venues. It features an efficient staff-facing interface, enabling personnel to quickly verify participants’ points and complete the redemption process. The application’s technical focus ensures stable performance even in high-traffic event environments. From scanning codes to instantly updating point records, this tool enhances on-site management efficiency and accuracy, ensuring smoother event operations.',
      '一個專為線下活動設計的積分核銷系統，特別針對商家活動現場的員工操作需求，設計一個高效的員工端介面，讓工作人員能夠快速驗證參與者的積分並完成核銷流程。應用的技術重心，確保在高流量的活動環境中依然穩定運行。從掃碼核銷到即時更新積分紀錄，這個工具提升了現場管理的效率與準確性，讓活動運作更順暢。',
    ],
    link: 'https://demo-points-staff.activo.quest/app',
    video: 'https://vimeo.com/1065359662',
    id: 'project2',
  },
  {
    name: 'Point trading system - user end',
    description: [
      'This project is a user-facing point application designed for offline events, allowing participants to earn points through mobile-based tasks or games. Points can be redeemed on-site for products or rewards in real time. The app features an intuitive and seamless interface, ensuring users can quickly view tasks, check point balances, and complete redemptions during the event. This system enhances participant interaction and engagement, making events more captivating and enjoyable.',
      '一個為線下活動打造的使用者端積分應用，讓參與者透過手機參與任務或遊戲賺取積分。積分可即時在現場兌換商品或獎勵。整個應用，直觀且流暢的介面，確保使用者在活動中能快速查看任務、積分餘額並完成兌換。此系統提升了參與者的互動體驗，讓活動更具吸引力。',
    ],
    link: 'https://demo-points-user.activo.quest/zh/demo-app',
    video: 'https://vimeo.com/1065359644',
    id: 'project3',
  },
  {
    name: 'Purchase ticket',
    description: [
      'This project is a convenient ticketing system that enables users to purchase tickets for events they’re interested in and manage their ticketing information directly within the app. We’ve developed a simple and user-friendly interface that supports ticket selection, payment, and the storage and viewing of e-tickets. The system ensures fast loading and secure transactions, allowing users to stay on top of their ticket status anytime, anywhere. From purchasing tickets to attending events, this app provides a one-stop solution, enhancing the convenience of event participation.',
      '一個便捷的購票系統，讓使用者能夠直接在應用中對感興趣的活動，購買活動門票並管理票務資訊。我們開發了一個簡單易用的介面，支援活動票券的選購、支付以及電子票的儲存與檢視功能。系統確保快速載入與安全交易，讓使用者隨時隨地掌握票務狀態。從購票到入場，這個應用提供一站式服務，提升活動參與的便利性。',
    ],
    link: '',
    video: 'https://vimeo.com/1065739824',
    id: 'project4',
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
