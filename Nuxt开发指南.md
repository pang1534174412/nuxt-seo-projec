# Nuxt.js 开发指南

## 目录

1. [简介](#简介)
2. [安装与创建项目](#安装与创建项目)
3. [项目结构](#项目结构)
4. [核心概念](#核心概念)
5. [开发工作流](#开发工作流)
6. [配置](#配置)
7. [模块系统](#模块系统)
8. [测试](#测试)
9. [部署](#部署)
10. [常用命令](#常用命令)
11. [最佳实践](#最佳实践)

## 简介

Nuxt.js 是一个基于 Vue.js 的免费、开源、直观的全栈 Web 应用框架，专为构建类型安全、高性能的生产级应用和网站而设计。Nuxt 提供了服务端渲染(SSR)、静态站点生成(SSG)和客户端渲染(SPA)等多种渲染模式。

### 主要特性

- **Vue.js 3** - 基于最新的 Vue.js 版本
- **TypeScript 支持** - 内置完整的 TypeScript 支持
- **服务端渲染** - 支持 SSR、SSG 和 SPA 模式
- **自动路由** - 基于文件系统的路由生成
- **组件自动导入** - 自动导入组件、组合式函数等
- **模块生态** - 丰富的官方和社区模块
- **开发体验** - 热模块替换、错误处理、开发工具

## 安装与创建项目

### 创建新项目

使用以下命令创建新的 Nuxt 项目：

```bash
# npm
npm create nuxt@latest <project-name>

# yarn
yarn create nuxt@latest <project-name>

# pnpm
pnpm create nuxt@latest <project-name>

# bun
bun create nuxt@latest <project-name>

# deno
deno -A npm:create-nuxt@latest <project-name>
```

### 进入项目目录

```bash
cd <project-name>
```

### 在 VS Code 中打开项目

```bash
code <project-name>
```

### 启动开发服务器

```bash
# npm
npm run dev -- -o

# yarn
yarn dev --open

# pnpm
pnpm dev -o

# bun
bun run dev -o

# deno
deno run dev -o
```

## 项目结构

### 标准目录结构

```
├─ components/          # Vue 组件
│  ├─ AppHeader.vue
│  └─ AppFooter.vue
├─ pages/              # 页面和路由
├─ layouts/            # 布局模板
├─ middleware/         # 中间件
├─ plugins/            # 插件
├─ composables/        # 组合式函数
├─ utils/              # 工具函数
├─ server/             # 服务端 API 和中间件
│  ├─ api/             # API 路由
│  ├─ routes/          # 服务器路由
│  └─ middleware/      # 服务器中间件
├─ public/             # 静态资源
├─ assets/             # 需要处理的资源
├─ content/            # 内容文件 (Markdown/JSON/YAML/CSV)
├─ .nuxt/              # 自动生成的构建目录
├─ .output/            # 构建输出目录
├─ nuxt.config.ts      # Nuxt 配置文件
└─ package.json
```

### 组件目录

```bash
-| components/
---| AppHeader.vue
---| AppFooter.vue
---| SomeFolder/
-----| MyComponent.vue
```

组件会自动导入并可以在任何地方使用。

#### 服务端组件

```bash
-| components/
---| HighlightedMarkdown.server.vue
```

带有 `.server` 后缀的组件只在服务端渲染。

#### 客户端/服务端配对组件

```bash
-| components/
---| Comments.client.vue
---| Comments.server.vue
```

## 核心概念

### 页面和路由

Nuxt 使用基于文件的路由系统。在 `pages/` 目录中创建的 `.vue` 文件会自动成为路由。

#### 定义页面元数据

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

### 布局

布局定义页面的通用结构，放置在 `layouts/` 目录中。

### 组合式函数 (Composables)

Nuxt 提供了许多内置的组合式函数：

#### useCookie

```typescript
const cookie = useCookie(name, options)
```

#### useError

```vue
<script setup lang="ts">
const error = useError()

if (error.value) {
  console.error('Nuxt error:', error.value)
}
</script>
```

#### useNuxtApp

```typescript
export function useStandType() {
  // 在客户端总是有效
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

#### useRuntimeHook

```vue
<script setup lang="ts">
// 注册一个钩子，每次预取链接时运行，但会在组件卸载时自动清理
useRuntimeHook('link:prefetch', (link) => {
  console.log('Prefetching', link)
})
</script>
```

#### useLoadingIndicator

```vue
<script setup lang="ts">
  const { start, set } = useLoadingIndicator()
  // 等同于 set(0, { force: true })
  // 设置进度为 0，并立即显示加载指示器
  start({ force: true })
</script>
```

#### useRouteAnnouncer

```vue
<script setup lang="ts">
  const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
    politeness: 'assertive'
  })
</script>
```

### 服务端 API

#### API 路由

在 `server/api/` 目录中创建 API 端点：

```typescript
export default defineEventHandler(() => 'Hello World!')
```

#### 服务器中间件

```typescript
// 记录每个请求
export default defineEventHandler((event) => {
  console.log('New request: ' + getRequestURL(event))
})

// 添加认证上下文
export default defineEventHandler((event) => {
  event.context.auth = { user: 123 }
})
```

#### Nitro 插件

```typescript
export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin', nitroApp)
})
```

### 内置组件

#### NuxtImg

首先安装 Nuxt Image 模块：

```bash
npx nuxt module add image
```

#### NuxtPicture

同样需要安装 Nuxt Image 模块：

```bash
npx nuxt module add image
```

#### NuxtTime

自定义日期时间格式化：

```vue
<template>
  <NuxtTime 
    :datetime="Date.now()"
    weekday="long"
    year="numeric"
    month="short"
    day="numeric"
    hour="numeric"
    minute="numeric"
    second="numeric"
    timeZoneName="short"
  />
</template>
```

## 开发工作流

### 开发服务器

```bash
# 启动开发服务器
nuxt dev

# 自定义端口和主机
nuxt dev --port 4000 --host 0.0.0.0

# 启用 HTTPS
nuxt dev --https

# 显示二维码
nuxt dev --qr
```

### 构建和预览

```bash
# 构建生产版本
nuxt build

# 预览生产构建
nuxt preview

# 生成静态站点
nuxt generate
```

### 准备开发环境

```bash
# 生成类型定义和 .nuxt 目录
nuxt prepare
```

## 配置

### nuxt.config.ts

```typescript
export default defineNuxtConfig({
  // 基本配置
  ssr: true,
  srcDir: 'app/',
  
  // 运行时配置
  runtimeConfig: {
    apiKey: '', // 私有配置，只在服务端可用
    public: {
      baseURL: '' // 公共配置，客户端也可用
    }
  },
  
  // TypeScript 配置
  typescript: {
    strict: true,
    typeCheck: true
  },
  
  // CSS 配置
  css: ['~/assets/css/main.css'],
  
  // Vite 配置
  vite: {
    build: {
      assetsDir: '_nuxt/'
    }
  },
  
  // 实验性功能
  experimental: {
    componentIslands: true
  }
})
```

### 环境变量

创建 `.env` 文件：

```ini
MY_ENV_VARIABLE=hello
```

在生产预览中使用：

```bash
npx nuxt preview
```

### CSS 预处理器

安装 CSS 预处理器：

```bash
# Sass
npm install -D sass

# Less
npm install -D less

# Stylus
npm install -D stylus
```

### 安装 CSS 库

```bash
# 以 animate.css 为例
npm install animate.css
```

## 模块系统

### 安装官方模块

```bash
# ESLint
npx nuxt module add eslint

# Content
npx nuxt module add content

# Image
npx nuxt module add image

# Auth Utils
npx nuxt module add auth-utils
```

### 创建自定义模块

```bash
# 创建模块项目
npm create nuxt -- -t module my-module
```

### 定义模块

```typescript
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  defaults: {
    enabled: true
  },
  setup (options) {
    if (options.enabled) {
      console.log('My Nuxt module is enabled!')
    }
  }
})
```

### 模块功能

#### 安装依赖模块

```typescript
import { defineNuxtModule, installModule } from '@nuxt/kit'

export default defineNuxtModule({
  async setup () {
    await installModule('@nuxtjs/fontaine', {
      fonts: [
        {
          family: 'Roboto',
          fallbacks: ['Impact'],
          fallbackName: 'fallback-a',
        }
      ]
    })
  }
})
```

#### 添加模板

```typescript
import { addTemplate, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

export default defineNuxtModule({
  setup(options, nuxt) {
    const globalMeta = defu(nuxt.options.app.head, {
      charset: options.charset,
      viewport: options.viewport
    })

    addTemplate({
      filename: 'meta.config.mjs',
      getContents: () => 'export default ' + JSON.stringify({ globalMeta, mixinKey: 'setup' })
    })
  }
})
```

#### 添加插件模板

```typescript
import { addPluginTemplate, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup (options) {
    addPluginTemplate({
      filename: 'module-plugin.mjs',
      getContents: () => `import { defineNuxtPlugin } from '#app/nuxt'
export default defineNuxtPlugin({
  name: 'module-plugin',
  setup (nuxtApp) {
    ${options.log ? 'console.log("Plugin install")' : ''}
  }
})`,
    })
  },
})
```

#### 添加服务器处理程序

```typescript
import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addServerHandler({
      route: '/api/hello/:name',
      handler: resolver.resolve('./runtime/server/api/hello/[name].get')
    })
  }
})
```

#### 添加组合式函数目录

```typescript
import { defineNuxtModule, addImportsDir, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addImportsDir(resolver.resolve('runtime/composables'))
  }
})
```

#### 暴露公共资源

```javascript
import { defineNuxtModule, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: resolver.resolve('./runtime/public'),
        maxAge: 60 * 60 * 24 * 365 // 1 年
      })
    })
  }
})
```

#### 安装其他模块

```typescript
import { defineNuxtModule, createResolver, installModule } from '@nuxt/kit'

export default defineNuxtModule<ModuleOptions>({
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // 注入包含 Tailwind 指令的 CSS 文件
    nuxt.options.css.push(resolver.resolve('./runtime/assets/styles.css'))

    await installModule('@nuxtjs/tailwindcss', {
      // 模块配置
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolver.resolve('./runtime/*.{mjs,js,ts}')
          ]
        }
      }
    })
  }
})
```

### 模块构建

```bash
# 构建模块
npx nuxi module-builder build
```

### 模块开发

```bash
# 开发模式
npm run dev

# 构建
npm run dev:build
```

## 测试

### 安装测试依赖

#### 基础测试工具

```bash
# npm
npm i --save-dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core

# yarn
yarn add --dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core

# pnpm
pnpm add -D @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core

# bun
bun add --dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core
```

#### Vue 单元测试

```bash
# npm
npm i --save-dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue

# yarn
yarn add --dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue

# pnpm
pnpm add -D vitest @vue/test-utils happy-dom @vitejs/plugin-vue

# bun
bun add --dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue
```

#### Playwright 测试

```bash
# npm
npm i --save-dev @playwright/test @nuxt/test-utils

# yarn
yarn add --dev @playwright/test @nuxt/test-utils

# pnpm
pnpm add -D @playwright/test @nuxt/test-utils

# bun
bun add --dev @playwright/test @nuxt/test-utils
```

### 端到端测试

#### 基本设置

```typescript
import { describe, test } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('My test', async () => {
  await setup({
    // 测试上下文选项
  })

  test('my test', () => {
    // ...
  })
})
```

#### 测试示例

```javascript
import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  // 在测试文件中使用此 fixture 设置 Nuxt
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/ssr', import.meta.url)),
  })

  it('renders the index page', async () => {
    // 使用 `@nuxt/test-utils` 的工具与 fixture 交互
    const html = await $fetch('/')

    // 执行与此 fixture 相关的检查
    expect(html).toContain('<div>ssr</div>')
  })
})
```

#### 组件测试

```typescript
import { it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { SomeComponent } from '#components'

it('can mount some component', async () => {
    const component = await mountSuspended(SomeComponent)
    expect(component.text()).toMatchInlineSnapshot(
        '"This is an auto-imported component"'
    )
})
```

#### 目标主机测试

```typescript
import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('login page', async () => {
  await setup({
    host: 'http://localhost:8787',
  })

  it('displays the email and password fields', async () => {
    const page = await createPage('/login')
    expect(await page.getByTestId('email').isVisible()).toBe(true)
    expect(await page.getByTestId('password').isVisible()).toBe(true)
  })
})
```

### 测试 Fixture 配置

```typescript
import MyModule from '../../../src/module'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    MyModule
  ]
})
```

## 部署

### Node.js 服务器

```bash
# 构建应用
nuxt build

# 启动生产服务器
node .output/server/index.mjs
```

### 静态部署

```bash
# 生成静态站点
npx nuxt generate
```

输出文件在 `.output/public` 目录中，可以部署到任何静态托管服务。

## 常用命令

### 开发命令

```bash
# 开发服务器
nuxt dev [ROOTDIR] [选项]

# 构建应用
nuxt build [ROOTDIR] [选项]

# 预览构建
nuxt preview [ROOTDIR] [选项]

# 生成静态站点
nuxt generate [ROOTDIR] [选项]

# 准备环境
nuxt prepare [ROOTDIR] [选项]

# 升级 Nuxt
nuxt upgrade
```

### 常用选项

```bash
# 指定端口
--port 4000

# 指定主机
--host 0.0.0.0

# 启用 HTTPS
--https

# 自动打开浏览器
--open

# 显示二维码
--qr

# 详细日志
--logLevel verbose

# 指定环境文件
--dotenv .env.production
```

## 升级和迁移

### 升级到最新版本

```bash
# npm
npx nuxt upgrade

# yarn
yarn nuxt upgrade

# pnpm
pnpm nuxt upgrade

# bun
bun x nuxt upgrade
```

### 安装 Nuxt 4

```bash
npm install nuxt@^4.0.0
yarn add nuxt@^4.0.0
pnpm add nuxt@^4.0.0
bun add nuxt@^4.0.0
```

### 自动化迁移

#### 运行所有 Nuxt 4 迁移

```bash
npx codemod@latest nuxt/4/migration-recipe
yarn dlx codemod@latest nuxt/4/migration-recipe
pnpm dlx codemod@latest nuxt/4/migration-recipe
bun x codemod@latest nuxt/4/migration-recipe
```

#### 文件结构迁移

```bash
npx codemod@latest nuxt/4/file-structure
```

#### 模板编译变更

```bash
npx codemod@latest nuxt/4/template-compilation-changes
```

### Bridge 模式 (Nuxt 2 到 Nuxt 3)

#### 安装 Bridge

```bash
npm install -D @nuxt/bridge nuxi
yarn add --dev @nuxt/bridge nuxi
pnpm add -D @nuxt/bridge nuxi
bun add -D @nuxt/bridge nuxi
```

#### 更新脚本

```diff
{
  "scripts": {
-   "dev": "nuxt",
+   "dev": "nuxt2",
-   "build": "nuxt build",
+   "build": "nuxt2 build",
-   "start": "nuxt start",
+   "start": "nuxt2 start"
  }
}
```

#### 服务器目标构建脚本

```json
{
  "scripts": {
    "build": "nuxi build",
    "start": "nuxi preview"
  }
}
```

## 最佳实践

### 代码风格

#### 安装 ESLint

```bash
npx nuxt module add eslint
```

#### 传统 head 配置

```typescript
export default defineNuxtConfig({
  unhead: {
    legacy: true,
  }
})
```

### 性能优化

#### 组件懒加载

使用 `.lazy` 前缀异步加载组件。

#### 代码分割

Nuxt 会自动进行代码分割以优化性能。

### TypeScript 配置

```typescript
export default defineNuxtConfig({
  typescript: {
    // 自定义应用/服务端 TypeScript 配置
    tsConfig: {
      compilerOptions: {
        strict: true
      }
    },
    // 自定义构建时 TypeScript 配置  
    nodeTsConfig: {
      compilerOptions: {
        strict: true
      }
    }
  }
})
```

### 状态管理

#### 安装 Pinia

```bash
yarn add pinia @pinia/nuxt
```

### 插件安装

#### 安装 Vue 插件依赖

```bash
npm install --save-dev vue-gtag-next
yarn add --dev vue-gtag-next
pnpm add -D vue-gtag-next
bun add -D vue-gtag-next
```

### 开发工具

#### 包管理器配置

启用 Corepack：

```bash
corepack enable
```

#### package.json 中指定包管理器

```json
{
  "packageManager": "pnpm@7.5.0"
}
```

### 贡献指南

#### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```text
fix: typo
docs: fix typo
feat(kit): add 'addMagicStuff' utility
```

#### 文档写作建议

- 使用主动语态
- 避免主观性语言
- 提供清晰的示例和链接

### SPA 加载模板

```html
<div class="loader"></div>
<style>
.loader {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border: solid 2px transparent;
  border-top-color: #000;
  border-left-color: #000;
  border-bottom-color: #efefef;
  border-right-color: #efefef;
  border-radius: 50%;
  animation: loader 400ms linear infinite;
}

@keyframes loader {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>
```

## 层 (Layers)

### 创建层

```bash
npm create nuxt -- --template layer nuxt-layer
```

### 扩展层

```typescript
export default defineNuxtConfig({
  extends: ['./my-layer']
})
```

### Git 远程层

```typescript
export default defineNuxtConfig({
  extends: [['github:username/repoName', { install: true }]]
})
```

## 框架贡献

### 开发环境设置

```bash
# 启用 Corepack
corepack enable

# 安装依赖
pnpm install --frozen-lockfile

# 准备开发环境
pnpm dev:prepare

# 创建新分支
git checkout -b my-new-branch

# 开发
pnpm dev

# 测试
pnpm test

# 代码检查
pnpm lint

# 修复代码风格
pnpm lint --fix
```

### 提交规范

```bash
docs: update the section about the nuxt.config.ts file
```

---

这是一个全面的 Nuxt.js 开发指南，涵盖了从基础安装到高级模块开发的各个方面。根据项目需求，您可以选择相应的章节进行深入学习和实践。