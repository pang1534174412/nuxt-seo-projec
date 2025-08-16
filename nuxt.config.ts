// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-15',
  devtools: { enabled: false },

  // 模块配置
  modules: ['@nuxtjs/seo'],

  // Site 配置 - @nuxtjs/seo 必需
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://musicchat.app',
    name: '音乐聊天',
    description: '专为音乐爱好者打造的实时聊天平台。发现志同道合的朋友，分享音乐心得，交流听歌体验。',
    defaultLocale: 'zh-CN'
  },

  // SEO 模块配置
  robots: {
    // 基本配置
    UserAgent: '*',
    Allow: '/',
    
    // 只禁止真正需要保护的路径
    Disallow: [
      '/admin/',           // 管理后台
      '/api/auth/',        // 认证相关API
      '/api/private/',     // 私有API
      '/*.json$',          // JSON配置文件
      '/tmp/',             // 临时文件
      '/cache/'            // 缓存文件
    ],
    
    // 网站地图
    Sitemap: process.env.NUXT_PUBLIC_SITE_URL ? `${process.env.NUXT_PUBLIC_SITE_URL}/sitemap.xml` : 'https://musicchat.app/sitemap.xml'
  },

  // Sitemap 配置
  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL || 'https://musicchat.app',
    gzip: true,
    routes: [
      '/',
      '/messages',
      '/profile'
    ]
  },

  // SSR配置
  ssr: true,

  // 高级SEO配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
      title: '音乐聊天 - 发现音乐好友，分享音乐体验',
      titleTemplate: '%s | 音乐聊天',
      meta: [
        // 基本信息
        { name: 'description', content: '专为音乐爱好者打造的实时聊天平台。发现志同道合的朋友，分享音乐心得，交流听歌体验。支持实时聊天、图片分享、表情互动。' },
        { name: 'keywords', content: '音乐聊天,音乐社交,在线交友,音乐爱好者,1v1聊天,即时通讯,音乐分享,聊天交友,实时聊天,音乐体验' },
        { name: 'format-detection', content: 'telephone=no' },
        
        // 高级SEO标签
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'bingbot', content: 'index, follow' },
        { name: 'author', content: '音乐聊天应用' },
        { name: 'creator', content: '音乐聊天应用开发团队' },
        { name: 'publisher', content: '音乐聊天应用' },
        { name: 'generator', content: 'Nuxt.js' },
        { name: 'referrer', content: 'origin-when-cross-origin' },
        
        // 内容分类和特性
        { name: 'category', content: '音乐,聊天,社交,娱乐' },
        { name: 'coverage', content: 'Worldwide' },
        { name: 'distribution', content: 'Global' },
        { name: 'rating', content: 'General' },
        { name: 'target', content: 'all' },
        { name: 'HandheldFriendly', content: 'True' },
        { name: 'MobileOptimized', content: '320' },
        
        // 版权和所有权
        { name: 'copyright', content: `© ${new Date().getFullYear()} 音乐聊天应用. All rights reserved.` },
        { name: 'owner', content: '音乐聊天应用' },
        
        // 地理位置信息
        { name: 'geo.region', content: 'CN' },
        { name: 'geo.country', content: 'China' },
        { name: 'geo.placename', content: '中国' },
        { name: 'ICBM', content: '39.9042,116.4074' },
        
        // 语言和地区
        { 'http-equiv': 'content-language', content: 'zh-CN' },
        { name: 'language', content: 'Chinese' },
        
        // OpenGraph 标签
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '音乐聊天' },
        { property: 'og:title', content: '音乐聊天 - 发现音乐好友，分享音乐体验' },
        { property: 'og:description', content: '专为音乐爱好者打造的实时聊天平台。发现志同道合的朋友，分享音乐心得，交流听歌体验。' },
        { property: 'og:image', content: '/og-image-large.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: '音乐聊天应用 - 音乐爱好者的社交平台' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:locale:alternate', content: 'en_US' },
        
        // Twitter Card 标签
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@music_chat_app' },
        { name: 'twitter:creator', content: '@music_chat_app' },
        { name: 'twitter:title', content: '音乐聊天 - 音乐爱好者的社交平台' },
        { name: 'twitter:description', content: '发现音乐好友，分享音乐体验，享受实时聊天乐趣。' },
        { name: 'twitter:image', content: '/twitter-card.jpg' },
        { name: 'twitter:image:alt', content: '音乐聊天应用截图' },
        
        // 移动端优化
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: '音乐聊天' },
        { name: 'application-name', content: '音乐聊天' },
        
        // Microsoft Tiles
        { name: 'msapplication-TileColor', content: '#667eea' },
        { name: 'msapplication-TileImage', content: '/ms-tile-144x144.png' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        { name: 'msapplication-navbutton-color', content: '#667eea' },
        { name: 'msapplication-starturl', content: '/' },
        
        // 主题色彩
        { name: 'theme-color', content: '#667eea' },
        { name: 'color-scheme', content: 'light' },
        
        // 应用商店相关
        { name: 'apple-itunes-app', content: 'app-id=your-app-id, app-argument=your-app-url' },
        { name: 'google-play-app', content: 'app-id=your.package.name' },
        
        // 安全相关
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'referrer', content: 'origin-when-cross-origin' },
        
        // 性能优化
        { name: 'dns-prefetch-control', content: 'on' },
        { name: 'preconnect', content: 'https://api.dicebear.com' },
        
        // 无障碍支持
        { name: 'accessibility', content: 'high-contrast' }
      ],
      link: [
        // Favicon 和图标全套
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon-64x64.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/favicon-128x128.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '256x256', href: '/favicon-256x256.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon-512x512.png' },
        
        // Apple Touch Icons
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
        
        // PWA 相关
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#667eea' },
        
        // DNS 预取和预连接
        { rel: 'dns-prefetch', href: '//api.dicebear.com' },
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
        { rel: 'preconnect', href: 'https://api.dicebear.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        
        // 搜索引擎发现
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
        { rel: 'alternate', type: 'application/rss+xml', title: '音乐聊天 RSS', href: '/feed.xml' },
        { rel: 'alternate', type: 'application/atom+xml', title: '音乐聊天 Atom', href: '/atom.xml' },
        
        // 多语言支持
        { rel: 'alternate', hreflang: 'zh-CN', href: process.env.NUXT_PUBLIC_SITE_URL || 'https://musicchat.app' },
        { rel: 'alternate', hreflang: 'en', href: (process.env.NUXT_PUBLIC_SITE_URL || 'https://musicchat.app') + '/en' },
        { rel: 'alternate', hreflang: 'x-default', href: process.env.NUXT_PUBLIC_SITE_URL || 'https://musicchat.app' },
        
        // Canonical URL
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL || 'https://musicchat.app' },
        
        // 性能优化
        { rel: 'preload', href: '/fonts/main.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        
        // 第三方服务
        { rel: 'me', href: 'https://github.com/music-chat-app' },
        { rel: 'author', href: '/humans.txt' }
      ],
      noscript: [
        // 无JavaScript时的提示
        { innerHTML: '<div style="padding: 20px; background: #f0f0f0; text-align: center;">请启用JavaScript以获得最佳体验</div>' }
      ]
    }
  },

  // CSS配置
  css: ['~/assets/css/main.css'],

  // 运行时配置
  runtimeConfig: {
    // 私有运行时配置 (仅在服务端可用)
    apiSecret: process.env.API_SECRET || 'your-api-secret',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
    seoApiKey: process.env.SEO_API_KEY || '',

    // 公共运行时配置 (在客户端和服务端都可用)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://musicchat.app',
      siteName: '音乐聊天',
      siteDescription: '专为音乐爱好者打造的实时聊天平台。发现志同道合的朋友，分享音乐心得，交流听歌体验。',
      language: 'zh-CN',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://amtapi.267girl.com',
      cdnUrl: process.env.NUXT_PUBLIC_CDN_URL || '',
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
      baiduAnalyticsId: process.env.NUXT_PUBLIC_BAIDU_ANALYTICS_ID || '',
      
      // SEO相关配置
      seoConfig: {
        defaultImage: '/og-image-large.jpg',
        twitterHandle: '@music_chat_app',
        facebookAppId: process.env.NUXT_PUBLIC_FACEBOOK_APP_ID || '',
        instagramHandle: '@musicchatapp',
        youtubeChannel: 'UC_MusicChatApp',
        linkedinCompany: 'music-chat-app'
      },
      
      // 功能开关
      features: {
        enableAnalytics: process.env.NODE_ENV === 'production',
        enablePwa: true,
        enableOffline: true,
        enableNotifications: true,
        enableGeolocation: false
      }
    }
  },

  // Nitro 配置 - SEO 优化的混合策略
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'], // 只预渲染SEO文件
      crawlLinks: true, // 启用链接爬取
      failOnError: false
    },
    // 混合渲染策略：静态 + SSR + ISR
    routeRules: {
      // 首页使用ISR：首次SSR，后续缓存，定期重新生成
      '/': { isr: 60 }, // 60秒缓存，SEO友好且性能好
      
      // 列表页面使用ISR，保证内容新鲜度
      '/messages': { isr: 300 }, // 5分钟缓存
      '/profile': { isr: 300 }, // 5分钟缓存
      
      // 动态页面使用SSR，确保SEO和实时性
      '/chat/**': { ssr: true }, // 聊天页面实时SSR
      '/user/**': { ssr: true }, // 用户详情页实时SSR
      
      // API路由
      '/api/**': { 
        cors: true,
        headers: { 'Cache-Control': 's-maxage=60' }
      },
      
      // SEO关键文件预渲染
      '/sitemap.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
      '/robots.txt': { prerender: true, headers: { 'Content-Type': 'text/plain' } }
    }
  },

  // Vite 配置 - 解决构建警告
  vite: {
    build: {
      rollupOptions: {
        external: (id) => {
          // 排除有问题的 Nuxt 内部模块
          if (id.includes('@nuxt/vite-builder/dist/runtime/')) {
            return true
          }
          return false
        }
      }
    },
    optimizeDeps: {
      exclude: [
        '@nuxt/vite-builder'
      ]
    }
  },

  // 实验性功能
  experimental: {
    payloadExtraction: false
  }
})