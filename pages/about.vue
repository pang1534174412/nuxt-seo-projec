<template>
  <div class="about">
    <div class="about-header">
      <h1>关于我们</h1>
      <p class="lead">了解我们的项目和Nuxt框架在SEO方面的优势</p>
    </div>

    <div class="about-content">
      <section class="section">
        <h2>项目简介</h2>
        <p>
          这个项目展示了如何使用Nuxt 3框架创建一个SEO友好的网站。Nuxt.js是一个基于Vue.js的
          通用应用框架，它结合了服务端渲染、静态网站生成和单页应用的优势。
        </p>
      </section>

      <section class="section">
        <h2>为什么选择Nuxt进行SEO</h2>
        <div class="advantages">
          <div class="advantage-item">
            <h3>🚀 服务端渲染（SSR）</h3>
            <p>Nuxt提供开箱即用的服务端渲染，确保搜索引擎能够完整抓取页面内容。</p>
          </div>
          <div class="advantage-item">
            <h3>📱 多种渲染模式</h3>
            <p>支持SSR、SPA、SSG等多种渲染模式，可根据需求灵活选择。</p>
          </div>
          <div class="advantage-item">
            <h3>🔧 自动化配置</h3>
            <p>自动处理代码分割、预加载、meta标签等SEO相关配置。</p>
          </div>
          <div class="advantage-item">
            <h3>📊 性能优化</h3>
            <p>内置性能优化功能，提升页面加载速度和用户体验。</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>技术特性</h2>
        <ul class="tech-list">
          <li>Vue 3 Composition API</li>
          <li>TypeScript 支持</li>
          <li>自动路由生成</li>
          <li>内置SEO优化</li>
          <li>PWA支持</li>
          <li>服务端渲染</li>
          <li>静态网站生成</li>
          <li>开发者工具集成</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
// SEO配置
useSeoMeta({
  title: '关于我们 - Nuxt SEO项目',
  ogTitle: '关于我们 - Nuxt SEO项目',
  description: '了解我们的Nuxt SEO项目，探索Nuxt框架在搜索引擎优化方面的强大功能和优势。',
  ogDescription: '了解我们的Nuxt SEO项目，探索Nuxt框架在搜索引擎优化方面的强大功能和优势。',
  ogImage: '/og-about.jpg',
  ogUrl: 'https://example.com/about',
  twitterCard: 'summary_large_image',
})

// 面包屑导航结构化数据
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: 'https://example.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '关于我们',
            item: 'https://example.com/about'
          }
        ]
      })
    }
  ]
})
</script>

<style scoped>
.about-header {
  text-align: center;
  padding: 2rem 0 4rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 4rem;
}

.about-header h1 {
  font-size: 3rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #2563eb;
  padding-bottom: 0.5rem;
}

.section p {
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1rem;
}

.advantages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.advantage-item {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border-left: 4px solid #2563eb;
}

.advantage-item h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.advantage-item p {
  color: #6b7280;
  margin: 0;
  font-size: 0.9rem;
}

.tech-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  list-style: none;
  padding: 0;
}

.tech-list li {
  background: #ecfdf5;
  color: #065f46;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  border-left: 3px solid #10b981;
  font-weight: 500;
}
</style>