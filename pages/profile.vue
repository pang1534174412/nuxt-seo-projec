<template>
  <div class="profile-page">
    <header class="profile-header">
      <div class="user-avatar">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=me" 
          alt="我的头像 - 音乐聊天用户" 
          class="avatar avatar-lg" 
          loading="lazy"
          :width="80"
          :height="80"
        />
        <div class="online-indicator"></div>
      </div>
      <h2 class="user-name">我的昵称</h2>
      <p class="user-status">在线</p>
    </header>

    <div class="menu-section">
      <div class="menu-group">
        <NuxtLink to="/profile/edit" class="menu-item">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="menu-text">编辑资料</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="menu-arrow">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </NuxtLink>
      </div>

      <div class="menu-group">
        <NuxtLink to="/follows" class="menu-item">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="menu-text">关注列表</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="menu-arrow">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </NuxtLink>

        <NuxtLink to="/blocked" class="menu-item">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M4.93 4.93L19.07 19.07" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="menu-text">拉黑列表</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="menu-arrow">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </NuxtLink>
      </div>

      <div class="menu-group">
        <NuxtLink to="/feedback" class="menu-item">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="menu-text">意见反馈</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="menu-arrow">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </NuxtLink>

        <NuxtLink to="/about" class="menu-item">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 16V12" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8H12.01" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="menu-text">关于我们</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="menu-arrow">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </NuxtLink>
      </div>

      <div class="menu-group">
        <button class="menu-item logout-btn" @click="logout">
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2"/>
              <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2"/>
              <path d="M21 12H9" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="menu-text">退出登录</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 高级SEO配置
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

// 详细SEO配置
useSeoMeta({
  title: `个人中心 - 资料设置与管理 | ${runtimeConfig.public.siteName}`,
  description: '管理您的音乐聊天账户。编辑个人资料、查看关注列表、管理拉黑名单、意见反馈、账户设置等功能。',
  keywords: '个人中心,账户设置,编辑资料,关注管理,拉黑名单,音乐聊天设置',
  
  // OpenGraph优化
  ogTitle: '个人中心 - 账户管理',
  ogDescription: '管理您的音乐聊天账户，编辑个人资料，设置应用偏好。',
  ogImage: `${runtimeConfig.public.siteUrl}/og-profile.jpg`,
  ogImageAlt: '个人中心页面截图',
  ogType: 'website',
  ogUrl: `${runtimeConfig.public.siteUrl}/profile`,
  
  // Twitter Card
  twitterCard: 'summary',
  twitterTitle: '个人中心 - 账户管理',
  twitterDescription: '管理您的音乐聊天账户，编辑资料和设置',
  
  // 搜索引擎优化
  robots: 'noindex, nofollow', // 个人中心页面不应被索引
  author: '当前用户',
  
  // 内容分类
  articleTag: ['个人设置', '账户管理', '用户中心']
})

// 结构化数据 - 个人中心页面
useSchemaOrg([
  defineWebPage({
    '@type': 'ProfilePage',
    name: '个人中心',
    description: '用户账户管理和设置页面',
    url: `${runtimeConfig.public.siteUrl}/profile`,
    mainEntity: {
      '@type': 'Person',
      name: '当前用户',
      additionalType: 'RegisteredUser'
    },
    about: {
      '@type': 'SoftwareApplication',
      name: runtimeConfig.public.siteName,
      description: '音乐聊天应用'
    },
    potentialAction: [
      {
        '@type': 'EditAction',
        name: '编辑资料',
        target: `${runtimeConfig.public.siteUrl}/profile/edit`
      },
      {
        '@type': 'ViewAction',
        name: '查看关注',
        target: `${runtimeConfig.public.siteUrl}/follows`
      }
    ]
  })
])

// 退出登录
const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    // 这里处理登出逻辑
    console.log('退出登录')
  }
}
</script>

<style scoped>
.profile-page {
  background: #f5f5f5;
  min-height: 100vh;
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem 1rem;
  position: relative;
}

.user-avatar {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.online-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: #00d26b;
  border: 3px solid white;
  border-radius: 50%;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.user-status {
  font-size: 1rem;
  opacity: 0.9;
}

.menu-section {
  padding: 1rem;
}

.menu-group {
  background: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: #1a1a1a;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: #f5f5f5;
}

.menu-icon {
  margin-right: 12px;
  color: #667eea;
}

.menu-text {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
}

.menu-arrow {
  color: #ccc;
}

.logout-btn {
  color: #ff4757;
}

.logout-btn .menu-icon {
  color: #ff4757;
}
</style>