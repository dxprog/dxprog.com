import * as moment from 'moment-timezone';
import * as React from 'react';
import { IPost, SiteGenerator } from 'staticr-site';

type PostProps = {
  post: IPost;
  siteGenerator: SiteGenerator;
}

export const Post = ({ post, siteGenerator }: PostProps) => {
  const path = `entry/${post.attributes.slug}`;

  return (
    <article className="post">
      <header className="post__header">
        <h1 className="post__title">
          <a href={siteGenerator.generateUrl(path)}>
            {post.attributes.title}
          </a>
        </h1>
        <time className="post__published">
          {moment(post.attributes.date).format('MMMM D, YYYY')}
        </time>
      </header>
      <div className="post__content" dangerouslySetInnerHTML={{ __html: post.html}} />
    </article>
  );
};
