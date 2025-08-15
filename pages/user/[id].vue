<template>
  <div class="user-detail-page">
    <!-- 头部导航 -->
    <header class="header">
      <button class="back-btn" @click="$router.back()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
      <h1 class="header-title">用户详情</h1>
      <button class="more-btn" @click="showActions = true" v-if="user">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
          <circle cx="19" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
          <circle cx="5" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </header>

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

    <!-- 用户信息内容 -->
    <div v-else-if="user">
      <!-- 用户信息 -->
      <div class="user-info">
        <div class="avatar-section">
          <img :src="user.avatar" :alt="user.name" class="avatar avatar-lg" />
          <div v-if="user.isOnline" class="online-dot"></div>
        </div>
        <h2 class="user-name">{{ user.name }}</h2>
        <p class="user-status">{{ user.status }}</p>
        <div class="user-stats" v-if="user.followersCount !== undefined">
          <div class="stat-item">
            <span class="stat-number">{{ user.worksCount || 0 }}</span>
            <span class="stat-label">作品</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ user.followersCount }}</span>
            <span class="stat-label">粉丝</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ user.followingCount }}</span>
            <span class="stat-label">关注</span>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-primary" @click="startChat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            发消息
          </button>
          <button class="btn btn-secondary" @click="toggleFollow">
            <svg v-if="!user.isFollowed" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2"/>
              <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
              <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2"/>
              <line x1="17" y1="11" x2="23" y2="11" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2"/>
              <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
              <path d="M17 11L19 13L23 9" stroke="currentColor" stroke-width="2"/>
            </svg>
            {{ user.isFollowed ? '已关注' : '关注' }}
          </button>
        </div>
      </div>

      <!-- Tab切换 -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-button', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="tab-content">
        <!-- 相册 -->
        <div v-if="activeTab === 'photos'" class="photos-grid">
          <div
            v-for="photo in user.photos"
            :key="photo.id"
            class="photo-item"
            @click="viewPhoto(photo)"
          >
            <img :src="photo.url" :alt="photo.description" />
          </div>
          <div v-if="user.photos.length === 0" class="empty-state">
            <p>暂无相册</p>
          </div>
        </div>

        <!-- 动态 -->
        <div v-if="activeTab === 'moments'" class="moments-list">
          <div
            v-for="moment in user.moments"
            :key="moment.id"
            class="moment-item"
          >
            <div class="moment-header">
              <img :src="user.avatar" :alt="user.name" class="avatar avatar-sm" />
              <div class="moment-info">
                <h4>{{ user.name }}</h4>
                <span class="moment-time">{{ formatTime(moment.createdAt) }}</span>
              </div>
            </div>
            <p class="moment-content">{{ moment.content }}</p>
            <div v-if="moment.images && moment.images.length > 0" class="moment-images">
              <img
                v-for="(image, index) in moment.images"
                :key="index"
                :src="image"
                :alt="moment.content"
                class="moment-image"
              />
            </div>
            <div class="moment-actions">
              <span class="action-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61A5.5 5.5 0 0 0 16 2H8A5.5 5.5 0 0 0 3.16 4.61A4.99 4.99 0 0 0 2 8.5V16A5.5 5.5 0 0 0 7.5 21.5H16.5A5.5 5.5 0 0 0 22 16V8.5A4.99 4.99 0 0 0 20.84 4.61Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2"/>
                </svg>
                {{ moment.likeCount }}
              </span>
              <span class="action-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="2"/>
                </svg>
                {{ moment.commentCount }}
              </span>
            </div>
          </div>
          <div v-if="user.moments.length === 0" class="empty-state">
            <p>暂无动态</p>
          </div>
        </div>
      </div>

      <!-- 操作菜单 -->
      <div v-if="showActions" class="action-sheet" @click="showActions = false">
        <div class="action-content" @click.stop>
          <button class="action-item" @click="reportUser">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 15S5.5 16.5 12 16.5S20 15 20 15L18 13V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V13L4 15Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            举报用户
          </button>
          <button class="action-item" @click="blockUser">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M4.93 4.93L19.07 19.07" stroke="currentColor" stroke-width="2"/>
            </svg>
            拉黑用户
          </button>
          <button class="action-item cancel" @click="showActions = false">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imageUtils, errorHandler } from '~/utils/helpers.js'

// 获取路由参数
const route = useRoute()
const userId = route.params.id

// SEO配置
useSeoMeta({
  title: '用户详情 - 聊天应用',
  description: '查看用户资料、相册和动态'
})

// 响应式数据
const activeTab = ref('photos')
const showActions = ref(false)

const tabs = [
  { key: 'photos', label: '相册' },
  { key: 'moments', label: '动态' }
]

// 使用封装好的API方法获取用户详情数据，支持SSR
const { data: userDetail, pending, error, refresh } = await useUserDetail(userId)

// 计算属性
const user = computed(() => userDetail.value)

// 方法
const startChat = () => {
  if (user.value) {
    navigateTo(`/chat/${user.value.id}`)
  }
}

const toggleFollow = () => {
  if (user.value) {
    user.value.isFollowed = !user.value.isFollowed
    // 这里应该调用API更新关注状态
    console.log(user.value.isFollowed ? '已关注' : '取消关注')
  }
}

const viewPhoto = (photo) => {
  // 查看大图逻辑
  console.log('查看图片:', photo)
}

const reportUser = () => {
  navigateTo(`/report/${userId}`)
  showActions.value = false
}

const blockUser = () => {
  if (confirm('确定要拉黑这个用户吗？')) {
    // 拉黑逻辑
    console.log('拉黑用户:', userId)
  }
  showActions.value = false
}

const formatTime = (time) => {
  const now = new Date()
  const diff = now - time
  
  if (diff < 60 * 1000) {
    return '刚刚'
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分钟前`
  } else if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 60 * 1000))}小时前`
  } else {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}天前`
  }
}
</script>

<style scoped>
.user-detail-page {
  background: #f5f5f5;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #e5e5e5;
}

.back-btn,
.more-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.back-btn:hover,
.more-btn:hover {
  background: #f5f5f5;
}

.header-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

.user-info {
  background: white;
  padding: 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}

.avatar-section {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.online-dot {
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
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.user-status {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

/* 用户统计数据 */
.user-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-buttons .btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tabs {
  display: flex;
  background: white;
  border-bottom: 1px solid #e5e5e5;
}

.tab-button {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #999;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab-button.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.tab-content {
  flex: 1;
  padding: 1rem;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.photo-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.photo-item:hover img {
  transform: scale(1.05);
}

.moments-list {
  space-y: 1rem;
}

.moment-item {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.moment-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.moment-info {
  margin-left: 0.75rem;
}

.moment-info h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
}

.moment-time {
  font-size: 0.75rem;
  color: #999;
}

.moment-content {
  font-size: 0.875rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.moment-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin-bottom: 0.75rem;
}

.moment-image {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
}

/* 动态操作按钮 */
.moment-actions {
  display: flex;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f0f0f0;
}

.moment-actions .action-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #666;
  cursor: pointer;
  transition: color 0.2s ease;
}

.moment-actions .action-item:hover {
  color: #667eea;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
}

.action-sheet {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.action-content {
  width: 100%;
  background: white;
  border-radius: 12px 12px 0 0;
  padding: 1rem;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
  color: #1a1a1a;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.action-item:hover {
  background: #f5f5f5;
}

.action-item.cancel {
  color: #999;
  justify-content: center;
  border-top: 1px solid #e5e5e5;
  margin-top: 0.5rem;
  padding-top: 1rem;
}
</style>