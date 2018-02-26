import * as React from 'react';
import { ReactElement } from 'react';
import {
  IPost,
  IPostsRollupPage,
  IRenderer,
  IRenderedPage,
  Renderers,
  SiteGenerator } from 'staticr-site';

import { IntroBarOrientation } from '../components/intro-bar';
import { Page } from '../components/page';

const BREAK_TAG = '[break]';
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
      const path = `archives/${postsPage.pageNum}`;

      // Create a deep copy of the posts array so we can honor the [break]
      // tag without mutating data down the line
      const postsCopy: Array<IPost> = postsPage.posts.map(post => Object.create(post));
      postsCopy.forEach(post => {
        // TODO - Think of a cleaner way to do this...
        if (post.html.indexOf(BREAK_TAG) > -1) {
          post.html = `${post.html.split(BREAK_TAG)[0]}\n\n<p><a href="${siteGenerator.generateUrl(`entry/${post.attributes.slug}`)}">Continue Reading</a></p>`;
        }
      });

      pages.push({
        title: `Archives - Page ${postsPage.pageNum}`,
        path,
        pageComponent: (
          <Page
            posts={postsCopy}
            siteGenerator={siteGenerator}
            previousPage={postsPage.previousPage}
            nextPage={postsPage.nextPage}
            introBarOrientation={IntroBarOrientation.Horizontal}
            classNamespace="rollup-page" />
        )
      });
    });

    return Promise.resolve(pages);
  }
};