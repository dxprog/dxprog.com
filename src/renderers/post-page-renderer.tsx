import * as React from 'react';
import { ReactElement } from 'react';
import {
  IPost,
  IRenderer,
  IRenderedPage,
  Components,
  SiteGenerator,
  Renderers,
} from 'staticr-site';

import { Footer } from '../components/footer';
import {
  IntroBar,
  IntroBarVariant } from '../components/intro-bar';
import { PostFooter } from '../components/post-footer';

const { PostsRollupRenderer } = Renderers;
const { Post } = Components;

/**
 * Renders individual posts pages
 */
export const PostPageRenderer: IRenderer = {
  async renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    // Use the rollup renderer to sort the posts by date but render one at a time
    const rollupRenderer = new PostsRollupRenderer(1);
    const pages: Array<IRenderedPage> = [];

    rollupRenderer.iteratePostPages(posts, postsPage => {
      const [ post ] = postsPage.posts;

      // Create a copy so we can remove any break tag in the post
      const postCopy = Object.create(post);
      postCopy.html = postCopy.html.replace('[break]', '');

      pages.push({
        title: post.attributes.title,
        path: `entry/${post.attributes.slug}`,
        headComponents: (
          <>
            <link rel="canonical" href={siteGenerator.generateUrl(`entry/${post.attributes.slug}`)} />
            <meta name="og:title" content={post.attributes.title} />
          </>
        ),
        pageComponent: (
          <section className="post-page">
            <IntroBar siteGenerator={siteGenerator} variant={IntroBarVariant.Small} />
            <Post post={postCopy} siteGenerator={siteGenerator} />
            <PostFooter posts={postsPage} siteGenerator={siteGenerator} />
            <Footer />
          </section>
        ),
      });
    });

    return pages;
  }
};
