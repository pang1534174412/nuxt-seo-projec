<template>
  <div class="chat-page">
    <!-- 头部导航 -->
    <header class="chat-header">
      <button class="back-btn" @click="$router.back()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
      
      <div class="user-info" @click="goToUserDetail">
        <img :src="targetUser.avatar" :alt="targetUser.name" class="avatar avatar-sm" />
        <div class="user-details">
          <h3 class="user-name">{{ targetUser.name }}</h3>
          <span class="user-status" :class="{ online: targetUser.isOnline }">
            {{ targetUser.isOnline ? '在线' : '离线' }}
          </span>
        </div>
      </div>
      
      <button class="more-btn" @click="showOptions = true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
          <circle cx="19" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
          <circle cx="5" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </header>

    <!-- 聊天内容区 -->
    <div class="messages-container" ref="messagesContainer">
      <div class="messages-list">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message-bubble', { 'is-mine': message.isFromMe }]"
        >
          <div v-if="!message.isFromMe" class="message-avatar">
            <img :src="targetUser.avatar" :alt="targetUser.name" class="avatar avatar-xs" />
          </div>
          
          <div class="message-content">
            <!-- 文本消息 -->
            <div v-if="message.type === 'text'" class="message-text">
              {{ message.content }}
            </div>
            
            <!-- 图片消息 -->
            <div v-if="message.type === 'image'" class="message-image">
              <img :src="message.content" :alt="message.content" @click="previewImage(message.content)" />
            </div>
            
            <div class="message-time">
              {{ formatMessageTime(message.timestamp) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <div class="input-actions">
        <button class="action-btn" @click="showEmojiPicker = !showEmojiPicker">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        
        <div class="input-wrapper">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="输入消息..."
            class="message-input"
            @keyup.enter="sendMessage"
            @input="handleTyping"
          />
        </div>
        
        <button class="action-btn" @click="selectImage">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
            <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        
        <button
          class="send-btn"
          :class="{ active: inputMessage.trim() }"
          :disabled="!inputMessage.trim()"
          @click="sendMessage"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/>
            <polygon points="22,2 15,22 11,13 2,9 22,2" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 表情选择器 -->
    <div v-if="showEmojiPicker" class="emoji-picker">
      <div class="emoji-grid">
        <button
          v-for="emoji in emojis"
          :key="emoji"
          class="emoji-btn"
          @click="insertEmoji(emoji)"
        >
          {{ emoji }}
        </button>
      </div>
    </div>

    <!-- 操作菜单 -->
    <div v-if="showOptions" class="action-sheet" @click="showOptions = false">
      <div class="action-content" @click.stop>
        <button class="action-item" @click="clearHistory">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2"/>
          </svg>
          清空聊天记录
        </button>
        <button class="action-item" @click="reportUser">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 15S5.5 16.5 12 16.5S20 15 20 15L18 13V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V13L4 15Z" stroke="currentColor" stroke-width="2"/>
          </svg>
          举报用户
        </button>
        <button class="action-item cancel" @click="showOptions = false">
          取消
        </button>
      </div>
    </div>

    <!-- 图片预览 -->
    <div v-if="previewImageUrl" class="image-preview" @click="previewImageUrl = null">
      <img :src="previewImageUrl" alt="预览图片" />
    </div>

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="handleImageSelect"
    />
  </div>
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const userId = route.params.id

// SEO配置
useSeoMeta({
  title: '聊天 - 聊天应用',
  description: '与好友1v1聊天'
})

// 响应式数据
const inputMessage = ref('')
const showEmojiPicker = ref(false)
const showOptions = ref(false)
const previewImageUrl = ref(null)
const messagesContainer = ref(null)
const fileInput = ref(null)

// 目标用户信息
const targetUser = ref({
  id: parseInt(userId),
  name: '张小明',
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
  isOnline: true
})

// 聊天消息
const messages = ref([
  {
    id: 1,
    type: 'text',
    content: '你好！很高兴认识你 😊',
    isFromMe: false,
    timestamp: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: 2,
    type: 'text',
    content: '嗨！我也很高兴认识你！',
    isFromMe: true,
    timestamp: new Date(Date.now() - 8 * 60 * 1000)
  },
  {
    id: 3,
    type: 'text',
    content: '今天天气真不错，你在做什么呢？',
    isFromMe: false,
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: 4,
    type: 'text',
    content: '我在学习新技术，准备做一个项目',
    isFromMe: true,
    timestamp: new Date(Date.now() - 3 * 60 * 1000)
  }
])

// 表情列表
const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐', '✋', '🖖', '👏', '🙌', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦵', '🦿', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄', '💋', '🩸', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝']

// 方法
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  const newMessage = {
    id: Date.now(),
    type: 'text',
    content: inputMessage.value,
    isFromMe: true,
    timestamp: new Date()
  }
  
  messages.value.push(newMessage)
  inputMessage.value = ''
  showEmojiPicker.value = false
  
  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })
  
  // 模拟对方回复
  setTimeout(() => {
    simulateReply()
  }, 1000 + Math.random() * 2000)
}

const simulateReply = () => {
  const replies = [
    '好的！',
    '哈哈，有趣！',
    '我明白了',
    '真的吗？',
    '听起来不错！',
    '我也这么觉得',
    '让我想想...',
    '谢谢分享！'
  ]
  
  const randomReply = replies[Math.floor(Math.random() * replies.length)]
  
  const replyMessage = {
    id: Date.now(),
    type: 'text',
    content: randomReply,
    isFromMe: false,
    timestamp: new Date()
  }
  
  messages.value.push(replyMessage)
  
  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const insertEmoji = (emoji) => {
  inputMessage.value += emoji
  showEmojiPicker.value = false
}

const selectImage = () => {
  fileInput.value.click()
}

const handleImageSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    // 这里应该上传图片到服务器，现在用本地URL模拟
    const reader = new FileReader()
    reader.onload = (e) => {
      const newMessage = {
        id: Date.now(),
        type: 'image',
        content: e.target.result,
        isFromMe: true,
        timestamp: new Date()
      }
      
      messages.value.push(newMessage)
      
      nextTick(() => {
        scrollToBottom()
      })
    }
    reader.readAsDataURL(file)
  }
}

const previewImage = (url) => {
  previewImageUrl.value = url
}

const handleTyping = () => {
  // 这里可以实现"正在输入"状态
  console.log('用户正在输入...')
}

const goToUserDetail = () => {
  navigateTo(`/user/${userId}`)
}

const clearHistory = () => {
  if (confirm('确定要清空聊天记录吗？')) {
    messages.value = []
  }
  showOptions.value = false
}

const reportUser = () => {
  navigateTo(`/report/${userId}`)
  showOptions.value = false
}

const formatMessageTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  
  if (diff < 60 * 1000) {
    return '刚刚'
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分钟前`
  } else if (diff < 24 * 60 * 60 * 1000) {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else {
    return timestamp.toLocaleDateString()
  }
}

// 页面加载时滚动到底部
onMounted(() => {
  nextTick(() => {
    scrollToBottom()
  })
})
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f0f0;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: white;
  border-bottom: 1px solid #e5e5e5;
  z-index: 100;
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

.user-info {
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 1rem;
  cursor: pointer;
}

.user-details {
  margin-left: 0.75rem;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.user-status {
  font-size: 0.75rem;
  color: #999;
}

.user-status.online {
  color: #00d26b;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.messages-list {
  padding: 0 1rem;
}

.message-bubble {
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-start;
}

.message-bubble.is-mine {
  justify-content: flex-end;
}

.message-avatar {
  margin-right: 0.5rem;
  margin-top: 0.25rem;
}

.message-content {
  max-width: 70%;
  position: relative;
}

.message-text {
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  line-height: 1.4;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.is-mine .message-text {
  background: #667eea;
  color: white;
}

.message-image {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-image img {
  width: 100%;
  max-width: 200px;
  height: auto;
  display: block;
  cursor: pointer;
}

.message-time {
  font-size: 0.625rem;
  color: #999;
  margin-top: 0.25rem;
  text-align: right;
}

.is-mine .message-time {
  color: rgba(255, 255, 255, 0.7);
}

.input-area {
  background: white;
  border-top: 1px solid #e5e5e5;
  padding: 0.75rem 1rem;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-wrapper {
  flex: 1;
}

.message-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.message-input:focus {
  border-color: #667eea;
}

.action-btn,
.send-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn {
  background: #f5f5f5;
  color: #666;
}

.action-btn:hover {
  background: #e5e5e5;
}

.send-btn {
  background: #ccc;
  color: white;
}

.send-btn.active {
  background: #667eea;
}

.send-btn:disabled {
  cursor: not-allowed;
}

.emoji-picker {
  background: white;
  border-top: 1px solid #e5e5e5;
  max-height: 200px;
  overflow-y: auto;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  padding: 1rem;
}

.emoji-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.emoji-btn:hover {
  background: #f5f5f5;
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

.image-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
}

.image-preview img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

/* 滚动条样式 */
.messages-container::-webkit-scrollbar {
  width: 4px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.emoji-picker::-webkit-scrollbar {
  width: 4px;
}

.emoji-picker::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.emoji-picker::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}
</style>