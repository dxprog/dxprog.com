import * as React from 'react';
import {
  IPost,
  IPostsRollupPage,
  IRenderer,
  IRenderedPage,
  Renderers,
  SiteGenerator,
} from 'staticr-site';

import { handlePostsBreak } from '../handle-posts-break';
import { IntroBarVariant } from '../components/intro-bar';
import { Page } from '../components/page';

const POSTS_PER_PAGE = 5;
const { PostsRollupRenderer } = Renderers;

/**
 * Renders individual posts pages
 */
export const RollupPageRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    const rollupRender = new PostsRollupRenderer(POSTS_PER_PAGE);

    const pages: Array<IRenderedPage> = [];
    rollupRender.iteratePostPages(posts, (postsPage: IPostsRollupPage) => {
      const path = `archives/${postsPage.pageNum}`;

      // Create a deep copy of the posts array so we can honor the [break]
      // tag without mutating data down the line
      const postsCopy: Array<IPost> = handlePostsBreak(postsPage.posts, siteGenerator);

      pages.push({
        title: `Archives - Page ${postsPage.pageNum}`,
        path,
        pageComponent: (
          <Page
            posts={postsCopy}
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
