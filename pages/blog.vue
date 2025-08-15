<template>
  <div class="blog">
    <div class="blog-header">
      <h1>博客文章</h1>
      <p class="lead">分享关于Nuxt、SEO和Web开发的最新资讯</p>
    </div>

    <div class="blog-content">
      <article class="article-card" v-for="article in articles" :key="article.id">
        <div class="article-meta">
          <time :datetime="article.date" class="article-date">
            {{ formatDate(article.date) }}
          </time>
          <span class="article-category">{{ article.category }}</span>
        </div>
        <h2 class="article-title">
          <NuxtLink :to="`/blog/${article.slug}`">{{ article.title }}</NuxtLink>
        </h2>
        <p class="article-excerpt">{{ article.excerpt }}</p>
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <NuxtLink :to="`/blog/${article.slug}`" class="read-more">
          阅读全文 →
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script setup>
// SEO配置
useSeoMeta({
  title: '博客文章 - Nuxt SEO项目',
  ogTitle: '博客文章 - Nuxt SEO项目',
  description: '浏览我们的博客文章，了解Nuxt、SEO优化、Web开发的最新技术和最佳实践。',
  ogDescription: '浏览我们的博客文章，了解Nuxt、SEO优化、Web开发的最新技术和最佳实践。',
  ogImage: '/og-blog.jpg',
  ogUrl: 'https://example.com/blog',
  twitterCard: 'summary_large_image',
})

// 示例文章数据（实际项目中应该从API或内容管理系统获取）
const articles = ref([
  {
    id: 1,
    title: 'Nuxt 3 SEO最佳实践指南',
    slug: 'nuxt3-seo-best-practices',
    excerpt: '学习如何在Nuxt 3中实现最佳的SEO优化，包括meta标签管理、结构化数据和性能优化。',
    date: '2024-01-15',
    category: 'SEO',
    tags: ['Nuxt', 'SEO', 'Vue.js']
  },
  {
    id: 2,
    title: '服务端渲染 vs 静态生成：选择指南',
    slug: 'ssr-vs-ssg-guide',
    excerpt: '深入了解SSR和SSG的区别，以及在什么情况下选择哪种渲染模式最适合你的项目。',
    date: '2024-01-10',
    category: '技术',
    tags: ['SSR', 'SSG', 'Nuxt']
  },
  {
    id: 3,
    title: '使用Nuxt创建高性能网站',
    slug: 'high-performance-nuxt-sites',
    excerpt: '探索Nuxt的性能优化功能，包括代码分割、预加载、图片优化等技术。',
    date: '2024-01-05',
    category: '性能',
    tags: ['性能优化', 'Nuxt', 'Web开发']
  }
])

// 日期格式化函数
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}

// 博客列表结构化数据
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Nuxt SEO项目博客',
        description: '关于Nuxt、SEO和Web开发的技术博客',
        url: 'https://example.com/blog',
        blogPost: articles.value.map(article => ({
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          url: `https://example.com/blog/${article.slug}`,
          author: {
            '@type': 'Organization',
            name: 'Nuxt SEO项目'
          }
        }))
      })
    }
  ]
})
</script>

<style scoped>
.blog-header {
  text-align: center;
  padding: 2rem 0 4rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 4rem;
}

.blog-header h1 {
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

.blog-content {
  max-width: 800px;
  margin: 0 auto;
}

.article-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.article-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.article-category {
  background: #2563eb;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.article-title {
  margin-bottom: 1rem;
}

.article-title a {
  color: #1f2937;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  transition: color 0.2s;
}

.article-title a:hover {
  color: #2563eb;
}

.article-excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.read-more {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.read-more:hover {
  color: #1d4ed8;
}
</style>