import {
  Components,
  IPost,
  SiteGenerator } from 'staticr-site';
import * as React from 'react';
import { ReactNode } from 'react';

import { Footer } from './footer';
import { IntroBar } from './intro-bar';

const { PostsRollup } = Components;

export interface IPageProps {
  posts: Array<IPost>;
  siteGenerator: SiteGenerator;
  classNamespace: string;
  previousPage?: number;
  nextPage?: number;
}

export class Page extends React.Component<IPageProps, undefined> {
  public props: IPageProps;

  render(): ReactNode {
    return (
      <section className={this.props.classNamespace}>
        <IntroBar siteGenerator={this.props.siteGenerator} />
        <PostsRollup
          posts={this.props.posts}
          siteGenerator={this.props.siteGenerator}
          previousPage={this.props.previousPage}
          nextPage={this.props.nextPage} />
        <Footer />
      </section>
    );
  }
}