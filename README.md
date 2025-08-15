# Nuxt SEO 项目

基于 Nuxt 3 构建的 SEO 优化示例项目，展示了如何使用 Nuxt 进行搜索引擎优化。

## 🚀 特性

- ✅ **服务端渲染 (SSR)** - 确保搜索引擎能够正确抓取页面内容
- ✅ **自动化 SEO** - 内置 meta 标签管理、sitemap 生成
- ✅ **多种渲染模式** - 支持 SSR、SPA、SSG
- ✅ **性能优化** - 代码分割、预加载、图片优化
- ✅ **结构化数据** - JSON-LD 支持
- ✅ **响应式设计** - 移动端友好
- ✅ **TypeScript 支持** - 类型安全

## 📦 安装依赖

```bash
npm install
```

## 🛠️ 开发

启动开发服务器：

```bash
npm run dev
```

项目将在 http://localhost:3000 启动

## 🏗️ 构建

构建生产版本：

```bash
npm run build
```

## 📄 静态生成

生成静态网站：

```bash
npm run generate
```

## 🔧 SEO 配置

### 全局 SEO 设置

在 `nuxt.config.ts` 中配置全局 SEO 设置：

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      title: '网站标题',
      meta: [
        { name: 'description', content: '网站描述' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://your-domain.com',
      siteName: '网站名称'
    }
  }
})
```

### 页面级 SEO

在每个页面使用 `useSeoMeta` 和 `useJsonld`：

```vue
<script setup>
useSeoMeta({
  title: '页面标题',
  description: '页面描述',
  ogTitle: '页面标题',
  ogDescription: '页面描述',
  ogImage: '/og-image.jpg'
})

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '页面名称'
})
</script>
```

## 📁 项目结构

```
├── assets/          # 静态资源
├── components/      # Vue 组件
├── layouts/         # 布局文件
├── pages/           # 页面文件（自动生成路由）
├── public/          # 公共文件
├── app.vue          # 根组件
├── nuxt.config.ts   # Nuxt 配置
└── package.json     # 项目配置
```

## 🎯 SEO 最佳实践

1. **使用语义化 HTML** - 正确使用 h1-h6、main、article 等标签
2. **优化图片** - 添加 alt 属性，使用适当的图片格式
3. **内部链接** - 创建良好的内部链接结构
4. **页面加载速度** - 利用 Nuxt 的性能优化功能
5. **移动端优化** - 确保网站在移动设备上正常显示
6. **结构化数据** - 使用 JSON-LD 添加结构化数据

## 📊 性能监控

可以使用以下工具监控网站性能：

- Google PageSpeed Insights
- Google Search Console
- Lighthouse
- GTmetrix

## 🔗 相关链接

- [Nuxt 3 文档](https://nuxt.com/)
- [Nuxt SEO 模块](https://nuxtseo.com/)
- [Vue.js 文档](https://vuejs.org/)

## 📝 许可证

MIT License