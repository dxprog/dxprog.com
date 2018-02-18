import { Components, IPost } from 'staticr-site';
import * as React from 'react';
import { ReactNode } from 'react';

import { IntroBar } from './intro-bar';

const { PostsRollup } = Components;

export interface IHomePageProps {
  posts: Array<IPost>
}

export class HomePage extends React.Component<IHomePageProps, undefined> {
  public props: IHomePageProps;

  render(): ReactNode {
    return (
      <section className="main">
        <IntroBar />
        <PostsRollup posts={this.props.posts.slice(0, 5)} />
      </section>
    );
  }
}