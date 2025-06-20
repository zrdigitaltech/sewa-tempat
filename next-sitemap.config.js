const { getProperti } = require('./src/lib/metaData/properti');
const { getPanduan } = require('./src/lib/metaData/panduan');

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://sewatempat.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,

  additionalPaths: async () => {
    const slugProperti = await getProperti();
    const slugsPanduan = await getPanduan();

    const propertiPaths = slugProperti.map((slug) => ({
      loc: `/properti/${slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }));

    const panduanPaths = slugsPanduan.map((slug) => ({
      loc: `/panduan/${slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }));

    return [...propertiPaths, ...panduanPaths];
  }
};

module.exports = config;
