import * as React from 'react';
import { SiteGenerator } from 'staticr-site';

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
    <img src={siteGenerator.generateUrl('static/images/me.jpg')} alt="Matt Hackmann" className="intro-bar__photo" />
    <h1 className="intro-bar__header">
      <a href={siteGenerator.generateUrl('')} title="Back to home" className="intro-bar__home-link">
        <span className="intro-bar__name intro-bar__name--first">Matt</span>
        <span className="intro-bar__name intro-bar__name--last">Hackmann</span>
      </a>
    </h1>
    <h2 className="intro-bar__subhead">The thoughts and goings-on of some programmer dude.</h2>
    <nav className="intro-bar__social-nav">
      <ul className="social-links">
        <li className="social-links__item">
          <a className="social-links__link social-links__link--rss" target="_blank" href="http://feeds.feedburner.com/dxprog">RSS Feed</a>
        </li>
        <li className="social-links__item">
          <a className="social-links__link social-links__link--github" target="_blank" href="https://github.com/dxprog">GitHub</a>
        </li>
        <li className="social-links__item">
          <a className="social-links__link social-links__link--linkedin" target="_blank" href="https://www.linkedin.com/in/mhackmann">LinkedIn Profile</a>
        </li>
      </ul>
    </nav>
  </section>
);
