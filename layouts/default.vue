<template>
  <div>
    <Html lang="zh-CN">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </Html>
    
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/" class="logo">
          {{ $config.public.siteName }}
        </NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/">首页</NuxtLink>
          <NuxtLink to="/about">关于</NuxtLink>
          <NuxtLink to="/blog">博客</NuxtLink>
        </div>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} {{ $config.public.siteName }}. 所有权利保留。</p>
    </footer>
  </div>
</template>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #374151;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #2563eb;
}

.main {
  min-height: calc(100vh - 120px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.footer {
  background: #f3f4f6;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}
</style>