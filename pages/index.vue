<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">欢迎来到Nuxt SEO项目</h1>
      <p class="hero-description">
        这是一个基于Nuxt 3构建的SEO优化示例项目，展示了如何使用Nuxt进行搜索引擎优化。
      </p>
      <div class="hero-actions">
        <NuxtLink to="/about" class="btn btn-primary">了解更多</NuxtLink>
        <NuxtLink to="/blog" class="btn btn-secondary">查看博客</NuxtLink>
      </div>
    </section>

    <section class="features">
      <h2>核心特性</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>服务端渲染</h3>
          <p>支持SSR，确保搜索引擎能够正确抓取和索引页面内容</p>
        </div>
        <div class="feature-card">
          <h3>自动化SEO</h3>
          <p>自动生成sitemap、meta标签管理、结构化数据支持</p>
        </div>
        <div class="feature-card">
          <h3>性能优化</h3>
          <p>代码分割、预加载、图片优化等性能优化特性</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO配置
useSeoMeta({
  title: '首页 - Nuxt SEO项目',
  ogTitle: '首页 - Nuxt SEO项目',
  description: '基于Nuxt 3的SEO优化项目首页，展示Nuxt框架在搜索引擎优化方面的强大能力。',
  ogDescription: '基于Nuxt 3的SEO优化项目首页，展示Nuxt框架在搜索引擎优化方面的强大能力。',
  ogImage: '/og-image.jpg',
  ogUrl: 'https://example.com/',
  twitterCard: 'summary_large_image',
})

// 结构化数据
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nuxt SEO项目',
        description: '基于Nuxt 3的SEO优化项目',
        url: 'https://example.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://example.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})
</script>

<style scoped>
.home {
  padding: 0;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin: -2rem -2rem 4rem -2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

.features {
  padding: 4rem 0;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #1f2937;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #2563eb;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}
</style>