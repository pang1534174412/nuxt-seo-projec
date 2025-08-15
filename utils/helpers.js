import { API_CONFIG } from './api.js'

// 图片处理工具函数
export const imageUtils = {
  // 获取完整图片URL
  getImageUrl(imagePath) {
    if (!imagePath) return ''
    
    // 如果已经是完整URL，直接返回
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // 如果是相对路径，添加图片域名前缀
    return `${API_CONFIG.imageBaseURL}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`
  },

  // 获取头像URL（带默认值）
  getAvatarUrl(imagePath, defaultSeed = 'default') {
    if (imagePath) {
      return this.getImageUrl(imagePath)
    }
    // 如果没有头像，使用DiceBear生成默认头像
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${defaultSeed}`
  },

  // 批量处理图片URL
  processImageUrls(images = []) {
    return images.map(img => {
      if (typeof img === 'string') {
        return this.getImageUrl(img)
      }
      if (typeof img === 'object' && img.url) {
        return {
          ...img,
          url: this.getImageUrl(img.url)
        }
      }
      return img
    })
  }
}

// 数据转换工具
export const dataTransform = {
  // 转换API用户数据为组件需要的格式
  transformUser(apiUser) {
    return {
      id: apiUser.id || apiUser.user_id,
      name: apiUser.name || apiUser.nickname || '未知用户',
      avatar: imageUtils.getAvatarUrl(apiUser.avatar || apiUser.head_img, apiUser.id),
      status: this.getUserStatus(apiUser),
      isOnline: apiUser.is_online === 1 || apiUser.online_status === 1,
      lastSeen: apiUser.last_seen ? new Date(apiUser.last_seen * 1000) : new Date(),
      // 保留原始数据
      _raw: apiUser
    }
  },

  // 获取用户状态文本
  getUserStatus(apiUser) {
    if (apiUser.is_online === 1 || apiUser.online_status === 1) {
      return '在线'
    }
    
    if (apiUser.last_seen) {
      const lastSeen = new Date(apiUser.last_seen * 1000)
      const now = new Date()
      const diff = now - lastSeen
      
      if (diff < 60 * 60 * 1000) { // 1小时内
        return `${Math.floor(diff / (60 * 1000))}分钟前在线`
      } else if (diff < 24 * 60 * 60 * 1000) { // 24小时内
        return `${Math.floor(diff / (60 * 60 * 1000))}小时前在线`
      } else if (diff < 7 * 24 * 60 * 60 * 1000) { // 7天内
        return `${Math.floor(diff / (24 * 60 * 60 * 1000))}天前在线`
      } else {
        return '很久前在线'
      }
    }
    
    return '离线'
  },

  // 转换用户列表
  transformUserList(apiUsers = []) {
    return apiUsers.map(user => this.transformUser(user))
  },

  // 转换用户详情数据
  transformUserDetail(apiUserDetail) {
    const baseUser = this.transformUser(apiUserDetail)
    
    return {
      ...baseUser,
      // 相册数据
      photos: this.transformPhotos(apiUserDetail.photos || apiUserDetail.images || []),
      // 动态数据
      moments: this.transformMoments(apiUserDetail.moments || apiUserDetail.dynamics || []),
      // 其他详情信息
      bio: apiUserDetail.bio || apiUserDetail.signature || '',
      age: apiUserDetail.age,
      location: apiUserDetail.location || apiUserDetail.city,
      followersCount: apiUserDetail.followers_count || 0,
      followingCount: apiUserDetail.following_count || 0,
      isFollowed: apiUserDetail.is_followed === 1
    }
  },

  // 转换相册数据
  transformPhotos(apiPhotos = []) {
    return apiPhotos.map((photo, index) => ({
      id: photo.id || index,
      url: imageUtils.getImageUrl(photo.url || photo.image_url || photo),
      description: photo.description || photo.title || '',
      createdAt: photo.created_at ? new Date(photo.created_at * 1000) : new Date()
    }))
  },

  // 转换动态数据
  transformMoments(apiMoments = []) {
    return apiMoments.map(moment => ({
      id: moment.id,
      content: moment.content || moment.text || '',
      images: imageUtils.processImageUrls(moment.images || moment.photos || []),
      createdAt: moment.created_at ? new Date(moment.created_at * 1000) : new Date(),
      likeCount: moment.like_count || 0,
      commentCount: moment.comment_count || 0
    }))
  }
}

// 错误处理工具
export const errorHandler = {
  // 处理API错误
  handleApiError(error, defaultMessage = '请求失败') {
    console.error('API Error:', error)
    
    if (error.statusCode === 404) {
      return '请求的资源不存在'
    } else if (error.statusCode === 500) {
      return '服务器内部错误'
    } else if (error.statusCode === 403) {
      return '没有访问权限'
    } else if (error.name === 'FetchError') {
      return '网络连接失败'
    }
    
    return error.message || defaultMessage
  },

  // 显示错误提示
  showError(message) {
    // 这里可以集成Toast组件或其他提示方式
    console.error('用户提示:', message)
    // 临时使用alert，实际项目中应该使用更好的提示组件
    if (process.client) {
      alert(message)
    }
  }
}