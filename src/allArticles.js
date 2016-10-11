import fm from 'front-matter';
import marked from 'marked';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const articlesDirectory = require.context('../data/posts', true, /\.md$/);
const articles          = articlesDirectory.keys()
  .map(fileName => {
    return {
      fileName,
      body: articlesDirectory(fileName)
    };
  })
  .map(article => {
    const date          = new Date(article.fileName.slice(2, 12));
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

module.exports = articles;
