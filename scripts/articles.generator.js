const fs     = require('fs');
const path   = require('path');
const fm     = require('front-matter');
const hl     = require('highlight.js');
const marked = require('marked');

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ROOT = path.join(__dirname, '..', 'src');
const DATA = path.join(__dirname, '..', 'data');

marked.setOptions({
  langPrefix:'hljs ',
  highlight: (code, lang) => {
    return hl.highlight(lang, code).value;
  }
});

const articles = fs
  .readdirSync(path.join(DATA, 'posts'))
  .filter(fileName => fileName.slice(-3) === '.md')
  .map((fileName) => {
    return {
      fileName,
      body: fs.readFileSync(path.join(DATA, 'posts', fileName)).toString()
    };
  })
  .map((article) => {
    const date          = new Date(article.fileName.slice(0, 10));
    const parsedArticle = fm(article.body);
    const body          = marked(parsedArticle.body);

    const month = MONTHS[date.getMonth()];

    return {
      body      : body,
      title     : parsedArticle.attributes.title,
      categories: parsedArticle.attributes.categories,
      date      : `${month} ${date.getDate()}, ${date.getFullYear()}`,
      fullDate  : date,
      excerpt   : body.split('\n').shift(),
      // Thanks to https://github.com/RadLikeWhoa/Countable
      words     : body.trim().replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g).length
    };
  })
  .sort((a, b) => (b.fullDate - a.fullDate));

fs.writeFile(path.join(ROOT, 'articles.json'), JSON.stringify(articles));
