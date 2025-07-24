// --- IMPORTACIONES ---
import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../../sanity/client';
import { urlFor } from '../../../sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';


// --- OBTENCIÓN DE DATOS Y METADATOS ---
async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage,
    publishedAt,
    metaDescription
  }`;
  const post = await client.fetch(query, { slug });
  return post;
}

export async function generateMetadata({ params }) {
  // ... (Esta función no cambia, la dejamos como está)
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post No Encontrado' };
  return {
    title: `${post.title} | Tu Nombre o Nombre del Blog`,
    description: post.metaDescription || 'Un post fascinante de nuestro blog.',
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://tu-dominio.com/blog/${params.slug}`,
      siteName: 'Tu Nombre o Nombre del Blog',
      images: [{ url: urlFor(post.mainImage).width(1200).height(630).url(), width: 1200, height: 630 }],
      locale: 'es_ES',
      type: 'article',
    },
  };
}


// --- COMPONENTES PERSONALIZADOS PARA PORTABLETEXT ---
const ptComponents = {
  types: {
    // Renderizado para imágenes dentro del cuerpo del post
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <Image
          src={urlFor(value).url()}
          width={800}
          height={600}
          alt={value.alt || 'Imagen del post'}
          className="my-8 rounded-lg"
          loading="lazy"
        />
      );
    },
    // Renderizado para bloques de código
    code: ({ value }) => {
      const { code, language, filename } = value;
      if (!code) return null;
      return (
        <div className="my-8 rounded-md overflow-hidden bg-[#282c34]">
          {filename && (
            <div className="text-xs text-gray-300 px-4 py-2 bg-[#21252b] border-b border-gray-600">
              {filename}
            </div>
          )}
          <SyntaxHighlighter 
            language={language || 'text'} 
            style={atomOneDark}
            customStyle={{ padding: '1.25rem', margin: 0 }}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
  },
  marks: {
    // Renderizado para enlaces
    link: ({ children, value }) => (
      <a href={value.href} rel="noreferrer noopener" className="text-[#ecb44b] hover:underline transition-colors">
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-4 text-[#03d3b0]">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-[#03d3b0]">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#7ed3a5] pl-4 my-6 text-gray-300 italic">
        {children}
      </blockquote>
    ),
  },
};


// --> NUEVO: Función para calcular el tiempo de lectura
function calculateReadingTime(body) {
  if (!body) return 0;

  const WPM = 200; // Palabras por minuto
  
  // 1. Extraemos solo el texto de los bloques de Portable Text
  const plainText = body
    .filter(block => block._type === 'block')
    .map(block => block.children.map(child => child.text).join(''))
    .join(' ');

  // 2. Contamos las palabras
  const wordCount = plainText.split(/\s+/).length;

  // 3. Calculamos y redondeamos hacia arriba
  const time = Math.ceil(wordCount / WPM);
  return time;
}


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  
  // --> NUEVO: Llamamos a nuestra función de cálculo
  const readingTime = calculateReadingTime(post?.body);

  if (!post) {
    return <div>Post no encontrado.</div>;
  }

  return (
    <div className="bg-[#231e64] min-h-screen">
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <article>
          {/* Encabezado del Artículo */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#03d3b0] mb-4">
              {post.title}
            </h1>
            
            {/* --> NUEVO: Contenedor para la fecha y el tiempo de lectura */}
            <div className="flex items-center justify-center space-x-4 text-lg text-[#7ed3a5]">
              {post.publishedAt && (
                <p>
                  {format(new Date(post.publishedAt), 'd MMMM, yyyy', { locale: es })}
                </p>
              )}
              {readingTime > 0 && (
                <>
                  <span className="text-gray-400">•</span>
                  <p>{`${readingTime} min de lectura`}</p>
                </>
              )}
            </div>
          </header>

          {/* Imagen Principal */}
          {post.mainImage && (
            <div className="mb-12">
              <Image
                src={urlFor(post.mainImage).url()}
                width={1200}
                height={675}
                alt={`Imagen principal para ${post.title}`}
                className="rounded-xl shadow-lg"
                priority
              />
            </div>
          )}

          {/* Cuerpo del Artículo */}
          <div className="prose prose-xl prose-invert max-w-none 
                        prose-headings:text-[#03d3b0]
                        prose-a:text-[#ecb44b]
                        prose-strong:text-white
                        prose-blockquote:border-[#7ed3a5]">
            <PortableText value={post.body} components={ptComponents} />
          </div>
        </article>
      </main>
    </div>
  );
}