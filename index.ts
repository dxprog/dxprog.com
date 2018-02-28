import * as bluebird from 'bluebird';
import * as fs from 'fs-extra';
import * as sass from 'node-sass';
import {
  PostsReader,
  SiteGenerator,
  Renderers } from 'staticr-site';
import * as path from 'path';

import { HomePageRenderer } from './src/renderers/home-page-renderer';
import { PostPageRenderer } from './src/renderers/post-page-renderer';
import { RollupPageRenderer } from './src/renderers/rollup-page-renderer';
import { MarkedHighlightConfig } from './src/marked-highlight-config';

const sassRenderAsync = bluebird.promisify(sass.render);
const outputDir = path.join(process.cwd(), 'docs/');
const staticDir = path.join(process.cwd(), 'static');

const pg = new SiteGenerator({
  outputDir,
  renderers: [
    RollupPageRenderer,
    PostPageRenderer,
    HomePageRenderer,
    Renderers.PostRedirectRenderer,
  ],
  baseUrl: 'http://staticr.dxprog.com/',
  markedOptions: MarkedHighlightConfig,
});

pg.writer.addStaticContent('CNAME', path.join(staticDir, 'CNAME'));
pg.writer.addStaticContent('static/images', path.join(staticDir, 'images'));

pg.addReader(new PostsReader(path.resolve('comics/')));
pg.addReader(new PostsReader(path.resolve('art/')));

pg.build()
  .then(() => sassRenderAsync({
    file: path.join(staticDir, 'scss/app.scss'),
    includePaths: [ path.resolve('node_modules/highlight.js/styles') ],
  }))
  .then((cssOut: sass.Result) => {
    return fs.writeFile(path.join(outputDir, 'static/css/index.css'), cssOut.css.toString('utf-8'));
  })
  .then((result: any) => {
    console.log('done');
  });