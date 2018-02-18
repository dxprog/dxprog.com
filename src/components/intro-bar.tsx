import * as React from 'react';
import { ReactNode } from 'react';

export class IntroBar extends React.Component<undefined, undefined> {
  render(): ReactNode {
    return (
      <section className="intro-bar">
        <img src="static/images/me.jpg" alt="Matt Hackmann" className="intro-bar__photo" />
        <h1 className="intro-bar__header">
          <span className="intro-bar__name intro-bar__name--first">Matt</span>
          <span className="intro-bar__name intro-bar__name--last">Hackmann</span>
        </h1>
        <h2 className="intro-bar__subhead">The thoughts and goings-on of some programmer dude.</h2>
        <nav className="intro-bar__social-nav">
          <ul className="social-links">
            <li className="social-link__item">
              <a className="social-links__link social-links__link--rss">RSS Feed</a>
            </li>
            <li className="social-link__item">
              <a className="social-links__link social-links__link--github">GitHub</a>
            </li>
            <li className="social-link__item">
              <a className="social-links__link social-links__link--twitter">Twitter</a>
            </li>
            <li className="social-link__item">
              <a className="social-links__link social-links__link--linkedin">LinkedIn Profile</a>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}