import * as React from 'react';
import { ReactElement } from 'react';
import {
  IPost,
  IPostsRollupPage,
  IRenderer,
  IRenderedPage,
  Renderers,
  SiteGenerator } from 'staticr-site';

import { Page } from '../components/page';

const POSTS_PER_PAGE = 5;
const { PostsRollupRenderer } = Renderers;

/**
 * Renders individual posts pages
 */
export const RollupPageRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    const rollupRender = new PostsRollupRenderer(5);

    const pages: Array<IRenderedPage> = [];
    rollupRender.iteratePostPages(posts, (postsPage: IPostsRollupPage) => {
      pages.push({
        title: `Archives - Page ${postsPage.pageNum}`,
        path: `archives/${postsPage.pageNum}`,
        pageComponent: (
          <Page
            posts={postsPage.posts}
            siteGenerator={siteGenerator}
            previousPage={postsPage.previousPage}
            nextPage={postsPage.nextPage}
            classNamespace="rollup-page" />
        )
      });
    });

    return Promise.resolve(pages);
  }
};