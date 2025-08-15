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

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-container">
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
    <div v-else-if="users && users.length > 0" class="users-list">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="user-item"
        @click="goToUserDetail(user)"
      >
        <img :src="user.avatar" :alt="user.name" class="avatar avatar-md" />
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

// SEO配置
useSeoMeta({
  title: '用户列表 - 聊天应用',
  description: '浏览所有在线用户，开始1v1聊天'
})

// 响应式数据
const searchQuery = ref('')
const refreshing = ref(false)

// 使用封装好的API方法获取数据，支持SSR+SSG
const searchParams = computed(() => ({
  page: 1,
  pageSize: 50,
  search_text: searchQuery.value || undefined
}))

const { data: apiData, pending, error, refresh: refreshData } = await useHallUsers(searchParams.value)

// 计算属性
const users = computed(() => apiData.value?.users || [])

const filteredUsers = computed(() => {
  if (!searchQuery.value || !users.value) return users.value
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 刷新数据
const refresh = async () => {
  if (refreshing.value) return
  
  refreshing.value = true
  try {
    await refreshData()
  } catch (err) {
    console.error('刷新失败:', err)
    errorHandler.showError('刷新失败，请稍后重试')
  } finally {
    refreshing.value = false
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

// 搜索防抖
let searchTimeout
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    refresh()
  }, 500)
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
</style>