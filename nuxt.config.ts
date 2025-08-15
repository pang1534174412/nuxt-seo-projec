// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-15',
  devtools: { enabled: false },

  // SSR配置
  ssr: true,

  // SEO配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title: '聊天应用',
      meta: [
        { name: 'description', content: '基于Nuxt 3的H5聊天应用' },
        { name: 'format-detection', content: 'telephone=no' },
        // SEO 增强
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: '聊天应用' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '聊天应用' },
        { property: 'og:description', content: '基于Nuxt 3的H5聊天应用' },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '聊天应用' },
        { name: 'twitter:description', content: '基于Nuxt 3的H5聊天应用' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com' }
      ]
    }
  },

  // CSS配置
  css: ['~/assets/css/main.css'],

  // 运行时配置
  runtimeConfig: {
    // 私有运行时配置 (仅在服务端可用)
    apiSecret: 'your-api-secret',

    // 公共运行时配置 (在客户端和服务端都可用)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
      siteName: '聊天应用',
      siteDescription: '基于Nuxt 3的H5聊天应用',
      language: 'zh-CN',
      apiBaseUrl: 'https://amtapi.267girl.com'
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

  // 实验性功能
  experimental: {
    payloadExtraction: false
  }
})