import { SiteGenerator } from 'staticr-site';
import * as path from 'path';

import { DxApiReader } from './src/readers/dxapi-reader';

const pg = new SiteGenerator({
  outputDir: path.join(process.cwd(), 'docs/')
});

// pg.addReader(DxApiReader);
pg.writer.addStaticContent('static', path.resolve(process.cwd(), 'static'));

pg.build().then((result: any) => {
  console.log('done');
});