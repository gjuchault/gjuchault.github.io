const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const hl = require('highlight.js');
const marked = require('marked');
const slugify = require('slugify')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const output = path.join(__dirname, '..', 'src', 'posts.json');
const postsPath = path.join(__dirname, '..', 'data', 'posts');

marked.setOptions({
  langPrefix:'hljs ',
  highlight: (code, lang) => {
    return hl.highlight(lang, code).value;
  }
});

const posts = fs
  .readdirSync(path.join(postsPath))
  .filter(fileName => fileName.slice(-3) === '.md')
  .map((fileName) => {
    return {
      fileName,
      body: fs.readFileSync(path.join(postsPath, fileName)).toString()
    };
  })
  .map((post) => {
    const date          = new Date(post.fileName.slice(0, 10));
    const parsedPost = fm(post.body);
    const body          = marked(parsedPost.body);

    const month = MONTHS[date.getMonth()];

    return {
      body    : body,
      title   : parsedPost.attributes.title,
      date    : `${month} ${date.getDate()}, ${date.getFullYear()}`,
      fullDate: date,
      excerpt : body.split('\n').shift(),
      slug    : slugify(parsedPost.attributes.title).toLowerCase()
    };
  })
  .sort((a, b) => (b.fullDate - a.fullDate));

fs.writeFileSync(output, JSON.stringify(posts, null, 2));
