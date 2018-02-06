import staticr from 'staticr-site';
import * as path from 'path';

const { PageGenerator } = staticr;


const pg = new PageGenerator({
  outputDir: path.join(process.cwd(), 'docs/')
});

pg.build().then(result => {

});