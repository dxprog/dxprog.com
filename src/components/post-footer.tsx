import * as React from 'react';
import { IPost, SiteGenerator, IPostsRollupPage } from 'staticr-site';

export const PostFooter = (
  { posts, siteGenerator }: { posts: IPostsRollupPage, siteGenerator: SiteGenerator }
) => {
  const { sortedPosts, sortedPostIndex } = posts;
  const previousPost = posts.previousPage !== null ? sortedPosts[sortedPostIndex - 1] : null;
  const nextPost = posts.nextPage !== null ? sortedPosts[sortedPostIndex + 1] : null;
  return (
    <aside className="post__foot">
      {previousPost && (
        <a
          className="foot-nav foot-nav--prev"
          title={previousPost.attributes.title}
          href={siteGenerator.generateUrl(`/entry/${previousPost.attributes.slug}`)}
        >
          {previousPost.attributes.title}
        </a>
      )}
      {nextPost && (
        <a
          className="foot-nav foot-nav--next"
          title={nextPost.attributes.title}
          href={siteGenerator.generateUrl(`/entry/${nextPost.attributes.slug}`)}
        >
          {nextPost.attributes.title}
        </a>
      )}
    </aside>
  );
};
