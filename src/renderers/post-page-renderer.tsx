import * as React from 'react';
import { ReactElement } from 'react';
import {
  IPost,
  IPostsRollupPage,
  IRenderer,
  IRenderedPage,
  Components,
  SiteGenerator } from 'staticr-site';

import { Footer } from '../components/footer';
import {
  IntroBar,
  IntroBarOrientation } from '../components/intro-bar';

const POSTS_PER_PAGE = 5;
const { Post } = Components;

/**
 * Renders individual posts pages
 */
export const PostPageRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    return Promise.resolve(posts.map((post: IPost) => {
      // Create a copy so we can remove any break tag in the post
      const postCopy = Object.create(post);
      postCopy.html = postCopy.html.replace('[break]', '');

      return {
        title: post.attributes.title,
        path: `entry/${post.attributes.slug}`,
        pageComponent: (
          <section className="post-page">
            <IntroBar siteGenerator={siteGenerator} orientation={IntroBarOrientation.Horizontal} />
            <Post post={postCopy} siteGenerator={siteGenerator} />
            <Footer />
          </section>
        )
      };
    }));
  }
};