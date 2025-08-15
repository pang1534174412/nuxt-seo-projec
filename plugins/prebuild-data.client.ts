/**
 * Client-side plugin to inject pre-built static data
 * This data is generated at build time to avoid API calls during SSG
 */

export interface UserData {
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

export interface PrebuiltData {
  users: UserData[]
  userDetails: Record<string, UserData>
}

// Static data that will be replaced during build process
const PREBUILT_DATA: PrebuiltData = {
  users: [
    {
      id: '1',
      name: '小美',
      avatar: 'https://s3.267girl.com/avatars/1.jpg',
      status: 'online',
      age: 25,
      location: '北京',
      bio: '喜欢音乐和旅行'
    },
    {
      id: '2', 
      name: '小雅',
      avatar: 'https://s3.267girl.com/avatars/2.jpg',
      status: 'offline',
      age: 23,
      location: '上海',
      bio: '爱好摄影和美食'
    },
    {
      id: '3',
      name: '小琪',
      avatar: 'https://s3.267girl.com/avatars/3.jpg',
      status: 'online',
      age: 27,
      location: '深圳',
      bio: '健身达人'
    }
  ],
  userDetails: {}
}

export default defineNuxtPlugin(() => {
  // Provide global access to prebuilt data
  return {
    provide: {
      prebuiltData: PREBUILT_DATA
    }
  }
})