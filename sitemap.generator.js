const fs     = require('fs');
const path   = require('path');
const slug   = require('slug');
const fm     = require('front-matter');
const marked = require('marked');
const sm     = require('sitemap');

const DAY = 60 * 60 * 24 * 1000;

const indexImages = require('./data/projects.json')
  .map(project => {
    return { url: project.picture, caption: project.title };
  });

const articles = fs
  .readdirSync(path.join(__dirname, 'data', 'posts'))
  .filter(f => f !== '.gitkeep')
  .map(f => fs.readFileSync(path.join(__dirname, 'data', 'posts', f)).toString())
  .map(f => fm(f))
  .map(article => {
    const img = /!\[(.+)\]\((.+)\)/g;

    const imgs = [];

    let match = null;
    do {
      match = img.exec(article.body);

      if (match) {
        imgs.push({ url: match[2], caption: match[1] });
      }
    } while (match != null);

    const articleSlug = slug(article.attributes.title, { lower: true });

    return {
      url: `/articles/${articleSlug}`,
      changefreq: 'never',
      img: imgs
    };
  });

const articlesLinks = articles.map(article => {
  return {
    url : article.url,
    lang: 'en'
  };
});

const projectsLinks = require('./data/projects.json')
  .map(project => {
    return { url: project.repo, lang: 'en' };
  });

const sitemap = sm.createSitemap({
    hostname: 'http://gjuchault.com',
    cacheTime: 15 * DAY,
    urls: [
        {
          url: '/',
          changefreq: 'monthly',
          priority: 0.5,
          img: indexImages
        },
        {
          url: '/articles',
          changefreq: 'weekly',
          priority: 0.5
        }
    ].concat(articles),
    links: articlesLinks.concat(projectsLinks)
});

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap.toString());
