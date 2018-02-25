import { IPost, IContentReader } from 'staticr-site';
import * as rp from 'request-promise';
import * as marked from 'marked';
import * as fs from 'fs';
import * as moment from 'moment-timezone';

const DXCODE_TO_MARKDOWN = [
  [ /\[b\]([^\[]+)\[\/b\]/ig, '**$1**' ],
  [ /\[i\]([^\[]+)\[\/i\]/ig, '_$1_' ],
  [ /\[head\]([^\[]+)\[\/head\]/ig, '## $1' ],
  [ /\[header\]([^\[]+)\[\/header\]/ig, '## $1' ],
  [ /\[img=([^\]]+)\]([^\[]+)\[\/img\]/ig, '![]($1 "$2")' ],
  [ /\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '[$2]($1)' ],
  [ /\[youtube=([^\/]+)\]([^\[]+)\[\/youtube\]/g, '[![youtube video](https://img.youtube.com/vi/$1/0.jpg)](https://www.youtube.com/watch?v=$1)' ],
  [ /\[youtube=([^\/]+)\]\s/g, '[![youtube video](https://img.youtube.com/vi/$1/0.jpg)](https://www.youtube.com/watch?v=$1)' ],
  [ /\[code=([^\]]+)\]([^\[]+)\[\/code\]/ig, '```$1\n$2\n```' ],
];

function convertDxApiPostToMarkdown(post: any): IPost {
  const html = DXCODE_TO_MARKDOWN.reduce((html: string, [ match, replace ]: [ RegExp, string ]) => {
    return html.replace(match, replace);
  }, post.body);

  const date = moment.tz(post.date * 1000, 'America/Chicago').format();

  fs.writeFileSync(`${process.cwd()}/posts/${post.perma}.md`,
`---
title: "${post.title.replace(/"/g, '\\"')}"
slug: ${post.perma}
date: ${date}
tags:
${post.tags.map(tag => `- ${tag.name}`).join('\n')}
---
${html}
`
  );

  return {
    attributes: {
      title: post.title,
      slug: post.perma,
      date
    },
    body: post.body,
    html: html
  };
}

export const DxApiReader: IContentReader = {
  read(): Promise<Array<IPost>> {
    return rp('https://api.dxprog.com/?method=content.getContent&contentType=blog&type=json&max=1000')
      .then((body: string) => {
        let apiData: any;
        try {
          apiData = JSON.parse(body);
        } catch (exc) {}

        let retVal = [];
        if (apiData) {
          retVal = apiData.body.content.map(convertDxApiPostToMarkdown);
        }

        return retVal;
      });
  }
};