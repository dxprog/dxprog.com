import * as React from 'react';
import { SiteGenerator } from 'staticr-site';

import { SocialLinks } from './SocialLinks';

export enum IntroBarVariant {
  Small = 'small',
  Full = 'full',
}

type IntroBarProps = {
  siteGenerator: SiteGenerator;
  variant?: IntroBarVariant;
}

export const IntroBar = (
  { siteGenerator, variant = IntroBarVariant.Full }: IntroBarProps
): React.ReactNode => (
  <section className={`intro-bar intro-bar--${variant}`}>
    <img src={siteGenerator.generateUrl('static/images/me-2025.jpg')} alt="Matt Hackmann" className="intro-bar__photo" />
    <h1 className="intro-bar__header">
      <a href={siteGenerator.generateUrl('')} title="Back to home" className="intro-bar__home-link">
        <span className="intro-bar__name intro-bar__name--first">Matt</span>
        <span className="intro-bar__name intro-bar__name--last">Hackmann</span>
      </a>
    </h1>
    <h2 className="intro-bar__subhead">The thoughts and goings-on of some programmer dad.</h2>
    <nav className="intro-bar__social-nav">
      <SocialLinks />
    </nav>
  </section>
);
