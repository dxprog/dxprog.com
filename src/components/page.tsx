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
  introBarOrientation: IntroBarVariant;
}

export const Page = ({
  posts, siteGenerator, classNamespace, previousPage, nextPage, introBarOrientation
}: IPageProps): React.ReactNode => (
  <section className={classNamespace}>
    <IntroBar siteGenerator={siteGenerator} variant={introBarOrientation} />
    <PostsRollup
      posts={posts}
      siteGenerator={siteGenerator}
      previousPage={previousPage}
      nextPage={nextPage} />
    <Footer />
  </section>
);
