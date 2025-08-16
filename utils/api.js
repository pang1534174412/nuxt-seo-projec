// API 配置
export const API_CONFIG = {
  baseURL: 'https://amtapi.267girl.com',
  imageBaseURL: 'https://s3.267girl.com/',
  timeout: 10000
}

// 获取正确的 API 基础URL
export const getApiBaseURL = () => {
  // 在Nuxt环境中，优先使用运行时配置
  if (process.server || process.client) {
    try {
      const runtimeConfig = useRuntimeConfig()
      const apiBaseUrl = runtimeConfig.public.apiBaseUrl
      
      // 在开发环境中，始终使用直接的API URL
      if (process.dev) {
        return apiBaseUrl
      }
      
      // 在生产环境中，客户端使用代理路径，服务端使用直接API
      if (process.client) {
        return '/api/proxy'
      }
      
      return apiBaseUrl
    } catch (error) {
      // 如果无法获取运行时配置，fallback到默认配置
      console.warn('无法获取运行时配置，使用默认API配置')
    }
  }
  
  // Fallback 逻辑（非Nuxt环境或出错时）
  if (process.client && !process.dev) {
    return '/api/proxy'
  }
  return API_CONFIG.baseURL
}

// API 客户端工厂函数
export const createApiClient = () => {
  const baseURL = getApiBaseURL()
  
  return {
    baseURL,
    
    // 通用请求方法
    async request(endpoint, options = {}) {
      const url = `${baseURL}${endpoint}`
      
      const defaultOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        ...options
      }

      try {
        const response = await $fetch(url, defaultOptions)
        return {
          success: true,
          data: response,
          error: null
        }
      } catch (error) {
        console.error('API请求失败:', error)
        return {
          success: false,
          data: null,
          error: error.message || '请求失败'
        }
      }
    },

    // GET 请求
    async get(endpoint, params = {}) {
      return this.request(endpoint, {
        method: 'GET',
        query: params
      })
    },

    // POST 请求
    async post(endpoint, data = {}) {
      return this.request(endpoint, {
        method: 'POST',
        body: data
      })
    },

    // PUT 请求
    async put(endpoint, data = {}) {
      return this.request(endpoint, {
        method: 'PUT',
        body: data
      })
    },

    // DELETE 请求
    async delete(endpoint) {
      return this.request(endpoint, {
        method: 'DELETE'
      })
    }
  }
}

// 具体的API方法工厂
export const createMusicApi = () => {
  const apiClient = createApiClient()
  
  return {
    // 获取音乐大厅用户列表
    async getHallUsers(params = {}) {
      return apiClient.get('/music/hall', params)
    },

    // 获取用户详情
    async getUserDetail(userId) {
      return apiClient.get('/music/detail', { id: userId })
    }
  }
}