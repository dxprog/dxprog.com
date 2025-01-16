import * as React from 'react';
import { IPost, SiteGenerator } from 'staticr-site';

import { Post } from './Post';

export type PostsRollupProps = {
  posts: IPost[];
  siteGenerator: SiteGenerator;
  previousPage?: number;
  nextPage?: number;
}

export const PostsRollup = ({ posts, siteGenerator, previousPage, nextPage }: PostsRollupProps) => {
  let previousLink;
  if (previousPage) {
    previousLink = (
      <a href={siteGenerator.generateUrl(`archives/${previousPage}`)} className="paging__link paging__link--previous">
        Newer Posts
      </a>
    );
  }

  let nextLink;
  if (nextPage) {
    nextLink = (
      <a href={siteGenerator.generateUrl(`archives/${nextPage}`)} className="paging__link paging__link--next">
        Older Posts
      </a>
    );
  }

  return (
    <section className="article-list">
      {posts.map((post: IPost, idx: number) =>
        <Post post={post} siteGenerator={siteGenerator} key={`post-${idx}`} />
      )}
      <div className="paging">
        {nextLink}
        {previousLink}
      </div>
    </section>
  );
}
