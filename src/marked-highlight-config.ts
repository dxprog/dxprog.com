import * as hljs from 'highlight.js';

// A map of supported highlighted languages and
// what highligter.js language to map them to
const LANGUAGE_MAP: object = {
  actionscript: 'actionscript',
  arduino: 'arduino',
  bash: 'bash',
  'c#': 'cs',
  'c++': 'cpp',
  css: 'css',
  html: 'html',
  javascript: 'javascript',
  js: 'javascript',
  json: 'json',
  nginx: 'nginx',
  php: 'php',
  sass: 'sass',
};

export const MarkedHighlightConfig: object = {
  highlight: (code: string, lang: String) => {
    let retVal = code;
    const desiredLang = lang ? lang.toLowerCase() : null;
    if (LANGUAGE_MAP[desiredLang]) {
      const result: hljs.IHighlightResult = hljs.highlight(LANGUAGE_MAP[desiredLang], code);
      retVal = result.value;
    }
    return retVal;
  }
};