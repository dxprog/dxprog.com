import * as React from 'react';
import {
  IPost,
  IRenderer,
  IRenderedPage,
  SiteGenerator,
} from 'staticr-site';

import { handlePostsBreak } from '../handle-posts-break';
import { IntroBarVariant } from '../components/intro-bar';
import { Page } from '../components/page';

const POSTS_PER_PAGE = 5;

/**
 * Renders individual posts pages
 */
export const HomePageRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    const sortedPosts = [ ...posts ];
    sortedPosts.sort((a: IPost, b: IPost) => {
      return (new Date(a.attributes.date)).getTime() > (new Date(b.attributes.date)).getTime() ? -1 : 1;
    });

    const postsCopy: Array<IPost> = handlePostsBreak(sortedPosts.slice(0, POSTS_PER_PAGE), siteGenerator);

    return Promise.resolve([
      {
        title: 'Home',
        path: 'index',
        pageComponent: (
          <Page
            posts={postsCopy}
            siteGenerator={siteGenerator}
            nextPage={2}
            variant={IntroBarVariant.Full}
            classNamespace="home-page" />
        )
      }
    ]);
  }
};
