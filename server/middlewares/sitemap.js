/* eslint-disable global-require */
/* eslint no-underscore-dangle: ["error", { "allow": ["__t"] }] */

const Promise = require('bluebird');
const rp = require('request-promise');
const sm = require('sitemap');
const _ = require('lodash');
const logger = require('../logger');
const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
const siteBase = isProd ? 'https://lift.co' : 'https://staging.lift.co';
const apiBase = `${siteBase}/api/v2`;

const sitemap = {
  index: {},
  main: {},
  products: {},
  businesses: {},
  users: {},
  advice: {},
};

_.forEach(_.keys(sitemap), (k) => {
  sitemap[k] = {
    hostname: siteBase,
    cacheTime: 600000,
    urls: [],
  };
  if (k !== 'index') {
    sitemap[k] = sm.createSitemap(sitemap[k]);
  }
});

function makeReq(subPath) {
  return {
    uri: apiBase + subPath,
    json: true,
  };
}

function getDynamicSitemaps() {
  return Promise.props({
    products: rp(makeReq('/products?page=1&per_page=99999')),
    businesses: rp(makeReq('/businesses?page=1&per_page=99999')),
    users: rp(makeReq('/businesses?page=1&per_page=99999')),
    categories: rp(makeReq('/knowledge-base/categories?page=1&per_page=99999')),
    questions: rp(makeReq('/knowledge-base/questions?populate=category&page=1&per_page=99999')),
  }).then((results) => {
    const content = {};
    _.forOwn(results, (v, k) => {
      content[k] = v.hits;
    });
    content.products.forEach((p) => {
      let subPath;
      if (p.__t === 'Strain') {
        subPath = '/strains/';
      } else if (p.__t === 'Oil') {
        subPath = '/oils/';
      } else {
        subPath = '/products/';
      }
      sitemap.products.add({
        url: `${siteBase}${subPath}${p.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
      });
      sitemap.products.add({
        url: `${siteBase}${subPath}${p.slug}/reviews`,
        changefreq: 'weekly',
        priority: 0.6,
      });
      sitemap.products.add({
        url: `${siteBase}${subPath}${p.slug}/comments`,
        changefreq: 'weekly',
        priority: 0.6,
      });
    });
    content.businesses.forEach((b) => {
      let subPath;
      if (b.__t === 'Doctor') {
        subPath = '/doctors/';
      }
      if (b.__t === 'Dispensary') {
        subPath = '/dispensaries/';
      }
      if (b.__t === 'Producer') {
        subPath = '/producers/';
        sitemap.businesses.add({
          url: `${siteBase}${subPath}${b.slug}/products`,
          changefreq: 'weekly',
          priority: 0.7,
        });
      }
      sitemap.businesses.add({
        url: `${siteBase}${subPath}${b.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
      });
      sitemap.businesses.add({
        url: `${siteBase}${subPath}${b.slug}/reviews`,
        changefreq: 'weekly',
        priority: 0.6,
      });
      sitemap.businesses.add({
        url: `${siteBase}${subPath}${b.slug}/comments`,
        changefreq: 'weekly',
        priority: 0.6,
      });
    });
    content.users.forEach((u) => {
      sitemap.users.add({
        url: `${siteBase}/members/${u.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
      });
    });
    content.categories.forEach((c) => {
      sitemap.advice.add({
        url: `${siteBase}/advice/${c.slug}`,
        changefreq: 'daily',
        priority: 1,
      });
    });
    content.questions.forEach((q) => {
      sitemap.advice.add({
        url: `${siteBase}/advice/${q.category.slug}/${q.slug}`,
        changefreq: 'weekly',
        priority: 1,
      });
    });

    return Promise.resolve();
  });
}

function generateSiteIndex() {
  return getDynamicSitemaps().then(() => {
    sitemap.main.urls = sitemap.main.urls.concat([
      {
        url: '/about',
        changefreq: 'weekly',
        priority: 0.5,
      },
      {
        url: '/oils',
        changefreq: 'weekly',
        priority: 0.4,
      },
      {
        url: '/strains',
        changefreq: 'weekly',
        priority: 0.4,
      },
      {
        url: '/products',
        changefreq: 'weekly',
        priority: 0.4,
      },
      {
        url: '/shop',
        changefreq: 'monthly',
        priority: 0.4,
      },
      {
        url: '/find',
        changefreq: 'monthly',
        priority: 0.4,
      },
      {
        url: '/producers',
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        url: '/dispensaries',
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        url: '/doctors',
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        url: '/how-it-works',
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        url: '/rewards',
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        url: '/login',
        changefreq: 'monthly',
        priority: 0.5,
      },
      {
        url: '/register',
        changefreq: 'monthly',
        priority: 0.5,
      },
    ]);

    _.forEach(_.keys(sitemap), (k) => {
      sitemap.index.urls.push(`${siteBase}/sitemap-${k}.xml`);
    });
    sitemap.index = sm.buildSitemapIndex(sitemap.index);
    return Promise.resolve();
  });
}

module.exports = (app) => {
  generateSiteIndex().catch(logger.error);
  _.forEach(_.keys(sitemap), (k) => {
    const route = k === 'index' ? '/sitemap.xml' : `/sitemap-${k}.xml`;
    app.get(route, (req, res) => {
      res.header('Content-Type', 'application/xml');
      if (_.isString(sitemap[k])) {
        res.send(sitemap[k]);
      } else {
        res.send(sitemap[k].toXML());
      }
    });
  });

  return app;
};
