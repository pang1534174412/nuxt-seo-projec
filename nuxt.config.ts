// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-15',
  devtools: { enabled: true },
  
  // SSR配置
  ssr: true,
  
  // SEO配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt SEO项目',
      meta: [
        { name: 'description', content: '基于Nuxt 3的SEO优化项目' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // 模块配置
  modules: [
    // '@nuxtjs/seo' - 暂时移除，使用内置SEO功能
  ],

  // SEO基础配置（使用内置功能）
  // seo: {
  //   redirectToCanonicalSiteUrl: true
  // },

  // 渲染模式配置（针对SEO优化）
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false
    }
  },

  // Vite配置
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  },

  // CSS配置
  css: ['~/assets/css/main.css'],

  // 运行时配置
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
      siteName: 'Nuxt SEO项目',
      siteDescription: '基于Nuxt 3的SEO优化项目',
      language: 'zh-CN'
    }
  }
})