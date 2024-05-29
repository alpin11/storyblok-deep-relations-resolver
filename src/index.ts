import type { ISbStoriesParams, StoryblokClient } from '@storyblok/react/rsc'
import type { ISbCustomFetch } from 'storyblok-js-client'

interface StoryComponent {
  [key: string]: string | any | StoryComponent
}

export const resolveRelationsDeep = async (
  apiClient: StoryblokClient,
  data: StoryComponent,
  uuidArrays: string[],
  params?: ISbStoriesParams,
  fetchOptions?: ISbCustomFetch,
  loadDataForUUIDCallback?: (uuid: string, params?: ISbStoriesParams) => StoryComponent) => {
  for (const uuidArray of uuidArrays) {
    const [component, field] = uuidArray.split('.')
    const components: StoryComponent[] = searchStorys(component, data)

    for (const componentData of components) {
      const value = componentData[field]
      if (Array.isArray(value)) {
        // Replace UUID array with parsed object array
        componentData[field] = await Promise.all(value.map(async (uuid: string) => {
          return await loadDataForUUID(apiClient, uuid, params, fetchOptions)
        }))
      } else if (typeof value === 'string') {
        componentData[field] = await loadDataForUUID(apiClient, value, params, fetchOptions, loadDataForUUIDCallback)
      } else if (typeof value === 'object') {
        // Recursively search for UUIDs in child components
        await resolveRelationsDeep(apiClient, value as StoryComponent, uuidArrays)
      }
    }
  }

  return data
}

const searchStorys = (componentName: string, data?: StoryComponent): StoryComponent[] => {
  const components: StoryComponent[] = []
  if (!data) {
    return []
  }
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

const loadDataForUUID = async (apiClient: StoryblokClient, uuid: string, params?: ISbStoriesParams, fetchOptions?: ISbCustomFetch, callback?: (uuid: string, params?: ISbStoriesParams) => StoryComponent) => {
  if (callback !== undefined) {
    return callback(uuid, params)
  }

  const { data } = await apiClient.get('cdn/stories', {
    ...params,
    ...{
      by_uuids: uuid,
    },
  }, fetchOptions)

  return data.stories.at(0) ?? uuid
}
