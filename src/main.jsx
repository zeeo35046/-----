import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const makeGallery = (slug, images, videos = 0, gifs = 0) => [
  ...Array.from({ length: images }, (_, index) => `/product-galleries/${slug}/${String(index + 1).padStart(2, '0')}.webp`),
  ...Array.from({ length: gifs }, (_, index) => `/product-galleries/${slug}/g${String(index + 1).padStart(2, '0')}.gif`),
  ...Array.from({ length: videos }, (_, index) => `/product-galleries/${slug}/v${String(index + 1).padStart(2, '0')}.mp4`),
]

const productGalleries = {
  水晶款: makeGallery('crystal', 9, 1), EVO: makeGallery('evo', 12), 轨道FUTURE: makeGallery('orbit', 5, 1),
  机械之心: makeGallery('mechanical-heart', 4), 夜行: makeGallery('night-walk', 6), 夜之城: makeGallery('night-city', 4),
  自由之翼: makeGallery('wings', 3), 涡轮: makeGallery('turbine', 6), 武士: makeGallery('samurai', 3),
  KING: makeGallery('king', 3), 灭绝生物启示录: makeGallery('extinction', 4), 南洋探索: makeGallery('south-seas', 5),
  小丑: makeGallery('jester', 5, 1), 无畏航路: makeGallery('fearless-voyage', 4, 1), 司南台钟: makeGallery('sinan', 4, 1),
  悟空: makeGallery('wukong', 4), 后羿射日: makeGallery('houyi', 4), 砂金双发条: makeGallery('gold-dust', 7),
  宝石国度: makeGallery('gemstone', 7), 独立日: makeGallery('independence', 6), 月相: makeGallery('moon-phase', 6, 2, 2),
  破局: ['01.jpg', '02.png', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg'].map((file) => `/product-galleries/breakthrough/${file}`),
  夏日之味: ['01.jpg', '02.jpg', '03.jpg', '04.jpg', 'v01.mp4'].map((file) => `/product-galleries/summer-flavor/${file}`),
  月之暗面: ['01.jpg', '02.jpg', 'v01.mp4'].map((file) => `/product-galleries/dark-side-moon/${file}`),
}

const collections = [
  { number: '01', title: '专业镂空', note: '结构、机芯与空间层次', items: [
    ['影像', 'SKELETON FILM', '/selected-work/skeleton-film.mp4', 'video', '/selected-work/skeleton-film-cover.jpg'],
    ['水晶款', 'CRYSTAL', '/selected-work/skeleton-crystal-white.jpg'],
    ['EVO', 'EVOLUTION', '/selected-work/skeleton-evo-evolution.jpg'],
    ['涡轮', 'TURBINE', '/product-galleries/turbine/01.webp'],
    ['轨道FUTURE', 'FUTURE ORBIT', '/selected-work/luxury-future-orbit.jpg'],
    ['机械之心', 'MECHANICAL HEART', '/selected-work/skeleton-mechanical-heart.jpg'],
    ['夜行', 'NIGHT WALK', '/selected-work/skeleton-night-walk.jpg'],
    ['夜之城', 'NIGHT CITY', '/selected-work/skeleton-night-city.jpg'],
    ['自由之翼', 'WINGS OF FREEDOM', '/selected-work/skeleton-wings-of-freedom.jpg'],
  ] },
  { number: '02', title: '艺术系列', note: '叙事表盘与艺术主题表达', items: [
    ['武士', 'SAMURAI', '/selected-work/image1.jpeg'], ['KING', 'KING', '/selected-work/image2.jpeg'], ['灭绝生物启示录', 'EXTINCTION REVELATION', '/selected-work/image5.jpeg'], ['南洋探索', 'SOUTH SEAS EXPLORATION', '/selected-work/image6.jpeg'],
  ] },
  { number: '03', title: '趣味系列', note: '将日常兴趣转化为腕间视觉', items: [
    ['小丑', 'JESTER', '/selected-work/image8.jpeg'], ['翻转台球', 'FLIP BILLIARDS', '/selected-work/image7.jpeg'], ['无畏航路', 'FEARLESS VOYAGE', '/selected-work/image9.jpeg'], ['夏日之味', 'TASTE OF SUMMER', '/product-galleries/summer-flavor/01.jpg'], ['月之暗面', 'DARK SIDE OF THE MOON', '/product-galleries/dark-side-moon/01.jpg'],
  ] },
  { number: '04', title: '新国风', note: '传统文化意象的现代产品转译', items: [
    ['司南台钟', 'SINAN DESK CLOCK', '/selected-work/image11.jpeg'], ['破局', 'BREAKTHROUGH', '/product-galleries/breakthrough/01.jpg'], ['悟空', 'WUKONG', '/selected-work/image4.jpeg'], ['后羿射日', 'HOU YI SHOOTS THE SUNS', '/selected-work/image3.jpeg'],
  ] },
  { number: '05', title: '顶奢制品', note: '高级制表、宝石与蓝晶砂月相', items: [
    ['砂金双发条', 'GOLD DUST TWIN BARREL', '/selected-work/luxury-gold-dust-twin-barrel.jpg'],
    ['宝石国度', 'GEMSTONE KINGDOM', '/selected-work/luxury-gemstone-kingdom.jpg'],
    ['独立日', 'INDEPENDENCE DAY', '/selected-work/luxury-independence-day.jpg'],
    ['月相', 'MOON PHASE', '/selected-work/luxury-moon-phase.jpg'],
  ] },
]

const spotlights = [
  { number: 'A', title: 'EVO · Kickstarter', type: '众筹商业案例', note: '众筹金额 12W+ 港币', visual: 'evo', image: '/commercial-kick.jpg' },
  { number: 'B', title: '水晶款 · 淘宝', type: '电商商业案例', note: '上线两个月销售额达 20 万元', visual: 'crystal', image: '/commercial-taobao.jpg' },
  { number: 'C', title: '产品解构动画渲染', type: '产品视频', note: '功能展示与动态视觉表达', visual: 'multifunction' },
]

const strengths = [
  ['01', '端到端产品设计', '覆盖概念、结构建模、材质工艺、打样调试与量产上线。'],
  ['02', '三维与视觉表达', '以 Rhino、KeyShot、AI 与 PS 构建完整的设计沟通链路。'],
  ['03', '商业结果意识', '将差异化卖点转化为电商页面、品牌物料与可验证的销售成果。'],
  ['04', '跨职能推进', '在精简团队中连接客户、供应端与运营，高效推动方案落地。'],
]

const designTools = [
  ['Rhino', '/tools/rhino.png'],
  ['Illustrator', '/tools/illustrator.png'],
  ['Photoshop', '/tools/photoshop.png'],
  ['KeyShot', '/tools/keyshot.png'],
  ['Codex', '/tools/codex.png'],
]

function Arrow({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14M14 7l5 5-5 5'} />
    </svg>
  )
}

function ClickToPlayVideo({ src = '/multifunction-watch.mp4', label = '产品动画演示', className = '', poster = '' }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const playVideo = () => {
    videoRef.current?.play()
  }

  return (
    <div className={`click-video ${className} ${isPlaying ? 'is-playing' : ''}`} onPointerDown={(event) => event.stopPropagation()}>
      <video
        ref={videoRef}
        src={src}
        controls
        muted
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {poster && !isPlaying && <img className="video-poster" src={poster} alt="" aria-hidden="true" />}
      {!isPlaying && (
        <button className="video-play-button" type="button" onClick={playVideo} aria-label="播放产品动画演示视频">
          <span className="video-play-icon" aria-hidden="true" />
          <strong>PLAY FILM</strong>
        </button>
      )}
    </div>
  )
}

function SeriesGallery({ collection, onOpenGallery }) {
  const railRef = useRef(null)
  const dragRef = useRef({ active: false, moved: false, x: 0, scrollLeft: 0 })
  const scroll = (direction) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: direction * rail.clientWidth * 0.78, behavior: 'smooth' })
  }
  const startDrag = (event) => {
    const rail = railRef.current
    if (!rail) return
    dragRef.current = { active: true, moved: false, x: event.clientX, scrollLeft: rail.scrollLeft }
  }
  const moveDrag = (event) => {
    const rail = railRef.current
    if (!rail || !dragRef.current.active) return
    const distance = event.clientX - dragRef.current.x
    if (Math.abs(distance) > 6) dragRef.current.moved = true
    rail.scrollLeft = dragRef.current.scrollLeft - distance
  }
  const endDrag = () => { dragRef.current.active = false }

  return (
    <section className="series-gallery" aria-labelledby={`series-${collection.number}`}>
      <div className="series-header">
        <div className="series-number">{collection.number}</div>
        <div>
          <p>{collection.note}</p>
          <h3 id={`series-${collection.number}`}>{collection.title}</h3>
        </div>
        <span>{String(collection.items.length).padStart(2, '0')} PRODUCTS</span>
      </div>
      <div className="series-rail" ref={railRef} aria-label={`${collection.title}，可横向滑动`} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onPointerLeave={endDrag}>
        {collection.items.map(([title, english, image, mediaType, poster], index) => (
          <article className={`series-item ${image ? 'has-image' : 'is-placeholder'}`} key={`${title}-${index}`}>
            <div className="series-media">
              {mediaType === 'video' ? (
                <ClickToPlayVideo src={image} label={`${title}视频`} className="series-video" poster={poster} />
              ) : image ? (
                productGalleries[title] ? (
                  <button className="series-image-button" type="button" onClick={() => { if (!dragRef.current.moved) onOpenGallery(title, english) }} aria-label={`打开${title}产品图集`}>
                    <img src={image} alt={`${title}产品设计`} loading="lazy" decoding="async" draggable="false" />
                    <span>VIEW GALLERY · {String(productGalleries[title].length).padStart(2, '0')}</span>
                  </button>
                ) : <img src={image} alt={`${title}产品设计`} loading="lazy" decoding="async" />
              ) : (
                <div className="product-placeholder"><span>{String(index + 1).padStart(2, '0')}</span><p>PRODUCT IMAGE<br />TO BE ADDED</p></div>
              )}
              <div className="series-caption"><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{title}</h4><small>{english}</small></div></div>
            </div>
          </article>
        ))}
      </div>
      <div className="series-controls" aria-label={`${collection.title}画廊控制`}>
        <button className="gallery-arrow gallery-arrow-left" type="button" onClick={() => scroll(-1)} aria-label={`向左浏览${collection.title}`}><Arrow /></button>
        <button className="gallery-arrow gallery-arrow-right" type="button" onClick={() => scroll(1)} aria-label={`向右浏览${collection.title}`}><Arrow /></button>
      </div>
    </section>
  )
}

function HeroVideo() {
  const canvasRef = useRef(null)
  const [hasVideo, setHasVideo] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '')) return undefined
    let idleId
    let timerId
    const beginLoad = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(() => setVideoSrc('/hero-video.mp4'), { timeout: 1800 })
      else timerId = window.setTimeout(() => setVideoSrc('/hero-video.mp4'), 650)
    }
    if (document.readyState === 'complete') beginLoad()
    else window.addEventListener('load', beginLoad, { once: true })
    return () => {
      window.removeEventListener('load', beginLoad)
      if (idleId) window.cancelIdleCallback(idleId)
      if (timerId) window.clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    if (hasVideo) return undefined
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frame = 0
    let animation
    let lastFrame = 0
    let visible = !document.hidden

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (timestamp = 0) => {
      if (!visible) return
      if (timestamp - lastFrame < 32) {
        animation = requestAnimationFrame(draw)
        return
      }
      lastFrame = timestamp
      frame += 0.004
      const width = window.innerWidth
      const height = window.innerHeight
      const cx = width * 0.68
      const cy = height * 0.49
      const radius = Math.min(width, height) * 0.255
      const gradient = context.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.6)
      gradient.addColorStop(0, '#343934')
      gradient.addColorStop(0.48, '#181b18')
      gradient.addColorStop(1, '#0d0f0e')
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      context.save()
      context.translate(cx, cy)
      context.rotate(frame * 0.32)
      context.strokeStyle = 'rgba(156, 108, 255, .14)'
      context.lineWidth = 1
      for (let i = 0; i < 60; i += 1) {
        const angle = (Math.PI * 2 * i) / 60
        const inner = radius * 0.76
        const outer = radius * (i % 5 === 0 ? 0.94 : 0.86)
        context.beginPath()
        context.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner)
        context.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer)
        context.stroke()
      }
      context.restore()

      const rings = [1, 0.78, 0.55, 0.32]
      rings.forEach((scale, index) => {
        context.beginPath()
        context.arc(cx, cy, radius * scale, 0, Math.PI * 2)
        context.strokeStyle = index === 1 ? 'rgba(156, 108, 255, .34)' : 'rgba(255,255,255,.09)'
        context.lineWidth = index === 1 ? 2 : 1
        context.stroke()
      })
      context.beginPath()
      context.moveTo(cx, cy)
      context.lineTo(cx + Math.cos(frame * 8) * radius * 0.58, cy + Math.sin(frame * 8) * radius * 0.58)
      context.strokeStyle = 'rgba(156, 108, 255, .82)'
      context.lineWidth = 2
      context.stroke()

      context.strokeStyle = 'rgba(255,255,255,.08)'
      context.lineWidth = radius * 0.22
      context.beginPath()
      context.arc(cx, cy, radius * 1.03, -1.05, 1.05)
      context.stroke()
      context.beginPath()
      context.arc(cx, cy, radius * 1.03, Math.PI - 1.05, Math.PI + 1.05)
      context.stroke()
      animation = requestAnimationFrame(draw)
    }

    const handleVisibility = () => {
      visible = !document.hidden
      if (visible) animation = requestAnimationFrame(draw)
      else cancelAnimationFrame(animation)
    }

    resize()
    animation = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      cancelAnimationFrame(animation)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [hasVideo])

  return (
    <div className={`hero-media ${hasVideo ? 'has-video' : 'fallback-active'}`} aria-hidden="true">
      <canvas ref={canvasRef} />
      <video
        src={videoSrc || undefined}
        autoPlay
        muted
        playsInline
        loop
        preload="none"
        onCanPlay={() => setHasVideo(true)}
        onError={() => setHasVideo(false)}
      />
      <div className="hero-grain" />
    </div>
  )
}

function WatchVisual({ variant }) {
  return (
    <div className={`watch-visual ${variant}`} aria-label="腕表项目概念占位视觉">
      <div className="watch-shadow" />
      <div className="watch-strap top" />
      <div className="watch-case">
        <span className="tick t1" /><span className="tick t2" /><span className="tick t3" /><span className="tick t4" />
        <span className="inner-ring" />
        <span className="hand hour" /><span className="hand minute" />
        <span className="pivot" />
      </div>
      <div className="watch-strap bottom" />
      <span className="visual-note">CONCEPT PLACEHOLDER / REPLACE WITH PROJECT MEDIA</span>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [productGallery, setProductGallery] = useState(null)
  const [time, setTime] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Shanghai' }).format(new Date()))
    update()
    const timer = setInterval(update, 30000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setLightbox(null)
        setProductGallery(null)
        setContactOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    let scheduled = false
    const handleScroll = () => {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(() => {
        const next = window.scrollY > 28
        setScrolled((current) => current === next ? current : next)
        scheduled = false
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTargets = [
      ...document.querySelectorAll('.section-heading, .profile-heading, .spotlight-heading, .series-header, .about-copy, .metrics, .tools-heading'),
    ]
    const cardTargets = [
      ...document.querySelectorAll('.series-item, .spotlight-card, .strength-grid article, .profile-photo, .material-card'),
    ]
    if (reduceMotion) return undefined

    // Prepare reveal elements before observation so they never flash in their
    // final position and then jump back to the animation's first frame.
    revealTargets.concat(cardTargets).forEach((element) => {
      element.style.opacity = '0'
      element.style.willChange = 'transform, opacity, clip-path'
    })

    const heroTargets = [...document.querySelectorAll('.hero-overline, .hero-title-line b, .hero-intro, .hero-cta, .hero-index, .hero-play')]
    heroTargets.forEach((element, index) => {
      const animation = element.animate([
        { opacity: 0, transform: index === 1 || index === 2 ? 'translateY(90px) scaleX(.72)' : 'translateY(28px)' },
        { opacity: 1, transform: 'none' },
      ], { duration: index === 1 || index === 2 ? 1450 : 950, delay: 120 + index * 105, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' })
      animation.onfinish = () => animation.cancel()
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const isCard = cardTargets.includes(entry.target)
          const siblings = isCard ? [...(entry.target.parentElement?.children || [])] : []
          const order = Math.max(0, siblings.indexOf(entry.target)) % 6
          const animation = entry.target.animate([
            { opacity: 0, transform: isCard ? 'translateY(72px) scale(.97)' : 'translateY(100px) scaleY(.88)', clipPath: isCard ? 'inset(10% 0 0)' : 'inset(0 0 100% 0)' },
            { opacity: 1, transform: 'none', clipPath: 'inset(0)' },
          ], { duration: isCard ? 1100 : 1350, delay: isCard ? order * 80 : 0, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' })
          animation.onfinish = () => {
            entry.target.style.opacity = ''
            entry.target.style.willChange = ''
            animation.cancel()
          }
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px 22% 0px', threshold: 0.01 })
    revealTargets.concat(cardTargets).forEach((element) => observer.observe(element))

    const parallaxMedia = [...document.querySelectorAll('.series-media img, .spotlight-visual img, .profile-photo img')]
    let ticking = false
    const updateParallax = () => {
      const viewport = window.innerHeight
      parallaxMedia.forEach((image) => {
        const rect = image.parentElement.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < viewport) {
          const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport
          image.style.setProperty('--parallax-y', `${Math.max(-18, Math.min(18, progress * -28)).toFixed(2)}px`)
        }
      })
      ticking = false
    }
    const handleMotionScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateParallax)
      }
    }
    updateParallax()
    window.addEventListener('scroll', handleMotionScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleMotionScroll)
    }
  }, [])

  const close = () => setMenuOpen(false)
  const openProductGallery = (title, english) => setProductGallery({ title, english, assets: productGalleries[title] })

  return (
    <main>
      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <button className="nav-menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label="切换导航">
          <i /><i /><span>{menuOpen ? '关闭' : '菜单'}</span>
        </button>
        <a className="logo" href="#top" onClick={close} aria-label="梁鹏作品集首页">LIANG PENG</a>
        <nav className={menuOpen ? 'open' : ''} aria-label="主导航">
          <a href="#work" onClick={close}>项目</a>
          <a href="#about" onClick={close}>关于</a>
          <a href="#strengths" onClick={close}>能力</a>
          <a href="#contact" onClick={close}>联系</a>
        </nav>
        <div className="nav-actions">
          <a href="#work">作品</a>
          <button className="nav-contact-trigger" type="button" onClick={() => setContactOpen(!contactOpen)} aria-expanded={contactOpen}>联系 ↗</button>
          {contactOpen && (
            <div className="nav-contact-card">
              <span>CONTACT</span>
              <a href="tel:19072971878">+86 190 7297 1878</a>
              <a href="mailto:3130224767@qq.com">3130224767@qq.com</a>
            </div>
          )}
        </div>
      </header>

      <section className="hero" id="top">
        <HeroVideo />
        <div className="hero-content">
          <p className="hero-overline">产品设计 · 工业设计 · 品牌视觉</p>
          <h1><span className="hero-title-line"><b>LIANG PENG</b></span><span className="hero-title-line"><b><em>SELECTED WORKS</em></b></span></h1>
          <p className="hero-intro">以技术为核心，连接产品结构、视觉表达与商业落地。</p>
          <a href="#work" className="hero-cta">探索作品</a>
        </div>
        <div className="hero-index"><span>PORTFOLIO / 2026</span><span>HANGZHOU · {time}</span></div>
        <div className="hero-play"><span className="play-triangle" /> <span>SHOWREEL</span></div>
      </section>

      <section className="work section" id="work">
        <div className="section-heading">
          <div className="section-kicker">01 / SELECTED WORK</div>
          <h2>设计集锦</h2>
          <p>以系列化方式整理产品作品，呈现造型、结构、材质与商业表达的不同方向。</p>
        </div>
        <div className="series-stack">
          {collections.map((collection) => <SeriesGallery collection={collection} onOpenGallery={openProductGallery} key={collection.number} />)}
        </div>

        <div className="spotlight-heading">
          <span>COMMERCIAL CASES</span>
          <h3>商业案例</h3>
          <p>众筹、电商经营与动态产品展示。</p>
        </div>
        <div className="spotlight-grid">
          {spotlights.map((item) => (
            <article className={`spotlight-card ${item.visual}`} key={item.number}>
              <div className="spotlight-visual">
                {item.visual === 'multifunction' ? (
                  <ClickToPlayVideo poster="/multifunction-watch-poster.jpg" />
                ) : (
                  <button className="spotlight-image-button" type="button" onClick={() => setLightbox(item)} aria-label={`放大查看${item.title}商业案例图片`}>
                    <img src={item.image} alt={`${item.title}商业案例界面`} loading="lazy" decoding="async" />
                    <span>点击放大 ↗</span>
                  </button>
                )}
              </div>
              <div className="spotlight-meta">
                <span>{item.number}</span>
                <div><p>{item.type}</p><h4>{item.title}</h4><small>{item.note}</small></div>
                <button className="project-arrow" aria-label={`${item.title}案例详情将在后续开放`}><Arrow diagonal /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section shell" id="about">
        <div className="profile-heading">
          <div className="section-kicker">02 / PROFILE</div>
          <h2>从造型与结构出发，<br /><em>把设计带到真实市场。</em></h2>
          <p>PRODUCT · INDUSTRIAL · BRAND</p>
        </div>
        <div className="profile-layout">
          <div className="about-copy">
            <span className="profile-index">ABOUT / 梁鹏</span>
            <p>我是一名产品设计师、工业设计师与品牌视觉设计师，具备产品从概念、建模、材质工艺到打样、宣传与电商上线的全流程经验。</p>
            <p>曾在山西中宸表业负责衔尾蛇手表产品设计。擅长在精简团队中跨越产品、视觉与运营边界，让设计不止停留在效果图。</p>
            <div className="contact-row">
              <a href="tel:19072971878">190 7297 1878</a>
              <a href="mailto:3130224767@qq.com">3130224767@qq.com</a>
              <span>杭州，中国</span>
            </div>
          </div>
          <div className="profile-collage" aria-label="设计师工作照与常用产品材质研究">
            <div className="material-title"><span>MATERIAL STUDY</span><p>材质与表面处理</p></div>
            <div className="collage-grid">
              <figure className="profile-photo profile-photo-main">
                <img src="/profile-studio.jpg" alt="梁鹏在工作室使用显微镜进行产品研究" />
                <figcaption><span>01</span> OBSERVE / DETAIL / CRAFT</figcaption>
              </figure>
              <div className="material-sample brushed"><i /><span>拉丝金属<small>BRUSHED</small></span></div>
              <div className="material-sample leather"><i /><span>皮革<small>LEATHER</small></span></div>
              <figure className="profile-photo profile-photo-secondary">
                <img src="/profile-portrait.jpg" alt="梁鹏在设计工作室中的个人照片" />
                <figcaption><span>02</span> DESIGNER AT WORK</figcaption>
              </figure>
              <div className="material-sample wood"><i /><span>木纹<small>WOOD</small></span></div>
              <div className="material-sample polished"><i /><span>镜面抛光<small>POLISHED</small></span></div>
              <div className="material-sample matte"><i /><span>喷砂磨砂<small>MATTE</small></span></div>
            </div>
          </div>
          <div className="metrics">
            <div><strong>20<sup>W+</sup></strong><span>水晶款两月销售额</span></div>
            <div><strong>12W+<sup>港币</sup></strong><span>EVO 系列众筹金额</span></div>
            <div><strong>03<sup>YRS</sup></strong><span>腕表设计与落地经验</span></div>
          </div>
        </div>
      </section>

      <section className="strengths section" id="strengths">
        <div className="shell">
          <div className="section-heading split">
            <div><div className="section-kicker">03 / CAPABILITIES</div><h2>设计能力</h2></div>
            <p>既能深入产品细节，也能把握品牌呈现与市场节奏。</p>
          </div>
          <div className="strength-grid">
            {strengths.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <div className="cap-icon"><span /><span /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="tools-marquee" aria-label="常用设计工具">
            <div className="tools-label"><span>TOOLS / SOFTWARE</span><p>常用工具与工作流</p></div>
            <div className="tools-window">
              <div className="tools-track">
                {[0, 1].map((group) => (
                  <div className="tools-group" aria-hidden={group === 1} key={group}>
                    {designTools.map(([name, icon]) => (
                      <div className="tool-chip" key={`${group}-${name}`}>
                        <span className="tool-icon"><img src={icon} alt={group === 0 ? `${name} 图标` : ''} /></span>
                        <strong>{name}</strong>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-screen" id="contact">
        <div className="shell">
          <div className="section-kicker light">04 / CONTACT</div>
          <a className="contact-title" href="mailto:3130224767@qq.com">让我们一起做点<br /><em>经得住时间的设计。</em><Arrow diagonal /></a>
          <div className="footer-meta">
            <div><span>EMAIL</span><a href="mailto:3130224767@qq.com">3130224767@qq.com</a></div>
            <div><span>PHONE</span><a href="tel:19072971878">+86 190 7297 1878</a></div>
            <div><span>BASED IN</span><p>杭州 · 中国</p></div>
            <div className="back-top"><a href="#top">返回顶部 ↑</a></div>
          </div>
        </div>
      </footer>
      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${lightbox.title}大图预览`} onClick={() => setLightbox(null)}>
          <button className="lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="关闭大图预览">×</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={lightbox.image} alt={`${lightbox.title}商业案例大图`} />
            <figcaption><span>{lightbox.type}</span><strong>{lightbox.title}</strong></figcaption>
          </figure>
        </div>
      )}
      {productGallery && (
        <div className="product-gallery-modal" role="dialog" aria-modal="true" aria-label={`${productGallery.title}产品图集`} onClick={() => setProductGallery(null)}>
          <div className="gallery-wall-shell" onClick={(event) => event.stopPropagation()}>
            <header className="gallery-wall-header">
              <div><span>{productGallery.english}</span><h2>{productGallery.title}</h2></div>
              <p>{String(productGallery.assets.length).padStart(2, '0')} MEDIA / IMAGE &amp; FILM</p>
              <button className="gallery-modal-close" type="button" onClick={() => setProductGallery(null)} aria-label="关闭产品图集">×</button>
            </header>
            <div className="product-gallery-wall">
              {[...productGallery.assets].sort((a, b) => Number(b.endsWith('.mp4')) - Number(a.endsWith('.mp4'))).map((asset, index, orderedAssets) => {
                const isVideo = asset.endsWith('.mp4')
                const poster = orderedAssets.find((item) => !item.endsWith('.mp4') && !item.endsWith('.gif')) || ''
                return (
                  <figure className={`gallery-wall-item ${isVideo ? 'is-featured-video' : ''}`} style={{ '--item-index': index }} key={asset}>
                    {isVideo ? <video src={asset} poster={poster} controls playsInline preload="metadata" /> : <img src={asset} alt={`${productGallery.title}作品 ${index + 1}`} loading="lazy" decoding="async" />}
                    <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{isVideo ? 'FILM' : 'IMAGE'}</figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
