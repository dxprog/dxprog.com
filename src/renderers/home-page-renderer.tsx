import * as React from 'react';
import { ReactElement } from 'react';
import {  IPost,
          IRenderer,
          IRenderedPage,
          Renderers,
        SiteGenerator } from 'staticr-site';

import { Page } from '../components/page';

const POSTS_PER_PAGE = 5;

/**
 * Renders individual posts pages
 */
export const HomePageRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    let sortedPosts = [ ...posts ];
    sortedPosts.sort((a: IPost, b: IPost) => {
      return (new Date(a.attributes.date)).getTime() > (new Date(b.attributes.date)).getTime() ? -1 : 1;
    });

    return Promise.resolve([
      {
        title: 'Home',
        path: 'index',
        pageComponent: (
          <Page
            posts={sortedPosts.slice(0, 5)}
            siteGenerator={siteGenerator}
            nextPage={2}
            classNamespace="home-page" />
        )
      }
    ]);
  }
};