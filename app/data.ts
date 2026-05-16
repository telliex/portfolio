type Service = {
  name: { en: string; zh: string }
  description: { en: string; zh: string }
  list: { en: string[]; zh: string[] }
}

export const SERVICES: Service[] = [
  {
    name: { en: 'Mobile Applications', zh: '各式功能 APP 設計' },
    description: {
      en: 'Build iOS and Android applications for your brand, supporting e-commerce, booking, or social features, enabling quick launch and user engagement.',
      zh: '為您的品牌打造 iOS 和 Android 應用程式，支援電商、預約、社交等特色功能，快速啟動用戶互動。',
    },
    list: {
      en: [
        '- APP architecture and feature planning',
        '- Custom architecture and features based on business model',
        '- Forum, news, social, entertainment, crypto, trading, points, etc.',
        '- Hybrid development for Android and iOS',
      ],
      zh: [
        '- APP 功能架構規劃設計',
        '- 可依商業模式客製架構及功能',
        '- 論壇、新聞、交友、娛樂、虛幣、交易、點數等...',
        '- 混合開發 Android、IOS',
      ],
    },
  },
  {
    name: { en: 'Enterprise Web ERP Solutions', zh: '企業 Web ERP 解決方案' },
    description: {
      en: 'Develop cloud-based subscription platforms to automate your business processes, from CRM to project management, enhancing efficiency and data insights.',
      zh: '開發雲端訂閱制平台，自動化您的業務流程，從 CRM 到項目管理，提升效率與數據洞察。',
    },
    list: {
      en: [
        '- Workflow design for production management systems',
        '- Business model design for inventory management systems',
        '- Logistics management systems for various delivery methods',
        '- Custom architecture and features based on business model',
      ],
      zh: [
        '- 各類工作流程設計生產管理系統',
        '- 各類商業模式設計進銷存系統',
        '- 各類配送方式設計物流管理系統',
        '- 可依商業模式客製架構及功能',
      ],
    },
  },
  {
    name: { en: 'E-commerce & Online Stores', zh: '電商與線上商店' },
    description: {
      en: 'Create e-commerce websites for individuals or businesses, supporting product management, payment integration, and marketing tools to expand your online market presence.',
      zh: '打造個人或企業的電商網站，支援產品管理、支付與行銷整合，助您開拓線上市場。',
    },
    list: {
      en: [
        '- Static template design',
        '- Custom architecture and features based on business model',
        '- Shopping cart and online payment integration',
      ],
      zh: [
        '- 靜態版型設計',
        '- 可依商業模式客製架構及功能',
        '- 購物車、線上金流',
      ],
    },
  },
  {
    name: { en: 'AI-Enhanced Applications', zh: 'AI 增強應用' },
    description: {
      en: 'Integrate AI technology into your products, such as chatbots or recommendation systems, to enhance user experience and business outcomes.',
      zh: '將 AI 技術融入您的產品，如聊天機器人或推薦系統，提升用戶體驗與業務成果。',
    },
    list: {
      en: [
        '- E-commerce product recommendations',
        '- Customer service automation',
      ],
      zh: ['- 電商產品推薦', '- 客服自動化'],
    },
  },
]

type Project = {
  name: string
  description: string[]
  list: {
    en: string[]
    zh: string[]
  }
  link: string
  video: string
  image: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
  details: {
    en: string[]
    zh: string[]
  }
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
    name: 'Pounds — AI Business Platform for Service Pros',
    description: [
      'Pounds is an all-in-one AI-powered business platform built for hands-on service professionals — nail technicians, barbers, trainers, and therapists. The platform unifies bookings, Stripe payments, a loyalty rewards programme, referral automation, and AI-generated social media marketing into a single dashboard. The embedded AI continuously learns from campaign performance, optimising content, timing, and outreach so practitioners can focus on their craft rather than client acquisition.',
      'Pounds 是一款專為手作服務業設計的全方位 AI 商業管理平台，服務對象涵蓋美甲師、理髮師、健身教練及治療師。平台將預約管理、Stripe 支付、會員積分計畫、推薦獎勵與 AI 社群媒體行銷整合至單一後台。內建 AI 持續依據活動成效優化內容、發佈時機與推廣策略，讓從業者能專注於自身技藝，無需為客源開發分心。',
    ],
    list: { en: [], zh: [] },
    link: 'https://www.pounds.network/landing.html',
    video: '',
    image: './pounds-network.jpg',
    id: 'project8',
  },
  {
    name: 'Yoh — AI Video Studio for Creators',
    description: [
      'Yoh is a direct-to-fan AI video studio that empowers creators to produce, publish, and monetize episodic content without a production crew. A single prompt is transformed by the AI story engine into full storylines with plot structure and character arcs. The platform handles video generation, character consistency across episodes, dialogue, original scores, and ambient audio — then delivers everything through a creator storefront where fans subscribe and stream. Creators keep 85% of every sale with weekly Stripe payouts.',
      'Yoh 是一個直達粉絲的 AI 影片工作室，讓創作者無需製作團隊即可製作、發佈並從劇集內容中獲利。AI 故事引擎將單一提示轉化為具備完整情節結構與角色弧線的故事。平台負責影片生成、跨集角色一致性、對白、原創配樂與環境音效，並透過創作者專屬頁面讓粉絲訂閱與觀看。創作者可保留 85% 的收益，每週透過 Stripe 撥款。',
    ],
    list: { en: [], zh: [] },
    link: 'https://www.yoh.app/',
    video: '',
    image: './yoh-app.jpg',
    id: 'project7',
  },
  {
    name: 'Subscription Landing Page',
    description: [
      'This project is a high-performance landing page tailored for subscription-based services, designed to captivate potential customers and boost conversion rates. Built with Next.js and React, it features a responsive, intuitive interface paired with clear CTAs (calls-to-action) and a seamless user experience. Whether for SaaS platforms, content creators, or online courses, this landing page adapts effortlessly, leveraging modern design and technology to showcase product value and drive subscription growth. ',
      '一個專為訂閱制服務設計的高效登陸頁，旨在吸引潛在客戶並提升轉換率。我們利用 Next.js 和 React 打造響應式且直觀的介面，結合清晰的 CTA（行動號召）和流暢的使用者體驗，幫助企業快速展示產品價值並推動訂閱成長。無論是 SaaS 平台、內容創作者還是線上課程，這個登陸頁都能靈活適配，並透過現代化設計與技術實現最佳效果。',
    ],
    list: { en: [], zh: [] },
    link: 'https://demo-subscribe.activo.quest',
    video: 'https://vimeo.com/1065359670',
    image: '',
    id: 'project6',
  },
  {
    name: 'Point trading system - staff end',
    description: [
      'This project is a point redemption system tailored for offline events, specifically designed to meet the operational needs of staff at merchant event venues. It features an efficient staff-facing interface, enabling personnel to quickly verify participants’ points and complete the redemption process. The application’s technical focus ensures stable performance even in high-traffic event environments. From scanning codes to instantly updating point records, this tool enhances on-site management efficiency and accuracy, ensuring smoother event operations.',
      '一個專為線下活動設計的積分核銷系統，特別針對商家活動現場的員工操作需求，設計一個高效的員工端介面，讓工作人員能夠快速驗證參與者的積分並完成核銷流程。應用的技術重心，確保在高流量的活動環境中依然穩定運行。從掃碼核銷到即時更新積分紀錄，這個工具提升了現場管理的效率與準確性，讓活動運作更順暢。',
    ],
    list: { en: [], zh: [] },
    link: 'https://demo-points-staff.activo.quest/app',
    video: 'https://vimeo.com/1065359662',
    image: '',
    id: 'project5',
  },
  {
    name: 'Point trading system - user end',
    description: [
      'This project is a user-facing point application designed for offline events, allowing participants to earn points through mobile-based tasks or games. Points can be redeemed on-site for products or rewards in real time. The app features an intuitive and seamless interface, ensuring users can quickly view tasks, check point balances, and complete redemptions during the event. This system enhances participant interaction and engagement, making events more captivating and enjoyable.',
      '一個為線下活動打造的使用者端積分應用，讓參與者透過手機參與任務或遊戲賺取積分。積分可即時在現場兌換商品或獎勵。整個應用，直觀且流暢的介面，確保使用者在活動中能快速查看任務、積分餘額並完成兌換。此系統提升了參與者的互動體驗，讓活動更具吸引力。',
    ],
    list: { en: [], zh: [] },
    link: 'https://demo-points-user.activo.quest/zh/demo-app',
    video: 'https://vimeo.com/1065359644',
    image: '',
    id: 'project4',
  },
  {
    name: 'Purchase ticket',
    description: [
      'This project is a convenient ticketing system that enables users to purchase tickets for events they’re interested in and manage their ticketing information directly within the app. We’ve developed a simple and user-friendly interface that supports ticket selection, payment, and the storage and viewing of e-tickets. The system ensures fast loading and secure transactions, allowing users to stay on top of their ticket status anytime, anywhere. From purchasing tickets to attending events, this app provides a one-stop solution, enhancing the convenience of event participation.',
      '一個便捷的購票系統，讓使用者能夠直接在應用中對感興趣的活動，購買活動門票並管理票務資訊。我們開發了一個簡單易用的介面，支援活動票券的選購、支付以及電子票的儲存與檢視功能。系統確保快速載入與安全交易，讓使用者隨時隨地掌握票務狀態。從購票到入場，這個應用提供一站式服務，提升活動參與的便利性。',
    ],
    list: { en: [], zh: [] },
    link: '',
    video: 'https://vimeo.com/1065739824',
    image: '',
    id: 'project3',
  },
  {
    name: 'Swift Multilingual Voice Assistant Project',
    description: [
      'Developed a real-time voice assistant application powered by Next.js and AI technologies. This project integrates cutting-edge artificial intelligence, combining speech recognition, natural language processing, and speech synthesis to deliver a bilingual (English/Traditional Chinese) interactive experience.',
      '開發了一款以 Next.js 和 AI 技術驅動的即時語音助手應用程式。此專案採用前沿的人工智慧技術，整合語音識別、自然語言處理和語音合成，提供雙語（英文/繁體中文）互動體驗。',
    ],
    list: {
      en: [
        'Integrated Groq API for efficient speech-to-text conversion and Llama3 large language model processing',
        "Leveraged Cartesia's Sonic TTS technology for smooth speech synthesis output",
        'Implemented real-time Voice Activity Detection (VAD) to optimize user voice interaction',
        'Built an extensible multilingual support framework with English and Traditional Chinese language switching',
        'Engineered error handling and fallback solutions for third-party API limitations to ensure stable user experience',
        'Used React Hooks and Web Audio API to implement efficient audio buffering and playback',
      ],
      zh: [
        '整合 Groq API 實現高效的語音轉文字和 Llama3 大型語言模型處理',
        '利用 Cartesia 的 Sonic TTS 技術實現流暢的語音合成輸出',
        '實現即時語音活動偵測 (VAD)，優化用戶語音互動體驗',
        '建構可擴展的多語言支援架構，實現英文與繁體中文切換功能',
        '針對第三方 API 限制進行錯誤處理與備用方案，確保使用者體驗穩定性',
        '使用 React Hooks 和 Web Audio API 實現高效的音頻緩衝與播放功能',
      ],
    },
    link: 'http://ai-swift.activo.quest/',
    video: '',
    image: './ai-swift.jpg',
    id: 'project2',
  },
  {
    name: 'Real-time Speech Transcription and Voice Command Control System',
    description: [
      "A web application that combines real-time speech transcription with intelligent voice commands. By integrating Deepgram's speech recognition technology, the system can convert speech to text in real-time and support speaker diarization for multi-person conversations. Users can activate voice command mode using the wake word 'Hey Summer', enabling hands-free operation. The system supports bilingual commands in both English and Chinese, coupled with dynamic visual feedback for an intuitive user interface.",
      '這是一個結合即時語音轉錄和智慧語音命令的網頁應用程式。透過整合 Deepgram 的語音識別技術，系統能夠即時將語音轉換為文字，並支援多人對話的說話者辨識。使用者可以透過喚醒詞 "Hey Summer" 啟動語音命令模式，實現無接觸的操作體驗。系統支援中英文雙語指令，並搭配動態視覺回饋，打造直覺且友善的使用者介面。',
    ],
    list: {
      en: [],
      zh: [],
    },
    link: 'http://speech2text.activo.quest/',
    video: '',
    image: './speech2text.jpg',
    id: 'project1',
  }
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Awkns',
    title: 'Senior Full-Stack Software Engineer',
    start: 'May 2023',
    end: 'Mar 2026',
    link: '',
    id: 'work3',
    details: {
      en: [
        'High-Concurrency Ticketing: Designed and delivered a ticketing platform (Next.js, TypeScript, Zustand, Go) that handles flash-sale concurrency peaks; optimized event-list rendering to cut load time by 40%.',
        'Config-Driven Console: Built an operator back-office (React, TypeScript, Ant Design) where all campaigns, pricing, and seat maps are managed through config rather than code changes; reduced operator error rate by 60%.',
        'Multi-Game Framework: Architected a shareable game-logic layer (TypeScript, Zustand) across five mini-game variants — spin wheel, lottery, scratch card, etc. — cutting new-game launch time from weeks to days.',
        'Offline-First Redemption: Created a PWA (Next.js, Service Worker, IndexedDB) for on-site staff to scan QR codes and redeem loyalty points even in poor-signal venues; real-time sync resumes automatically on reconnect.',
        'Multi-Tenant SaaS: Led the multi-tenancy refactor that allows a single deployment to serve multiple brand clients with isolated data, custom domains, and white-label UIs.',
      ],
      zh: [
        '高併發售票：設計並交付以 Next.js、TypeScript、Zustand、Go 開發的售票平台，支援閃購活動的高峰並發；優化活動列表渲染，將載入時間縮短 40%。',
        '配置驅動後台：建構以 React、TypeScript、Ant Design 開發的營運後台，所有活動、定價與座位圖均透過設定檔管理，無需更改程式碼；將營運錯誤率降低 60%。',
        '多遊戲框架：設計可跨五種小遊戲（轉盤、抽獎、刮刮樂等）共用的遊戲邏輯層（TypeScript、Zustand），將新遊戲上線時間從數週縮短至數天。',
        '離線優先核銷：開發 PWA（Next.js、Service Worker、IndexedDB），讓現場工作人員在訊號不佳的場館也能掃描 QR 碼並核銷會員積分；重新連線後自動即時同步。',
        '多租戶 SaaS：主導多租戶重構，使單一部署可為多個品牌客戶提供服務，並具備獨立資料隔離、自訂網域與白標 UI。',
      ],
    },
  },
  {
    company: 'ECloudyValley',
    title: 'Senior Full-Stack Software Engineer',
    start: 'Apr 2022',
    end: 'Apr 2023',
    link: '',
    id: 'work2',
    details: {
      en: [
        'Cloud Billing Dashboard: Developed a real-time billing overview UI (Vue 3, TypeScript, ECharts) for AWS/GCP/Azure consumption tracking; introduced lazy-loading of chart data that reduced initial page load by 50%.',
        'Billing Data Pipeline: Built a data-aggregation layer (Node.js) that normalises cost data from three cloud providers into a unified schema, enabling cross-cloud cost comparison and export to CSV/Excel.',
        'Shared Component Library: Established a cross-team component library (Vue 3, Storybook) with 30+ reusable components; served as frontend tech lead for quarterly cross-team code reviews.',
      ],
      zh: [
        '雲端帳單儀表板：使用 Vue 3、TypeScript、ECharts 開發 AWS/GCP/Azure 的即時帳單概覽介面；引入圖表資料懶載入，將首頁載入時間縮短 50%。',
        '帳單資料管道：建構 Node.js 資料整合層，將三家雲端供應商的費用資料標準化為統一格式，支援跨雲成本比較及 CSV/Excel 匯出。',
        '共用元件庫：建立跨團隊元件庫（Vue 3、Storybook），包含 30+ 個可重用元件；擔任前端技術負責人，主持每季跨團隊程式碼審查。',
      ],
    },
  },
  {
    company: 'Shinho',
    title: 'Senior Frontend Engineer & Frontend Leader',
    start: 'Dec 2015',
    end: 'Mar 2022',
    link: '',
    id: 'work1',
    details: {
      en: [
        'IoT Dashboard: Led end-to-end delivery of a real-time factory IoT dashboard (Vue 2, D3.js, MQTT WebSocket) that visualises machine sensor data for 200+ production lines; alert latency under 2 seconds.',
        'Micro-Frontend Migration: Drove the phased migration from a jQuery monolith to Vue 2 micro-frontends over 18 months, covering 15+ modules without a single production downtime.',
        'F&B Mobile Ordering: Delivered a mobile-first PWA (Vue 2, Vuex) for table-side food ordering across 50+ restaurant locations; QR code entry and real-time order status reduced staff workload by 30%.',
      ],
      zh: [
        'IoT 儀表板：端到端交付工廠即時 IoT 儀表板（Vue 2、D3.js、MQTT WebSocket），可視化 200+ 條產線的機台感測器資料；警報延遲低於 2 秒。',
        '微前端遷移：主導從 jQuery 單體架構到 Vue 2 微前端的 18 個月分階段遷移，涵蓋 15+ 個模組，全程零生產環境停機。',
        '餐飲行動點餐：交付 50+ 家餐廳門市的桌邊行動點餐 PWA（Vue 2、Vuex），QR Code 入場與即時訂單狀態追蹤，將員工工作量降低 30%。',
      ],
    },
  },
  {
    company: 'Yahoo',
    title: 'Frontend Engineer',
    start: 'May 2010',
    end: 'Nov 2015',
    link: '',
    id: 'work0',
    details: {
      en: [
        "AdTech Modernization: Modernised a legacy banner-ad delivery system from Flash to HTML5/CSS3/JavaScript, supporting rich-media and video ad formats across Yahoo's Taiwan, Hong Kong, and Southeast Asia portals.",
        'Ad Analytics Pipeline: Contributed to the ad-analytics reporting pipeline (Perl, JavaScript) that aggregated impression and click data for 100M+ daily ad events.',
      ],
      zh: [
        '廣告技術現代化：將舊版橫幅廣告投放系統從 Flash 升級至 HTML5/CSS3/JavaScript，支援富媒體與影片廣告格式，覆蓋 Yahoo 台灣、香港及東南亞入口網站。',
        '廣告分析管道：參與廣告分析報告管道（Perl、JavaScript）開發，彙整每日 1 億次以上廣告曝光與點擊資料。',
      ],
    },
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
    link: 'https://www.linkedin.com/in/telliex-chiu/',
  },
]

export const EMAIL = 'telliexyuzo@gmail.com'
