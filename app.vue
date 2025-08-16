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

// 全局head配置（只保留动态部分和必要补充）
useHead({
  htmlAttrs: {
    lang: 'zh-CN',
    prefix: 'og: https://ogp.me/ns#'
  },
  meta: [
    // 只保留动态或补充的meta标签，避免与nuxt.config.ts重复
  ],
  link: [
    // 动态 Canonical URL
    { rel: 'canonical', href: `${runtimeConfig.public.siteUrl}${currentPath.value}` },
    
    // 多语言支持（动态）
    { rel: 'alternate', hreflang: 'zh-CN', href: `${runtimeConfig.public.siteUrl}${currentPath.value}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${runtimeConfig.public.siteUrl}${currentPath.value}` }
  ]
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