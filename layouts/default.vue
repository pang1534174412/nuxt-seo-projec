<template>
  <div class="mobile-layout">
    <main class="main-content">
      <slot />
    </main>
    
    <nav class="tab-bar safe-area">
      <NuxtLink to="/" class="tab-item" active-class="active">
        <div class="tab-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <span class="tab-label">用户</span>
      </NuxtLink>
      
      <NuxtLink to="/messages" class="tab-item" active-class="active">
        <div class="tab-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
        </div>
        <span class="tab-label">消息</span>
      </NuxtLink>
      
      <NuxtLink to="/profile" class="tab-item" active-class="active">
        <div class="tab-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <span class="tab-label">我的</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
// 模拟未读消息数量
const unreadCount = ref(3)
</script>

<style scoped>
.mobile-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

.main-content {
  flex: 1;
  padding-bottom: 80px; /* 为底部导航留出空间 */
  overflow-y: auto;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: white;
  border-top: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  z-index: 1000;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  text-decoration: none;
  color: #999;
  transition: color 0.2s ease;
  position: relative;
}

.tab-item.active {
  color: #667eea;
}

.tab-icon {
  position: relative;
  margin-bottom: 4px;
}

.tab-icon svg {
  width: 24px;
  height: 24px;
}

.tab-label {
  font-size: 12px;
  font-weight: 500;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 10px;
  background: #ff4757;
  color: white;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 点击效果 */
.tab-item:active {
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
}
</style>