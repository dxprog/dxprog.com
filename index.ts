import { PageGenerator } from 'staticr-site';
import * as path from 'path';

import { DxApiReader } from './src/readers/dxapi-reader';

const pg = new PageGenerator({
  outputDir: path.join(process.cwd(), 'docs/')
});

//pg.addReader(DxApiReader);

pg.build().then((result: any) => {

});