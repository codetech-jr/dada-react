// Importaciones necesarias al principio del archivo
// 3. CORREGIDO: La ruta para 'urlFor' ahora es consistente con la de 'client'.
import { client } from '../../sanity/client';
import { urlFor } from '../../sanity/lib/image'; 
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// La función getPosts que definimos arriba
async function getPosts() {
  // 2. AÑADIDO: Pedimos el campo 'mainImage' a Sanity.
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage, 
    "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
  }`;
  const posts = await client.fetch(query);
  return posts;
}

// 1. ELIMINADO: Se quitó la definición duplicada del componente.
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-[#231e64] text-[#ffffff] min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
        
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#03d3b0]">
            Desde Nuestro Escritorio
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-300">
            Explora nuestras últimas publicaciones, ideas y descubrimientos.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link 
              key={post._id} 
              href={`/blog/${post.slug.current}`} 
              className="group block"
            >
              <article 
                className="bg-[#1A1A1A] h-full flex flex-col rounded-xl shadow-lg 
                           overflow-hidden
                           transition-all duration-300 ease-in-out
                           hover:scale-105 hover:shadow-2xl hover:shadow-[#03d3b0]/20"
              >
                {post.mainImage && (
                  <div className="relative w-full h-56">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={`Imagen de portada del post: ${post.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  {post.publishedAt && (
                    <p className="text-sm font-medium text-[#7ed3a5]">
                      {format(new Date(post.publishedAt), 'd MMMM, yyyy', { locale: es })}
                    </p>
                  )}
                  
                  <h2 className="mt-2 text-2xl font-semibold text-white 
                                 group-hover:text-[#ecb44b] transition-colors duration-200">
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p className="mt-3 text-gray-400 flex-grow">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="mt-4 font-bold text-[#03d3b0]">
                    Leer más →
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </main>
        
      </div>
    </div>
  );
}