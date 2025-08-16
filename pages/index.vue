<template>
  <div class="users-page">
    <header class="page-header">
      <h1 class="page-title">用户</h1>
      <button v-if="!pending" class="refresh-btn" @click="refresh()" :disabled="refreshing">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" :class="{ spinning: refreshing }">
          <path d="M1 4V10H7" stroke="currentColor" stroke-width="2"/>
          <path d="M23 20V14H17" stroke="currentColor" stroke-width="2"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M3.51 15A9 9 0 0 0 18.36 18.36L23 14" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </header>
    
    <div class="search-section">
      <div class="search-box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="search-icon">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索用户..."
          class="search-input"
        />
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="pending" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">加载中...</p>
    </div>

    <!-- 下拉刷新指示器 -->
    <div ref="pullRefreshElement" class="pull-refresh-indicator">
      <div class="refresh-spinner"></div>
      <span>下拉刷新</span>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" class="error-container">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="error-icon">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="1.5"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      <p class="error-text">加载失败</p>
      <p class="error-detail">{{ error }}</p>
      <button class="retry-btn" @click="refresh()">重试</button>
    </div>

    <!-- 用户列表 -->
    <div v-else-if="users && users.length > 0" class="users-list" ref="userListElement">
      <div
        v-for="user in users"
        :key="user.id"
        class="user-item"
        @click="goToUserDetail(user)"
      >
        <img 
          :src="user.avatar" 
          :alt="`${user.name}的头像 - ${user.status || '音乐爱好者'}`" 
          class="avatar avatar-md" 
          loading="lazy"
          :width="48"
          :height="48"
        />
        <div class="user-info">
          <h3 class="user-name">{{ user.name }}</h3>
          <p class="user-status">{{ user.status }}</p>
        </div>
        <div class="user-actions">
          <div v-if="user.isOnline" class="online-dot"></div>
          <button
            class="chat-btn"
            @click.stop="startChat(user)"
          >
            聊天
          </button>
        </div>
      </div>
      
      <!-- 加载更多指示器 -->
      <div v-if="isLoadingMore" class="load-more-indicator">
        <div class="loading-spinner"></div>
        <span class="loading-text">加载更多...</span>
      </div>
      
      <!-- 没有更多数据提示 -->
      <div v-else-if="!hasMoreData && users.length > 0" class="no-more-data">
        <span>没有更多数据了</span>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-container">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="empty-icon">
        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      <p class="empty-text">暂无用户</p>
      <button class="retry-btn" @click="refresh()">刷新试试</button>
    </div>
  </div>
</template>

<script setup>
import { dataTransform, errorHandler } from '~/utils/helpers.js'

// 高级SEO配置
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

// 响应式数据
const searchQuery = ref('')
const refreshing = ref(false)
const currentPage = ref(1)
const pageSize = 20
const allUsers = ref([])
const isLoadingMore = ref(false)
const hasMoreData = ref(true)
const pullRefreshElement = ref(null)
const userListElement = ref(null)

// 使用封装好的API方法获取数据，支持SSR+SSG和响应式参数
const searchParams = computed(() => ({
  page: currentPage.value,
  pageSize,
  search_text: searchQuery.value || undefined
}))

const { data: apiData, pending, error, refresh: refreshData } = await useHallUsers(searchParams)

// 计算属性
const users = computed(() => {
  // 当搜索条件变化或页面重置时，清空累积数据
  if (currentPage.value === 1) {
    allUsers.value = apiData.value?.users || []
  } else {
    // 分页加载时，合并数据
    const newUsers = apiData.value?.users || []
    const existingIds = new Set(allUsers.value.map(u => u.id))
    const uniqueNewUsers = newUsers.filter(u => !existingIds.has(u.id))
    if (uniqueNewUsers.length > 0) {
      allUsers.value = [...allUsers.value, ...uniqueNewUsers]
    }
  }
  return allUsers.value
})

// 动态计算SEO数据（依赖于users，所以要在users定义之后）
const totalUsers = computed(() => users.value?.length || 0)

// 详细SEO配置
useSeoMeta({
  title: `发现音乐好友 - 第${currentPage.value}页 | ${runtimeConfig.public.siteName}`,
  description: `发现${totalUsers.value}+位音乐爱好者，与志同道合的朋友开始1v1音乐聊天。实时在线状态，即时开始对话。`,
  keywords: '音乐聊天,在线交友,音乐爱好者,1v1聊天,即时通讯,音乐社交',
  
  // OpenGraph优化
  ogTitle: `发现音乐好友 - 与${totalUsers.value}+位音乐爱好者聊天`,
  ogDescription: `加入音乐聊天社区，发现志同道合的音乐好友。支持实时聊天，分享音乐心得。`,
  ogImage: `${runtimeConfig.public.siteUrl}/og-users.jpg`,
  ogImageAlt: '音乐聊天应用用户列表页面截图',
  ogType: 'website',
  ogUrl: `${runtimeConfig.public.siteUrl}${route.fullPath}`,
  ogSiteName: runtimeConfig.public.siteName,
  ogLocale: 'zh_CN',
  
  // Twitter Card优化
  twitterCard: 'summary_large_image',
  twitterSite: '@music_chat_app',
  twitterCreator: '@music_chat_app',
  twitterTitle: `发现音乐好友 - 与${totalUsers.value}+位音乐爱好者聊天`,
  twitterDescription: `加入音乐聊天社区，发现志同道合的音乐好友。支持实时聊天，分享音乐心得。`,
  twitterImage: `${runtimeConfig.public.siteUrl}/og-users.jpg`,
  twitterImageAlt: '音乐聊天应用用户列表页面',
  
  // 移动端优化
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  
  // 搜索引擎优化
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  author: '音乐聊天应用',
  generator: 'Nuxt.js',
  
  // 应用相关meta
  applicationName: runtimeConfig.public.siteName,
  msapplicationTileColor: '#667eea',
  themeColor: '#667eea',
  
  // 内容分类
  articleTag: ['音乐', '聊天', '社交', '交友'],
  
  // 地理位置（如果适用）
  geoRegion: 'CN',
  geoPosition: '39.9042;116.4074', // 北京坐标示例
  
  // 版权和评级
  copyright: `© ${new Date().getFullYear()} ${runtimeConfig.public.siteName}`,
  rating: 'general'
})

// 结构化数据 - 用户列表页面（响应式更新）
watchEffect(() => {
  useSchemaOrg([
    defineWebPage({
      name: '音乐好友发现页',
      description: '发现音乐爱好者，开始音乐聊天',
      url: `${runtimeConfig.public.siteUrl}${route.fullPath}`
    }),
    defineWebSite({
      name: runtimeConfig.public.siteName,
      url: runtimeConfig.public.siteUrl
    }),
    defineItemList({
      name: '在线音乐用户',
      numberOfItems: totalUsers.value,
      itemListElement: users.value?.slice(0, 10).map((user, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: user.name,
          image: user.avatar,
          description: user.status,
          url: `${runtimeConfig.public.siteUrl}/user/${user.id}`,
          additionalType: 'MusicEnthusiast'
        }
      })) || []
    }),
    defineBreadcrumb([
      {
        name: '首页',
        item: runtimeConfig.public.siteUrl
      },
      {
        name: '发现好友',
        item: `${runtimeConfig.public.siteUrl}${route.fullPath}`
      }
    ])
  ])
})

// 更新hasMore状态
watch(apiData, (newData) => {
  if (newData) {
    hasMoreData.value = newData.hasMore
  }
}, { immediate: true })

// 搜索时重置分页
watch(searchQuery, () => {
  currentPage.value = 1
  allUsers.value = []
})

// 刷新数据
const refresh = async () => {
  if (refreshing.value) return
  
  refreshing.value = true
  try {
    currentPage.value = 1
    allUsers.value = []
    await refreshData()
  } catch (err) {
    console.error('刷新失败:', err)
    errorHandler.showError('刷新失败，请稍后重试')
  } finally {
    refreshing.value = false
  }
}

// 加载更多数据
const loadMore = async () => {
  if (isLoadingMore.value || !hasMoreData.value || pending.value) return
  
  isLoadingMore.value = true
  try {
    currentPage.value += 1
    // 响应式参数会自动触发数据重新获取
  } catch (err) {
    console.error('加载更多失败:', err)
    errorHandler.showError('加载更多失败，请稍后重试')
    currentPage.value -= 1 // 回退页码
  } finally {
    isLoadingMore.value = false
  }
}

// 跳转到用户详情
const goToUserDetail = (user) => {
  navigateTo(`/user/${user.id}`)
}

// 开始聊天
const startChat = (user) => {
  navigateTo(`/chat/${user.id}`)
}

// 下拉刷新功能
let startY = 0
let currentY = 0
let isPulling = false
const pullDistance = 80 // 触发刷新的距离

const handleTouchStart = (e) => {
  if (window.scrollY > 0) return
  startY = e.touches[0].clientY
  isPulling = false
}

const handleTouchMove = (e) => {
  if (window.scrollY > 0 || refreshing.value) return
  
  currentY = e.touches[0].clientY
  const distance = currentY - startY
  
  if (distance > 0 && window.scrollY === 0) {
    isPulling = true
    e.preventDefault()
    
    if (pullRefreshElement.value) {
      const pullProgress = Math.min(distance / pullDistance, 1)
      pullRefreshElement.value.style.transform = `translateY(${Math.min(distance * 0.5, pullDistance * 0.5)}px)`
      pullRefreshElement.value.style.opacity = pullProgress
    }
  }
}

const handleTouchEnd = (e) => {
  if (!isPulling || refreshing.value) return
  
  const distance = currentY - startY
  
  if (pullRefreshElement.value) {
    pullRefreshElement.value.style.transform = 'translateY(0)'
    pullRefreshElement.value.style.opacity = '0'
  }
  
  if (distance > pullDistance) {
    refresh()
  }
  
  isPulling = false
}

// 上拉加载更多
const handleScroll = throttle(() => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // 距离底部100px时开始加载
  if (scrollTop + windowHeight >= documentHeight - 100) {
    loadMore()
  }
}, 200)

// 节流函数
function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 生命周期
onMounted(() => {
  // 添加触摸事件监听
  document.addEventListener('touchstart', handleTouchStart, { passive: false })
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('touchend', handleTouchEnd)
  
  // 添加滚动事件监听
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // 清理事件监听
  document.removeEventListener('touchstart', handleTouchStart)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.users-page {
  background: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  background: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.refresh-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  color: #667eea;
}

.refresh-btn:hover {
  background: #f5f5f5;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.search-section {
  padding: 16px;
  background: white;
  border-bottom: 1px solid #e5e5e5;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 0 12px;
}

.search-icon {
  color: #999;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-text {
  font-size: 1rem;
  color: #666;
}

/* 错误状态 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.error-icon {
  color: #ff4757;
  margin-bottom: 1rem;
}

.error-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.error-detail {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.retry-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background: #5a67d8;
}

/* 空状态 */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  color: #ccc;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 1rem;
}

/* 用户列表 */
.users-list {
  background: white;
  margin-top: 8px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-item:last-child {
  border-bottom: none;
}

.user-item:active {
  background-color: #f5f5f5;
}

.user-info {
  flex: 1;
  margin-left: 12px;
  min-width: 0;
}

.user-name {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.user-status {
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.online-dot {
  width: 8px;
  height: 8px;
  background: #00d26b;
  border-radius: 50%;
}

.chat-btn {
  padding: 6px 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.chat-btn:hover {
  background: #5a67d8;
}

.chat-btn:active {
  transform: scale(0.95);
}

/* 下拉刷新指示器 */
.pull-refresh-indicator {
  position: fixed;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #667eea;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1000;
}

.refresh-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 加载更多指示器 */
.load-more-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: white;
  border-top: 1px solid #f0f0f0;
}

.load-more-indicator .loading-spinner {
  width: 20px;
  height: 20px;
}

.load-more-indicator .loading-text {
  font-size: 14px;
  color: #666;
}

/* 没有更多数据提示 */
.no-more-data {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: white;
  border-top: 1px solid #f0f0f0;
  font-size: 14px;
  color: #999;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .users-page {
    padding-bottom: 60px; /* 为底部导航留出空间 */
  }
  
  .user-item {
    padding: 12px 16px;
  }
  
  .avatar {
    width: 44px;
    height: 44px;
  }
  
  .user-name {
    font-size: 15px;
  }
  
  .user-status {
    font-size: 13px;
  }
  
  .chat-btn {
    padding: 5px 10px;
    font-size: 11px;
  }
}

/* 触摸反馈优化 */
.user-item:active {
  background-color: #f8f8f8;
  transform: scale(0.98);
  transition: all 0.1s ease;
}
</style>