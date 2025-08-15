/**
 * Build-time data fetcher
 * This script runs during build to fetch real API data and inject it into the plugin
 */

const API_BASE_URL = 'https://amtapi.267girl.com'
const DOMAIN_PREFIX = 'https://s3.267girl.com/'

interface MusicApiResponse {
  code: number
  msg: string
  data: {
    count: number
    list: Array<{
      id: number
      nickname: string
      avatar: string
      age: number
      city: string
      introduction: string
      online: number
      [key: string]: any
    }>
  }
}

async function fetchApiData(endpoint: string, params: Record<string, any> = {}) {
  const url = new URL(endpoint, API_BASE_URL)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value.toString())
    }
  })

  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    return null
  }
}

function addDomainToImage(imagePath: string): string {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return DOMAIN_PREFIX + imagePath.replace(/^\/+/, '')
}

function transformMusicDataToUser(musicItem: any): UserData {
  return {
    id: musicItem.id?.toString() || '',
    name: musicItem.nickname || '匿名用户',
    avatar: addDomainToImage(musicItem.avatar || ''),
    status: musicItem.online === 1 ? 'online' : 'offline',
    age: musicItem.age || undefined,
    location: musicItem.city || undefined,
    bio: musicItem.introduction || undefined,
    photos: musicItem.photos ? musicItem.photos.map((photo: string) => addDomainToImage(photo)) : [],
    stats: {
      followers: musicItem.followers || 0,
      following: musicItem.following || 0,
      likes: musicItem.likes || 0
    }
  }
}

async function fetchUserList(): Promise<UserData[]> {
  console.log('Fetching user list from API...')
  
  const response = await fetchApiData('/music/hall', {
    page: 1,
    pageSize: 50
  }) as MusicApiResponse | null

  if (!response || response.code !== 1 || !response.data?.list) {
    console.warn('Failed to fetch user list, using fallback data')
    return []
  }

  const users = response.data.list.map(transformMusicDataToUser)
  console.log(`Fetched ${users.length} users`)
  return users
}

async function fetchUserDetail(userId: string): Promise<UserData | null> {
  console.log(`Fetching user detail for ID: ${userId}`)
  
  const response = await fetchApiData('/music/detail', {
    id: userId
  }) as MusicApiResponse | null

  if (!response || response.code !== 1 || !response.data) {
    console.warn(`Failed to fetch user detail for ID: ${userId}`)
    return null
  }

  return transformMusicDataToUser(response.data)
}

export async function prebuildData(): Promise<PrebuiltData> {
  console.log('Starting data prebuild process...')
  
  // Fetch user list
  const users = await fetchUserList()
  
  // Fetch details for first few users
  const userDetails: Record<string, UserData> = {}
  const detailPromises = users.slice(0, 10).map(async (user) => {
    const detail = await fetchUserDetail(user.id)
    if (detail) {
      userDetails[user.id] = detail
    }
  })
  
  await Promise.all(detailPromises)
  
  console.log(`Prebuild completed: ${users.length} users, ${Object.keys(userDetails).length} details`)
  
  return {
    users,
    userDetails
  }
}

// Types for compatibility
interface UserData {
  id: string
  name: string
  avatar: string
  status: string
  age?: number
  location?: string
  bio?: string
  photos?: string[]
  moments?: Array<{
    id: string
    content: string
    images?: string[]
    timestamp: string
    likes: number
    comments: number
  }>
  stats?: {
    followers: number
    following: number
    likes: number
  }
}

interface PrebuiltData {
  users: UserData[]
  userDetails: Record<string, UserData>
}

// Export for use in build process
export { UserData, PrebuiltData }