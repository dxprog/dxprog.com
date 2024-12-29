import * as React from 'react';

type SocialLinkProps = {
  classModifier: string;
  href: string;
  children: React.ReactNode;
};

export const SocialLink = ({ classModifier, href, children }: SocialLinkProps): React.ReactNode => (
  <li className="social-links__item">
    <a
      className={`social-links__link social-links__link--${classModifier}`}
      target="_blank"
      rel="noreferrer"
      href={href}
    >
      {children}
    </a>
  </li>
);
