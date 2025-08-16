import { createMusicApi } from '~/utils/api.js'

/**
 * 获取用户列表的 composable，支持 SSR/SSG 和响应式参数
 */
export const useHallUsers = (params = {}) => {
  // 支持响应式参数
  const reactiveParams = computed(() => {
    return unref(params)
  })
  
  // 使用响应式的key
  const key = computed(() => `hall-users-${JSON.stringify(reactiveParams.value)}`)
  
  return useLazyAsyncData(key, async () => {
    const musicApi = createMusicApi()
    const result = await musicApi.getHallUsers(reactiveParams.value)
    
    if (result.success) {
      return result.data
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: result.error || '获取用户列表失败'
      })
    }
  }, {
    default: () => ({ users: [], has_more: false, list: [] }),
    server: true, // 确保在服务端执行
    watch: [reactiveParams], // 当参数变化时重新获取数据
    transform: (data) => {
      // 数据转换逻辑
      if (data?.ok === 1 && data?.data) {
        const users = []
        const { list, user_infos } = data.data
        
        if (list && Array.isArray(list)) {
          list.forEach(musicItem => {
            const userInfo = user_infos?.[musicItem.uid]
            if (userInfo) {
              users.push({
                id: musicItem.uid,
                musicId: musicItem.id,
                name: userInfo.nickname || `用户${musicItem.uid}`,
                avatar: userInfo.avatar ? 
                  `https://s3.267girl.com/${userInfo.avatar}` : 
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${musicItem.uid}`,
                status: getRandomStatus(),
                isOnline: Math.random() > 0.3, // 70%概率在线
                lastSeen: new Date(musicItem.create_time || Date.now()),
                likeCount: musicItem.like || 0,
                coverUrl: musicItem.cover_media_url ? 
                  `https://s3.267girl.com/${musicItem.cover_media_url}` : null
              })
            }
          })
        }
        
        return {
          users,
          hasMore: data.data.has_more === 1,
          total: list?.length || 0
        }
      }
      return { users: [], hasMore: false, total: 0 }
    }
  })
}

/**
 * 获取用户详情的 composable
 */
export const useUserDetail = (userId) => {
  const key = `user-detail-${userId}`
  
  return useLazyAsyncData(key, async () => {
    const musicApi = createMusicApi()
    const result = await musicApi.getHallUsers({ page: 1, pageSize: 20 })
    
    if (result.success && result.data?.ok === 1 && result.data?.data) {
      const { list, user_infos } = result.data.data
      
      // 查找匹配的用户
      const targetUser = Object.values(user_infos || {}).find(u => u.uid == userId)
      if (!targetUser) {
        throw createError({
          statusCode: 404,
          statusMessage: '用户不存在'
        })
      }
      
      // 获取该用户的作品列表作为相册
      const userWorks = list?.filter(item => item.uid == userId) || []
      
      return {
        id: parseInt(userId),
        name: targetUser.nickname || `用户${userId}`,
        avatar: targetUser.avatar ? 
          `https://s3.267girl.com/${targetUser.avatar}` : 
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
        status: getRandomStatus(),
        isOnline: Math.random() > 0.3,
        isFollowed: Math.random() > 0.5,
        // 将用户的音乐作品转换为相册
        photos: generatePhotosFromWorks(userWorks, userId),
        // 将用户的音乐作品转换为动态
        moments: generateMomentsFromWorks(userWorks, targetUser, userId),
        // 额外信息
        bio: '这是一个音乐爱好者',
        location: '未知',
        followersCount: Math.floor(Math.random() * 1000),
        followingCount: Math.floor(Math.random() * 500),
        worksCount: userWorks.length
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: result.error || '获取用户详情失败'
      })
    }
  }, {
    default: () => null,
    server: true
  })
}

// 从音乐作品生成相册数据
function generatePhotosFromWorks(works, userId) {
  const photos = []
  works.forEach((work, index) => {
    if (work.cover_media_url) {
      photos.push({
        id: work.id,
        url: `https://s3.267girl.com/${work.cover_media_url}`,
        description: work.title || `作品 ${index + 1}`,
        createdAt: new Date(work.create_time || Date.now())
      })
    }
    
    // 为每个作品额外生成一些随机图片
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      photos.push({
        id: `${work.id}_${i}`,
        url: `https://picsum.photos/400/400?random=${work.id}_${i}`,
        description: `生活照片 ${i + 1}`,
        createdAt: new Date(work.create_time || Date.now())
      })
    }
  })
  
  // 如果没有作品，生成一些默认图片
  if (photos.length === 0) {
    for (let i = 1; i <= 6; i++) {
      photos.push({
        id: i,
        url: `https://picsum.photos/400/400?random=${userId}_${i}`,
        description: `图片 ${i}`,
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      })
    }
  }
  
  return photos.slice(0, 12) // 最多显示12张图片
}

// 从音乐作品生成动态数据
function generateMomentsFromWorks(works, userInfo, userId) {
  const moments = []
  
  works.forEach((work, index) => {
    const randomTexts = [
      '今天创作了一首新歌，希望大家喜欢！',
      '灵感来了就是挡不住，音乐就是我的生活',
      '分享一下最近的音乐作品，感谢大家的支持',
      '用音乐记录生活的美好时光',
      '音乐是心灵的语言，希望能传达给每一个人'
    ]
    
    const images = []
    if (work.cover_media_url) {
      images.push(`https://s3.267girl.com/${work.cover_media_url}`)
    }
    // 随机添加一些图片
    const randomImageCount = Math.floor(Math.random() * 3)
    for (let i = 0; i < randomImageCount; i++) {
      images.push(`https://picsum.photos/300/200?random=${work.id}_moment_${i}`)
    }
    
    moments.push({
      id: work.id,
      content: randomTexts[index % randomTexts.length],
      images,
      createdAt: new Date(work.create_time || Date.now()),
      likeCount: work.like || 0,
      commentCount: Math.floor(Math.random() * 20)
    })
  })
  
  // 如果没有作品，生成一些默认动态
  if (moments.length === 0) {
    const defaultMoments = [
      {
        id: 1,
        content: '今天天气真好，出去走走～',
        images: [`https://picsum.photos/300/200?random=${userId}_default_1`],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likeCount: Math.floor(Math.random() * 50),
        commentCount: Math.floor(Math.random() * 10)
      },
      {
        id: 2,
        content: '分享一下今天的美食',
        images: [],
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        likeCount: Math.floor(Math.random() * 30),
        commentCount: Math.floor(Math.random() * 5)
      }
    ]
    moments.push(...defaultMoments)
  }
  
  return moments.slice(0, 10) // 最多显示10条动态
}

// 辅助函数：生成随机状态
function getRandomStatus() {
  const statuses = [
    '在线',
    '忙碌中...',
    '正在学习',
    '听音乐中',
    '创作中',
    '正在工作',
    '休息中'
  ]
  return statuses[Math.floor(Math.random() * statuses.length)]
}