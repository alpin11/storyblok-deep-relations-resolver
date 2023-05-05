import { ISbStoriesParams, StoryblokClient } from '@storyblok/react';
interface StoryComponent {
    [key: string]: string | any | StoryComponent;
}
export declare const resolveRelationsDeep: (apiClient: StoryblokClient, data: StoryComponent, uuidArrays: string[], params?: ISbStoriesParams, loadDataForUUIDCallback?: (uuid: string, params?: ISbStoriesParams) => StoryComponent) => Promise<StoryComponent>;
export {};
