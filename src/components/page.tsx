import {
  Components,
  IPost,
  SiteGenerator
} from 'staticr-site';
import * as React from 'react';

import { Footer } from './footer';
import {
  IntroBar,
  IntroBarVariant
} from './intro-bar';

const { PostsRollup } = Components;

export interface IPageProps {
  posts: Array<IPost>;
  siteGenerator: SiteGenerator;
  classNamespace: string;
  previousPage?: number;
  nextPage?: number;
  introBarVariant: IntroBarVariant;
}

export const Page = ({
  posts, siteGenerator, classNamespace, previousPage, nextPage, introBarVariant
}: IPageProps): React.ReactNode => (
  <section className={classNamespace}>
    <IntroBar siteGenerator={siteGenerator} variant={introBarVariant} />
    <PostsRollup
      posts={posts}
      siteGenerator={siteGenerator}
      previousPage={previousPage}
      nextPage={nextPage} />
    <Footer />
  </section>
);
