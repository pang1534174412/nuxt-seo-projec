<template>
  <div class="messages-page">
    <header class="page-header">
      <h1 class="page-title">消息</h1>
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
          placeholder="搜索消息..."
          class="search-input"
        />
      </div>
    </div>

    <div class="messages-list">
      <div
        v-for="conversation in filteredConversations"
        :key="conversation.id"
        class="message-item"
        @click="openChat(conversation)"
      >
        <div class="avatar-container">
          <img :src="conversation.user.avatar" :alt="conversation.user.name" class="avatar avatar-md" />
          <div v-if="conversation.user.isOnline" class="online-dot"></div>
        </div>
        
        <div class="message-info">
          <div class="message-header">
            <h3 class="user-name">{{ conversation.user.name }}</h3>
            <span class="message-time">{{ formatTime(conversation.lastMessage.time) }}</span>
          </div>
          <div class="message-preview">
            <p class="last-message" :class="{ 'unread': conversation.unreadCount > 0 }">
              {{ conversation.lastMessage.content }}
            </p>
            <div v-if="conversation.unreadCount > 0" class="badge">{{ conversation.unreadCount }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading"></div>

    <div v-if="filteredConversations.length === 0 && !loading" class="empty-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="empty-icon">
        <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      <p class="empty-text">暂无消息</p>
    </div>
  </div>
</template>

<script setup>
// SEO配置
useSeoMeta({
  title: '消息列表 - 聊天应用',
  description: '查看所有聊天记录，继续你的对话'
})

// 搜索功能
const searchQuery = ref('')
const loading = ref(false)

// 模拟对话数据
const conversations = ref([
  {
    id: 1,
    user: {
      id: 1,
      name: '张小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      isOnline: true
    },
    lastMessage: {
      content: '你好，最近怎么样？',
      time: new Date(Date.now() - 10 * 60 * 1000), // 10分钟前
      isFromMe: false
    },
    unreadCount: 2
  },
  {
    id: 2,
    user: {
      id: 2,
      name: '李小红',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      isOnline: true
    },
    lastMessage: {
      content: '好的，明天见！',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
      isFromMe: true
    },
    unreadCount: 0
  },
  {
    id: 3,
    user: {
      id: 4,
      name: '赵小强',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      isOnline: false
    },
    lastMessage: {
      content: '谢谢你的帮助！这个项目终于完成了 🎉',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
      isFromMe: false
    },
    unreadCount: 1
  }
])

// 过滤对话
const filteredConversations = computed(() => {
  if (!searchQuery.value) return conversations.value
  return conversations.value.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    conv.lastMessage.content.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 格式化时间
const formatTime = (time) => {
  const now = new Date()
  const diff = now - time
  
  if (diff < 60 * 1000) {
    return '刚刚'
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分钟前`
  } else if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 60 * 1000))}小时前`
  } else if (diff < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}天前`
  } else {
    return time.toLocaleDateString()
  }
}

// 打开聊天
const openChat = (conversation) => {
  navigateTo(`/chat/${conversation.user.id}`)
}
</script>

<style scoped>
.messages-page {
  background: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  background: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 16px;
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

.messages-list {
  background: white;
  margin-top: 8px;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.message-item:last-child {
  border-bottom: none;
}

.message-item:active {
  background-color: #f5f5f5;
}

.avatar-container {
  position: relative;
}

.online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #00d26b;
  border: 2px solid white;
  border-radius: 50%;
}

.message-info {
  flex: 1;
  margin-left: 12px;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.user-name {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

.message-time {
  font-size: 12px;
  color: #999;
}

.message-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-message {
  flex: 1;
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8px;
}

.last-message.unread {
  font-weight: 500;
  color: #1a1a1a;
}

.empty-state {
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
  font-size: 16px;
  color: #999;
}
</style>