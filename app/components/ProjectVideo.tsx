// app/components/ProjectVideo.tsx
'use client'
import { useState, useEffect } from 'react'
import { XIcon } from 'lucide-react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'

type ProjectVideoProps = {
  src: string
  image?: string
}

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

export function ProjectVideo({ src, image }: ProjectVideoProps) {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const isVimeoLink = src && src.includes('vimeo.com')

  const getVimeoId = (vimeoUrl: string): string => {
    const regex =
      /(?:vimeo\.com\/(?:manage\/videos\/|video\/|channels\/[\w-]+\/|groups\/[\w-]+\/videos\/|album\/\d+\/video\/|)(\d+))/i
    const match = vimeoUrl.match(regex)
    return match && match[1] ? match[1] : ''
  }

  useEffect(() => {
    if (!src) {
      setVideoUrl('')
      setIsLoading(false)
      return
    }
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
        if (!response.ok) throw new Error(`Vimeo API error: ${response.status}`)
        const data: VimeoApiResponse = await response.json()
        if (data.files && data.files.length > 0) {
          const mp4Files = data.files.filter((file) => file.type.includes('mp4'))
          const sortedFiles = mp4Files.sort((a, b) => b.width - a.width)
          setVideoUrl(
            sortedFiles.length > 0
              ? sortedFiles[0].link
              : `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`,
          )
        } else {
          setVideoUrl(`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`)
        }
      } catch (err) {
        console.error('Error fetching Vimeo data:', err)
        setError('Failed to load video')
        setVideoUrl(`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVimeoData()
  }, [src, isVimeoLink])

  const getVimeoEmbedUrl = (vimeoUrl: string): string => {
    const videoId = getVimeoId(vimeoUrl)
    if (!videoId) return ''
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&background=1&muted=1`
  }

  const vimeoEmbedUrl = isVimeoLink ? getVimeoEmbedUrl(src) : ''

  if (isLoading) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">Loading video...</div>
      </div>
    )
  }

  if ((!src || (error && !videoUrl)) && image) {
    return (
      <div className="group relative aspect-video w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
          <div className="rounded-full bg-white/80 p-3 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
              <path d="M15 3h6v6"></path>
              <path d="M10 14 21 3"></path>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            </svg>
          </div>
        </div>
        <img src={image} alt="Project preview" className="h-full w-full cursor-zoom-in object-cover" />
      </div>
    )
  }

  if (error && !videoUrl && !image) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <MorphingDialog transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
      <MorphingDialogTrigger>
        <div className="group relative aspect-video w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <div className="rounded-full bg-white/80 p-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </div>
          </div>
          {isVimeoLink && !videoUrl.includes('mp4') ? (
            <div className="h-full w-full cursor-zoom-in">
              <iframe src={vimeoEmbedUrl} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" frameBorder="0" title="Vimeo Video"></iframe>
            </div>
          ) : videoUrl ? (
            <video src={videoUrl} autoPlay loop muted playsInline className="h-full w-full cursor-zoom-in object-cover" onError={(e) => { console.error('Video failed to load:', e); setError('Failed to load video') }} />
          ) : image ? (
            <img src={image} alt="Project preview" className="h-full w-full cursor-zoom-in object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
              <div className="text-zinc-500 dark:text-zinc-400">No media available</div>
            </div>
          )}
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50/90 p-1 ring-1 ring-zinc-200/50 backdrop-blur-sm ring-inset dark:bg-zinc-950/90 dark:ring-zinc-800/50">
          {isVimeoLink && !videoUrl.includes('mp4') ? (
            <iframe src={videoUrl} className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]" allow="autoplay; fullscreen; picture-in-picture" frameBorder="0" title="Vimeo Video Player"></iframe>
          ) : videoUrl ? (
            <video src={videoUrl} autoPlay loop muted playsInline controls className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]" />
          ) : image ? (
            <img src={image} alt="Project preview" className="aspect-video h-[50vh] w-full rounded-xl object-contain md:h-[70vh]" />
          ) : (
            <div className="flex aspect-video h-[50vh] w-full items-center justify-center rounded-xl bg-zinc-100 md:h-[70vh] dark:bg-zinc-800">
              <div className="text-zinc-500 dark:text-zinc-400">No media available</div>
            </div>
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white/90 p-2 shadow-lg transition-transform hover:scale-110 dark:bg-zinc-800/90 dark:text-zinc-200"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 0.3, duration: 0.1 } },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-300" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
