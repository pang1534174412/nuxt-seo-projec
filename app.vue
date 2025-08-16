<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// 全局SEO配置
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

// 动态计算当前页面信息
const currentPath = computed(() => route.path)
const isHomePage = computed(() => currentPath.value === '/')
const isChatPage = computed(() => currentPath.value.startsWith('/chat/'))
const isUserPage = computed(() => currentPath.value.startsWith('/user/'))

// 全局head配置
useHead({
  htmlAttrs: {
    lang: 'zh-CN',
    prefix: 'og: https://ogp.me/ns#'
  },
  meta: [
    // 基本搜索引擎优化
    { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    { name: 'author', content: runtimeConfig.public.siteName },
    { name: 'generator', content: 'Nuxt.js' },
    { name: 'referrer', content: 'origin-when-cross-origin' },
    
    // OpenGraph全局配置
    { property: 'og:site_name', content: runtimeConfig.public.siteName },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'zh_CN' },
    { property: 'og:locale:alternate', content: 'en_US' },
    
    // Twitter Card全局配置
    { name: 'twitter:site', content: '@music_chat_app' },
    { name: 'twitter:creator', content: '@music_chat_app' },
    { name: 'twitter:domain', content: runtimeConfig.public.siteUrl.replace('https://', '') },
    
    // 移动端优化
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: runtimeConfig.public.siteName },
    
    // Microsoft Tiles
    { name: 'msapplication-TileColor', content: '#667eea' },
    { name: 'msapplication-config', content: '/browserconfig.xml' },
    
    // 主题色彩
    { name: 'theme-color', content: '#667eea' },
    { name: 'msapplication-navbutton-color', content: '#667eea' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#667eea' },
    
    // 应用信息
    { name: 'application-name', content: runtimeConfig.public.siteName },
    { name: 'apple-mobile-web-app-title', content: runtimeConfig.public.siteName },
    
    // 内容分类
    { name: 'category', content: '音乐,聊天,社交' },
    { name: 'coverage', content: 'Worldwide' },
    { name: 'distribution', content: 'Global' },
    { name: 'rating', content: 'General' },
    
    // 版权信息
    { name: 'copyright', content: `© ${new Date().getFullYear()} ${runtimeConfig.public.siteName}` },
    { name: 'owner', content: runtimeConfig.public.siteName },
    
    // 搜索引擎特定配置
    { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    { name: 'bingbot', content: 'index, follow' },
    { name: 'slurp', content: 'index, follow' },
    
    // 地理位置
    { name: 'geo.region', content: 'CN' },
    { name: 'geo.country', content: 'China' },
    { name: 'geo.placename', content: '中国' },
    
    // 语言相关
    { 'http-equiv': 'content-language', content: 'zh-CN' }
  ],
  link: [
    // Canonical URL
    { rel: 'canonical', href: `${runtimeConfig.public.siteUrl}${currentPath.value}` },
    
    // 多语言支持
    { rel: 'alternate', hreflang: 'zh-CN', href: `${runtimeConfig.public.siteUrl}${currentPath.value}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${runtimeConfig.public.siteUrl}${currentPath.value}` },
    
    // Favicon和图标
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
    
    // PWA相关
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#667eea' },
    
    // DNS预取
    { rel: 'dns-prefetch', href: '//api.dicebear.com' },
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    
    // 预连接
    { rel: 'preconnect', href: 'https://api.dicebear.com', crossorigin: '' },
    
    // RSS/Atom订阅
    { rel: 'alternate', type: 'application/rss+xml', title: `${runtimeConfig.public.siteName} RSS`, href: '/feed.xml' },
    
    // 搜索引擎发现
    { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
  ],
  script: []
})

// 全局结构化数据 - 使用 useSchemaOrg 替代 useJsonld
useSchemaOrg([
  defineWebSite({
    '@id': `${runtimeConfig.public.siteUrl}/#website`,
    name: runtimeConfig.public.siteName,
    alternateName: ['音乐聊天', 'Music Chat', '音乐社交应用'],
    description: runtimeConfig.public.siteDescription,
    url: runtimeConfig.public.siteUrl,
    inLanguage: 'zh-CN',
    
    // 站内搜索功能
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${runtimeConfig.public.siteUrl}/?search={search_term_string}`
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueName: 'search_term_string',
        valueRequired: true
      }
    }
  })
])

// 应用程序结构化数据
useSchemaOrg([
  defineOrganization({
    '@id': `${runtimeConfig.public.siteUrl}/#mobileapp`,
    name: runtimeConfig.public.siteName,
    '@type': 'SoftwareApplication',
    applicationCategory: 'SocialNetworkingApplication',
    applicationSubCategory: 'Music Chat Application',
    description: runtimeConfig.public.siteDescription,
    url: runtimeConfig.public.siteUrl,
    operatingSystem: ['Web Browser', 'iOS Safari', 'Android Chrome'],
    
    // 功能特性
    featureList: [
      '实时聊天',
      '音乐分享',
      '用户发现',
      '图片消息',
      '表情支持',
      '在线状态',
      '消息推送'
    ],
    
    // 评级信息
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    },
    
    // 使用统计
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/UseAction',
      userInteractionCount: '50000+'
    },
    
    // 支持语言
    availableLanguage: ['zh-CN', 'en-US'],
    
    // 版本信息
    softwareVersion: '2.1.0',
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0]
  })
])

// FAQ结构化数据
useSchemaOrg([
  defineWebPage({
    '@id': `${runtimeConfig.public.siteUrl}/#faq`,
    '@type': 'FAQPage',
    name: '常见问题',
    mainEntity: [
      {
        '@type': 'Question',
        name: '如何开始与其他用户聊天？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '在用户列表中点击任意用户，然后点击"聊天"按钮即可开始1v1对话。'
        }
      },
      {
        '@type': 'Question',
        name: '是否支持发送图片和表情？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '是的，我们支持文字、图片和丰富的表情消息类型。'
        }
      },
      {
        '@type': 'Question',
        name: '如何知道其他用户是否在线？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '在线用户的头像旁会显示绿色小点，表示他们当前在线可以聊天。'
        }
      },
      {
        '@type': 'Question',
        name: '能否查看其他用户的详细资料？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '可以的，点击用户头像即可查看他们的详细资料、相册和动态。'
        }
      }
    ]
  })
])
</script>