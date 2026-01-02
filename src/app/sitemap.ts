import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omodigital.com';
  const currentDate = new Date();
  
  // Define your main pages
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/contact',
    '/careers'
  ];

  // Define languages
  const languages = ['', '/ua', '/ru'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each route and language combination
  routes.forEach(route => {
    languages.forEach(lang => {
      sitemapEntries.push({
        url: `${baseUrl}${lang}${route}`,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'daily' : route === '/blog' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/services' ? 0.9 : 0.8,
      });
    });
  });

  // Add blog posts (you can fetch these from your CMS/database)
  const blogPosts = [
    { slug: '/blog/digital-transformation-2024', date: '2024-01-15' },
    { slug: '/blog/ai-trends-2024', date: '2024-01-10' },
    // Add more blog posts as needed
  ];

  blogPosts.forEach(post => {
    languages.forEach(lang => {
      sitemapEntries.push({
        url: `${baseUrl}${lang}${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}