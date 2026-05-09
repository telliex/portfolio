export type Lang = 'en' | 'zh'

export type ServiceItem = {
  name: string
  description: string
  list: string[]
}

export type Translations = {
  headerSubtitle: string
  intro: string[]
  servicesHeading: string
  services: ServiceItem[]
  partnersHeading: string
  partnersPartnerName: string
  partnersBody: string[]
  selectedProjectsHeading: string
  workExperienceHeading: string
  blogHeading: string
  connectHeading: string
  connectIntro: string
  contactFormHeading: string
}

export const translations: Record<Lang, Translations> = {
  en: {
    headerSubtitle: 'Innovative Technology, Exceptional Solutions',
    intro: [
      "Welcome to Activo, a personal studio founded by a passionate software engineer dedicated to blending creativity with technology to deliver efficient, reliable, and forward-thinking digital solutions. I'm Telliex Chiu, the founder of Activo, with 8 years of software development experience, specializing in building modern applications and systems to help individuals and businesses achieve their goals.",
      "At Activo, we believe technology should be simple yet powerful. We excel in leveraging cutting-edge frameworks like Next.js, React, and TypeScript, combined with cloud technologies (such as AWS or Vercel) and efficient DevOps practices, to create everything from MVPs to enterprise-grade applications. Whether it's developing intuitive web apps, optimizing backend APIs, or integrating multimedia features (like video streaming and processing), we provide tailored services to meet your unique needs.",
      "Activo is built on the values of quality, transparency, and collaboration. We pay attention to every project detail, ensuring clean, maintainable code and working agilely with clients to bring ideas to life quickly. From concept design to deployment, Activo is your trusted technology partner. Let's kickstart your next project together! Contact Activo and discover how technology can bring your vision to life.",
    ],
    servicesHeading: 'Services',
    services: [
      {
        name: 'Mobile Applications',
        description:
          "Build iOS and Android applications for your brand, supporting e-commerce, booking, or social features, enabling quick launch and user engagement.",
        list: [
          '- APP architecture and feature planning',
          '- Custom architecture and features based on business model',
          '- Forum, news, social, entertainment, crypto, trading, points, etc.',
          '- Hybrid development for Android and iOS',
        ],
      },
      {
        name: 'Enterprise Web ERP Solutions',
        description:
          'Develop cloud-based subscription platforms to automate your business processes, from CRM to project management, enhancing efficiency and data insights.',
        list: [
          '- Workflow design for production management systems',
          '- Business model design for inventory management systems',
          '- Logistics management systems for various delivery methods',
          '- Custom architecture and features based on business model',
        ],
      },
      {
        name: 'E-commerce & Online Stores',
        description:
          'Create e-commerce websites for individuals or businesses, supporting product management, payment integration, and marketing tools to expand your online market presence.',
        list: [
          '- Static template design',
          '- Custom architecture and features based on business model',
          '- Shopping cart and online payment integration',
        ],
      },
      {
        name: 'AI-Enhanced Applications',
        description:
          'Integrate AI technology into your products, such as chatbots or recommendation systems, to enhance user experience and business outcomes.',
        list: ['- E-commerce product recommendations', '- Customer service automation'],
      },
    ],
    partnersHeading: 'Partners - Building the Future Together',
    partnersPartnerName: 'Awkns Labs',
    partnersBody: [
      "At Activo, we recognize that collaboration is key to driving innovation. That's why we're proud to partner with Awkns Labs, a forward-thinking team specializing in Web3 and AI technologies. Awkns Labs excels in developing decentralized applications, smart contracts, and AI-driven solutions, with deep expertise in blockchain, NFT ecosystems, and generative AI models. Their strengths perfectly complement Activo's capabilities in modern application development.",
      "Through our partnership with Awkns Labs, we offer clients a broader range of services—from traditional web applications to cutting-edge Web3 platforms and AI-enhanced personalized experiences. Whether it's building next-generation decentralized marketplaces or leveraging machine learning to optimize business processes, Activo and Awkns Labs turn technological potential into tangible results. Our collaborative approach emphasizes open communication and technical synergy, ensuring every project stands out in the fast-evolving digital landscape.",
    ],
    selectedProjectsHeading: 'Selected Projects',
    workExperienceHeading: 'Work Experience',
    blogHeading: 'Blog',
    connectHeading: 'Connect',
    connectIntro: 'Feel free to contact me at',
    contactFormHeading: 'Contact Form',
  },
  zh: {
    headerSubtitle: '創新技術，卓越解決方案',
    intro: [
      '歡迎來到 Activo，一家由熱情的軟體工程師創立的個人工作室，致力於將創意與技術融合，為客戶提供高效、可靠且前瞻性的數位解決方案。我是 Telliex Chiu，Activo 的創辦人，擁有 8 年的軟體開發經驗，專注於構建現代化應用程式與系統，幫助個人與企業實現目標。',
      '在 Activo，我們相信技術應該簡單而強大。我們擅長使用 Next.js、React、TypeScript 等前沿框架，結合雲端技術（如 AWS 或 Vercel）與高效 DevOps 實踐，打造從 MVP 到企業級應用的完整解決方案。無論是開發直觀的網頁應用、優化後端 API，還是整合多媒體功能（如影片串流與處理），我們都能提供客製化服務，滿足你的獨特需求。',
      'Activo 的核心價值在於品質、透明與協作。我們重視每一個專案細節，確保程式碼乾淨、可維護，並以敏捷方式與客戶合作，讓想法快速落地。從概念設計到部署上線，Activo 是你值得信賴的技術夥伴。讓我們一起啟動你的下一個專案！聯繫 Activo，探索技術如何為你的願景增添活力。',
    ],
    servicesHeading: '服務',
    services: [
      {
        name: '各式功能 APP 設計',
        description:
          '為您的品牌打造 iOS 和 Android 應用程式，支援電商、預約、社交等特色功能，快速啟動用戶互動。',
        list: [
          '- APP 功能架構規劃設計',
          '- 可依商業模式客製架構及功能',
          '- 論壇、新聞、交友、娛樂、虛幣、交易、點數等...',
          '- 混合開發 Android、IOS',
        ],
      },
      {
        name: '企業 Web ERP 解決方案',
        description:
          '開發雲端訂閱制平台，自動化您的業務流程，從 CRM 到項目管理，提升效率與數據洞察。',
        list: [
          '- 各類工作流程設計生產管理系統',
          '- 各類商業模式設計進銷存系統',
          '- 各類配送方式設計物流管理系統',
          '- 可依商業模式客製架構及功能',
        ],
      },
      {
        name: '電商與線上商店',
        description:
          '打造個人或企業的電商網站，支援產品管理、支付與行銷整合，助您開拓線上市場。',
        list: [
          '- 靜態版型設計',
          '- 可依商業模式客製架構及功能',
          '- 購物車、線上金流',
        ],
      },
      {
        name: 'AI 增強應用',
        description:
          '將 AI 技術融入您的產品，如聊天機器人或推薦系統，提升用戶體驗與業務成果。',
        list: ['- 電商產品推薦', '- 客服自動化'],
      },
    ],
    partnersHeading: '合作夥伴 - 共同建構未來',
    partnersPartnerName: 'Awkns Labs',
    partnersBody: [
      '在 Activo，我們深知合作是推動創新的關鍵。因此，我們很榮幸能與 Awkns Labs 建立策略夥伴關係，共同探索技術的前沿領域。Awkns Labs 是一家專注於 Web3 與 AI 技術的創新團隊，致力於打造去中心化應用、智慧合約以及人工智慧驅動的解決方案。他們在區塊鏈技術、NFT 生態系統和生成式 AI 模型的開發上擁有深厚專業知識，與 Activo 在現代應用程式開發上的實力形成完美互補。',
      '透過與 Awkns Labs 的合作，我們能夠為客戶提供更全面的服務，從傳統網頁應用到尖端的 Web3 平台，甚至是 AI 增強的個性化體驗。無論是構建下一代去中心化市場，還是利用機器學習優化業務流程，Activo 與 Awkns Labs 的聯手將技術潛力轉化為實際成果。我們的合作模式強調開放溝通與技術協同，確保每個專案都能在快速變化的數位世界中脫穎而出。',
    ],
    selectedProjectsHeading: '精選專案',
    workExperienceHeading: '工作經歷',
    blogHeading: '部落格',
    connectHeading: '聯絡',
    connectIntro: '歡迎透過以下方式聯繫我',
    contactFormHeading: '聯絡表單',
  },
}
