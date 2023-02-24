import { ISbStoriesParams } from '@storyblok/react';
interface Component {
    [key: string]: string | any | Component;
}
export declare const resolveRelationsDeep: (data: Component, uuidArrays: string[], params?: ISbStoriesParams) => Promise<Component>;
export {};
