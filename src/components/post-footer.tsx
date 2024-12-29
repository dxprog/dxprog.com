import * as React from 'react';
import { SiteGenerator, IPostsRollupPage } from 'staticr-site';

type PostFooterProps = {
  posts: IPostsRollupPage;
  siteGenerator: SiteGenerator;
};

export const PostFooter = (
  { posts, siteGenerator }: PostFooterProps
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
