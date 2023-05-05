import { ISbStoriesParams, StoryblokClient } from '@storyblok/react'

interface StoryComponent {
  [key: string]: string | any | StoryComponent
}

export const resolveRelationsDeep = async(
  apiClient: StoryblokClient, 
  data: StoryComponent, 
  uuidArrays: string[], 
  params?: ISbStoriesParams, 
  loadDataForUUIDCallback?: (uuid: string, params?: ISbStoriesParams) => StoryComponent) => {
  for (const uuidArray of uuidArrays) {
    const [component, field] = uuidArray.split('.')
    const components: StoryComponent[] = searchStorys(component, data)

    for (const componentData of components) {
      const value = componentData[field]
      if (Array.isArray(value)) {
        // Replace UUID array with parsed object array
        componentData[field] = await Promise.all(value.map(async (uuid) => {
          return await loadDataForUUID(apiClient, uuid)
        }))
      } else if (typeof value === 'string') {
        componentData[field] = await loadDataForUUID(apiClient, value, params, loadDataForUUIDCallback)
      } else if (typeof value === 'object') {
        // Recursively search for UUIDs in child components
        resolveRelationsDeep(apiClient, value as StoryComponent, uuidArrays)
      }
    }
  }

  return data
}

const searchStorys = (componentName: string, data?: StoryComponent): StoryComponent[] => {
  const components: StoryComponent[] = []
  data = data ?? {}
  if (data.component === componentName) {
    components.push(data)
  }
  Object.values(data).forEach(value => {
    if (typeof value === 'object') {
      components.push(...searchStorys(componentName, value as StoryComponent))
    }
  })
  return components
}

const loadDataForUUID = async (apiClient: StoryblokClient, uuid: string, params?: ISbStoriesParams, callback?: (uuid: string, params?: ISbStoriesParams) => StoryComponent) => {
  if(callback){
    return callback(uuid, params)
  }
  
  const { data } = await apiClient.get('cdn/stories', {
    ...params,
    ...{
      by_uuids: uuid,
    }
  })

  return data.stories.at(0) ?? uuid
}
