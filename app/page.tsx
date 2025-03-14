'use client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type ProjectVideoProps = {
  src: string
}

// Vimeo API response type
type VimeoVideoFile = {
  quality: string
  type: string
  width: number
  height: number
  link: string
}

type VimeoApiResponse = {
  files?: VimeoVideoFile[]
}

function ProjectVideo({ src }: ProjectVideoProps) {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Check if the source is a Vimeo link
  const isVimeoLink = src.includes('vimeo.com')

  // Extract Vimeo video ID from URL
  const getVimeoId = (vimeoUrl: string): string => {
    // Extract the video ID from various Vimeo URL formats
    const regex =
      /(?:vimeo\.com\/(?:manage\/videos\/|video\/|channels\/[\w-]+\/|groups\/[\w-]+\/videos\/|album\/\d+\/video\/|)(\d+))/i
    const match = vimeoUrl.match(regex)
    return match && match[1] ? match[1] : ''
  }

  // Get Vimeo video data using API
  useEffect(() => {
    if (!isVimeoLink) {
      setVideoUrl(src)
      setIsLoading(false)
      return
    }

    const videoId = getVimeoId(src)
    if (!videoId) {
      setError('Invalid Vimeo URL')
      setIsLoading(false)
      return
    }

    const fetchVimeoData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://api.vimeo.com/videos/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_API_TOKEN}`,
              'Content-Type': 'application/json',
              Accept: 'application/vnd.vimeo.*+json;version=3.4',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`Vimeo API error: ${response.status}`)
        }

        const data: VimeoApiResponse = await response.json()

        // Get the highest quality MP4 file
        if (data.files && data.files.length > 0) {
          // Sort by quality (assuming higher resolution = better quality)
          const mp4Files = data.files.filter((file) =>
            file.type.includes('mp4'),
          )
          const sortedFiles = mp4Files.sort((a, b) => b.width - a.width)

          if (sortedFiles.length > 0) {
            setVideoUrl(sortedFiles[0].link)
          } else {
            // Fallback to embed if no direct files available
            setVideoUrl(
              `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`,
            )
          }
        } else {
          // Fallback to embed if no files in response
          setVideoUrl(
            `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`,
          )
        }
      } catch (err) {
        console.error('Error fetching Vimeo data:', err)
        setError('Failed to load video')
        // Fallback to embed on error
        setVideoUrl(
          `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchVimeoData()
  }, [src, isVimeoLink])

  // Get Vimeo embed URL for fallback
  const getVimeoEmbedUrl = (vimeoUrl: string): string => {
    const videoId = getVimeoId(vimeoUrl)
    if (!videoId) return ''
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&background=1&muted=1`
  }

  const vimeoEmbedUrl = isVimeoLink ? getVimeoEmbedUrl(src) : ''

  // Loading state
  if (isLoading) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">
          Loading video...
        </div>
      </div>
    )
  }

  // Error state
  if (error && !videoUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className="group relative aspect-video w-full overflow-hidden rounded-xl">
          {/* Zoom indicator overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <div className="rounded-full bg-white/80 p-3 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-800"
              >
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </div>
          </div>

          {isVimeoLink && !videoUrl.includes('mp4') ? (
            // Use iframe for embed if direct MP4 link is not available
            <div className="h-full w-full cursor-zoom-in">
              <iframe
                src={vimeoEmbedUrl}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                frameBorder="0"
                title="Vimeo Video"
              ></iframe>
            </div>
          ) : (
            // Use video tag for direct MP4 links or non-Vimeo videos
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full cursor-zoom-in object-cover"
              onError={(e) => {
                console.error('Video failed to load:', e)
                setError('Failed to load video')
              }}
            />
          )}
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50/90 p-1 ring-1 ring-zinc-200/50 backdrop-blur-sm ring-inset dark:bg-zinc-950/90 dark:ring-zinc-800/50">
          {isVimeoLink && !videoUrl.includes('mp4') ? (
            // Use iframe for embed if direct MP4 link is not available
            <iframe
              src={videoUrl}
              className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
              allow="autoplay; fullscreen; picture-in-picture"
              frameBorder="0"
              title="Vimeo Video Player"
            ></iframe>
          ) : (
            // Use video tag for direct MP4 links or non-Vimeo videos
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
            />
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white/90 p-2 shadow-lg transition-transform hover:scale-110 dark:bg-zinc-800/90 dark:text-zinc-200"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-300" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="mb-4 flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            Welcome to Activo, a personal studio founded by a passionate
            software engineer dedicated to blending creativity with technology
            to deliver efficient, reliable, and forward-thinking digital
            solutions. I’m Telliex Chiu, the founder of Activo, with 8 years of
            software development experience, specializing in building modern
            applications and systems to help individuals and businesses achieve
            their goals.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            At Activo, we believe technology should be simple yet powerful. We
            excel in leveraging cutting-edge frameworks like Next.js, React, and
            TypeScript, combined with cloud technologies (such as AWS or Vercel)
            and efficient DevOps practices, to create everything from MVPs to
            enterprise-grade applications. Whether it’s developing intuitive web
            apps, optimizing backend APIs, or integrating multimedia features
            (like video streaming and processing), we provide tailored services
            to meet your unique needs.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Activo is built on the values of quality, transparency, and
            collaboration. We pay attention to every project detail, ensuring
            clean, maintainable code and working agilely with clients to bring
            ideas to life quickly. From concept design to deployment, Activo is
            your trusted technology partner. Let’s kickstart your next project
            together! Contact Activo and discover how technology can bring your
            vision to life.
          </p>
        </div>
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            歡迎來到
            Activo，一家由熱情的軟體工程師創立的個人工作室，致力於將創意與技術融合，為客戶提供高效、可靠且前瞻性的數位解決方案。我是
            Telliex Chiu，Activo 的創辦人，擁有 8 年
            的軟體開發經驗，專注於構建現代化應用程式與系統，幫助個人與企業實現目標。
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            在 Activo，我們相信技術應該簡單而強大。我們擅長使用
            Next.js、React、TypeScript 等前沿框架，結合雲端技術（如 AWS 或
            Vercel）與高效 DevOps 實踐，打造從 MVP
            到企業級應用的完整解決方案。無論是開發直觀的網頁應用、優化後端
            API，還是整合多媒體功能（如影片串流與處理），我們都能提供客製化服務，滿足你的獨特需求。
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Activo
            的核心價值在於品質、透明與協作。我們重視每一個專案細節，確保程式碼乾淨、可維護，並以敏捷方式與客戶合作，讓想法快速落地。從概念設計到部署上線，Activo
            是你值得信賴的技術夥伴。 讓我們一起啟動你的下一個專案！聯繫
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Activo，探索技術如何為你的願景增添活力。
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="mb-4 flex-1">
          <h4 className="mb-5 text-lg font-medium">
            Partners - Building the Future Together
          </h4>
          <h5 className="mb-2 text-base font-medium">
            <a
              href="https://www.canva.com/design/DAGft1ngs4E/TbyK8XrutzvT_6kfckia0Q/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Awkns Labs
            </a>
          </h5>
          <p className="text-zinc-600 dark:text-zinc-400">
            At Activo, we recognize that collaboration is key to driving
            innovation. That’s why we’re proud to partner with Awkns Labs, a
            forward-thinking team specializing in Web3 and AI technologies.
            Awkns Labs excels in developing decentralized applications, smart
            contracts, and AI-driven solutions, with deep expertise in
            blockchain, NFT ecosystems, and generative AI models. Their
            strengths perfectly complement Activo’s capabilities in modern
            application development.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Through our partnership with Awkns Labs, we offer clients a broader
            range of services—from traditional web applications to cutting-edge
            Web3 platforms and AI-enhanced personalized experiences. Whether
            it’s building next-generation decentralized marketplaces or
            leveraging machine learning to optimize business processes, Activo
            and Awkns Labs turn technological potential into tangible results.
            Our collaborative approach emphasizes open communication and
            technical synergy, ensuring every project stands out in the
            fast-evolving digital landscape.
          </p>
        </div>
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            在 Activo，我們深知合作是推動創新的關鍵。因此，我們很榮幸能與 Awkns
            Labs 建立策略夥伴關係，共同探索技術的前沿領域。Awkns Labs
            是一家專注於 Web3 與 AI
            技術的創新團隊，致力於打造去中心化應用、智慧合約以及人工智慧驅動的解決方案。他們在區塊鏈技術、NFT
            生態系統和生成式 AI 模型的開發上擁有深厚專業知識，與 Activo
            在現代應用程式開發上的實力形成完美互補。
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            透過與 Awkns Labs
            的合作，我們能夠為客戶提供更全面的服務，從傳統網頁應用到尖端的 Web3
            平台，甚至是 AI
            增強的個性化體驗。無論是構建下一代去中心化市場，還是利用機器學習優化業務流程，Activo
            與 Awkns Labs
            的聯手將技術潛力轉化為實際成果。我們的合作模式強調開放溝通與技術協同，確保每個專案都能在快速變化的數位世界中脫穎而出。
          </p>
        </div>
      </motion.section>
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Selected Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={project.video} />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
                <p className="mb-4 text-base text-zinc-600 dark:text-zinc-400">
                  {project.description[0]}
                </p>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description[1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Work Experience</h3>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map((job) =>
            job.link ? (
              <a
                className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                key={job.id}
              >
                <Spotlight
                  className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                  size={64}
                />
                <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                  <div className="relative flex w-full flex-row justify-between">
                    <div>
                      <h4 className="font-normal dark:text-zinc-100">
                        {job.title}
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {job.company}
                      </p>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {job.start} - {job.end}
                    </p>
                  </div>
                </div>
              </a>
            ) : (
              <div
                className="relative overflow-hidden rounded-2xl bg-zinc-300/20 p-[1px] dark:bg-zinc-600/20"
                key={job.id}
              >
                <Spotlight
                  className="from-zinc-900/50 via-zinc-800/50 to-zinc-700/50 blur-2xl dark:from-zinc-100/50 dark:via-zinc-200/50 dark:to-zinc-50/50"
                  size={64}
                />
                <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                  <div className="relative flex w-full flex-row justify-between">
                    <div>
                      <h4 className="font-normal dark:text-zinc-100">
                        {job.title}
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {job.company}
                      </p>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {job.start} - {job.end}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        {BLOG_POSTS.length > 0 && (
          <h3 className="mb-3 text-lg font-medium">Blog</h3>
        )}
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Connect</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
