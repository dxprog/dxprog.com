import * as React from 'react';
import { ReactElement } from 'react';
import {
  IPost,
  IPostsRollupPage,
  IRenderer,
  IRenderedPage,
  Renderers,
  SiteGenerator } from 'staticr-site';

import { handlePostsBreak } from '../handle-posts-break';
import { IntroBarVariant } from '../components/intro-bar';
import { Page } from '../components/page';

const POSTS_PER_PAGE = 5;
const { PostsRollupRenderer } = Renderers;

/**
 * Renders individual posts pages
 */
export const ComicsPageRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    const rollupRender = new PostsRollupRenderer(1);

    const pages: Array<IRenderedPage> = [];
    const comics = posts.filter(post => post.attributes.type === 'comic');
    rollupRender.iteratePostPages(comics, (postsPage: IPostsRollupPage) => {
      const path = `comics/${postsPage.pageNum === 1 ? 'index' : postsPage.pageNum}`;
      pages.push({
        title: `Comics - Page ${postsPage.pageNum}`,
        path,
        pageComponent: (
          <Page
            posts={postsPage.posts}
            siteGenerator={siteGenerator}
            previousPage={postsPage.previousPage}
            nextPage={postsPage.nextPage}
            introBarVariant={IntroBarVariant.Small}
            classNamespace="rollup-page" />
        )
      });
    });

    return Promise.resolve(pages);
  }
};
