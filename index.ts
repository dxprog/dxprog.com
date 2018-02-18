import {
  SiteGenerator,
  Renderers } from 'staticr-site';
import * as path from 'path';

import { DxApiReader } from './src/readers/dxapi-reader';

const { PostsRollupRenderer, PostRenderer } = Renderers;

const pg = new SiteGenerator({
  outputDir: path.join(process.cwd(), 'docs/'),
  renderers: [
    new PostsRollupRenderer(5),
    PostRenderer,
  ]
});

// pg.addReader(DxApiReader);
pg.writer.addStaticContent('static', path.resolve(process.cwd(), 'static'));

pg.build().then((result: any) => {
  console.log('done');
});