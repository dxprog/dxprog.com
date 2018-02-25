import {
  Components,
  IPost,
  SiteGenerator } from 'staticr-site';
import * as React from 'react';
import { ReactNode } from 'react';

import { Footer } from './footer';
import { IntroBar } from './intro-bar';

const { PostsRollup } = Components;

export interface IHomePageProps {
  posts: Array<IPost>;
  siteGenerator: SiteGenerator;
}

export class HomePage extends React.Component<IHomePageProps, undefined> {
  public props: IHomePageProps;

  render(): ReactNode {
    return (
      <section className="home-page">
        <IntroBar siteGenerator={this.props.siteGenerator} />
        <PostsRollup posts={this.props.posts.slice(0, 5)} siteGenerator={this.props.siteGenerator} nextPage={2} />
        <Footer />
      </section>
    );
  }
}