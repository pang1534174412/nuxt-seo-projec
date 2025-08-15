<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// 全局SEO配置
const runtimeConfig = useRuntimeConfig()

// 全局head配置
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Nuxt SEO项目' },
    { property: 'og:site_name', content: runtimeConfig.public.siteName },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'zh_CN' },
    { name: 'twitter:site', content: '@nuxt_seo' },
    { name: 'twitter:creator', content: '@nuxt_seo' }
  ],
  link: [
    { rel: 'canonical', href: runtimeConfig.public.siteUrl },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: runtimeConfig.public.siteName,
        description: runtimeConfig.public.siteDescription,
        url: runtimeConfig.public.siteUrl,
        logo: `${runtimeConfig.public.siteUrl}/logo.png`,
        sameAs: [
          'https://github.com/your-github',
          'https://twitter.com/your-twitter'
        ]
      })
    }
  ]
})
</script>