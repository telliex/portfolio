export type Lang = 'en' | 'zh'

export type Translations = {
  headerSubtitle: string
  nav: { home: string; services: string; projects: string; connect: string }
  intro: string[]
  servicesHeading: string
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
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      connect: 'Connect',
    },
    intro: [
      "Welcome to Activo, a personal studio founded by a passionate software engineer dedicated to blending creativity with technology to deliver efficient, reliable, and forward-thinking digital solutions. I'm Telliex Chiu, the founder of Activo, with 8 years of software development experience, specializing in building modern applications and systems to help individuals and businesses achieve their goals.",
      "At Activo, we believe technology should be simple yet powerful. We excel in leveraging cutting-edge frameworks like Next.js, React, and TypeScript, combined with cloud technologies (such as AWS or Vercel) and efficient DevOps practices, to create everything from MVPs to enterprise-grade applications. Whether it's developing intuitive web apps, optimizing backend APIs, or integrating multimedia features (like video streaming and processing), we provide tailored services to meet your unique needs.",
      "Activo is built on the values of quality, transparency, and collaboration. We pay attention to every project detail, ensuring clean, maintainable code and working agilely with clients to bring ideas to life quickly. From concept design to deployment, Activo is your trusted technology partner. Let's kickstart your next project together! Contact Activo and discover how technology can bring your vision to life.",
    ],
    servicesHeading: 'Services',
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
    nav: { home: '首頁', services: '服務', projects: '專案', connect: '聯絡' },
    intro: [
      '歡迎來到 Activo，一家由熱情的軟體工程師創立的個人工作室，致力於將創意與技術融合，為客戶提供高效、可靠且前瞻性的數位解決方案。我是 Telliex Chiu，Activo 的創辦人，擁有 8 年的軟體開發經驗，專注於構建現代化應用程式與系統，幫助個人與企業實現目標。',
      '在 Activo，我們相信技術應該簡單而強大。我們擅長使用 Next.js、React、TypeScript 等前沿框架，結合雲端技術（如 AWS 或 Vercel）與高效 DevOps 實踐，打造從 MVP 到企業級應用的完整解決方案。無論是開發直觀的網頁應用、優化後端 API，還是整合多媒體功能（如影片串流與處理），我們都能提供客製化服務，滿足你的獨特需求。',
      'Activo 的核心價值在於品質、透明與協作。我們重視每一個專案細節，確保程式碼乾淨、可維護，並以敏捷方式與客戶合作，讓想法快速落地。從概念設計到部署上線，Activo 是你值得信賴的技術夥伴。讓我們一起啟動你的下一個專案！聯繫 Activo，探索技術如何為你的願景增添活力。',
    ],
    servicesHeading: '服務',
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
