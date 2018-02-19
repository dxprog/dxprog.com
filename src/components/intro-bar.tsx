import * as React from 'react';
import { ReactNode } from 'react';
import { SiteGenerator } from 'staticr-site';

export class IIntroBarProps {
  siteGenerator: SiteGenerator;
}

export class IntroBar extends React.Component<IIntroBarProps, undefined> {
  public props: IIntroBarProps;

  render(): ReactNode {
    return (
      <section className="intro-bar">
        <img src={this.props.siteGenerator.generateUrl('static/images/me.jpg')} alt="Matt Hackmann" className="intro-bar__photo" />
        <h1 className="intro-bar__header">
          <span className="intro-bar__name intro-bar__name--first">Matt</span>
          <span className="intro-bar__name intro-bar__name--last">Hackmann</span>
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
              <a className="social-links__link social-links__link--twitter" target="_blank" href="https://twitter.com/dxprog">Twitter</a>
            </li>
            <li className="social-links__item">
              <a className="social-links__link social-links__link--linkedin" target="_blank" href="https://www.linkedin.com/in/mhackmann">LinkedIn Profile</a>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}