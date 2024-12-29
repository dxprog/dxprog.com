import * as React from 'react';

export const Footer = (): React.ReactNode => (
  <footer className="footer">
    <p className="footer__copyright">Copyright &copy; {(new Date()).getFullYear()} Matt Hackmann</p>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-280226-1"></script>
    <script src="//dxprog.com/static/js/dxprog.js"></script>
  </footer>
);
