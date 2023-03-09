import { getStoryblokApi, ISbStoriesParams } from '@storyblok/react'

interface Component {
  [key: string]: string | any | Component
}

export const resolveRelationsDeep = async(data: Component, uuidArrays: string[], params?: ISbStoriesParams) => {
  for (const uuidArray of uuidArrays) {
    const [component, field] = uuidArray.split('.')
    const components: Component[] = searchComponents(component, data)

    for (const componentData of components) {
      const value = componentData[field]
      if (Array.isArray(value)) {
        // Replace UUID array with parsed object array
        componentData[field] = await Promise.all(value.map(async (uuid) => {
          return await loadDataForUUID(uuid)
        }))
      } else if (typeof value === 'string') {
        componentData[field] = await loadDataForUUID(value)
      } else if (typeof value === 'object') {
        // Recursively search for UUIDs in child components
        resolveRelationsDeep(value as Component, uuidArrays)
      }
    }
  }

  return data
}

const searchComponents = (componentName: string, data?: Component): Component[] => {
  const components: Component[] = []
  data = data ?? {}
  if (data.component === componentName) {
    components.push(data)
  }
  Object.values(data).forEach(value => {
    if (typeof value === 'object') {
      components.push(...searchComponents(componentName, value as Component))
    }
  })
  return components
}

// TODO: make configurable
const loadDataForUUID = async (uuid: string, params?: ISbStoriesParams) => {
  const storyblokApi = getStoryblokApi()

  const { data } = await storyblokApi.get('cdn/stories', {
    ...params,
    ...{
      by_uuids: uuid,
    }
  })

  if(data.stories.length > 0){
    return data.stories[0]
  }

  return uuid
}
