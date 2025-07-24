import { client } from '../../../sanity/client';

export async function GET() {
  const baseUrl = 'https://www.dadamediadesign.com';

  // Rutas estáticas principales
  const staticPages = [
    '',
    'blog',
    'portfolio',
    'services',
    'contact',
    // Agrega más rutas si es necesario
  ];

  // Consulta a Sanity para obtener los slugs de los posts publicados
  let postSlugs = [];
  try {
    postSlugs = await client.fetch(
      `*[_type == "post" && defined(slug.current)]{ 'slug': slug.current }`
    );
  } catch (e) {
    // Si falla la consulta, deja la lista vacía
    postSlugs = [];
  }

  // Genera las URLs de los posts
  const blogPages = postSlugs.map(
    (post) => `<url><loc>${baseUrl}/blog/${post.slug}</loc></url>`
  );

  const pages = staticPages
    .map((page) => `<url><loc>${baseUrl}/${page}</loc></url>`)
    .concat(blogPages)
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages}
    </urlset>
  `;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 