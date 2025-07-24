import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    
    // 👇👇👇 AQUÍ ES UN EXCELENTE LUGAR PARA PONERLO 👇👇👇
    defineField({
      name: 'metaDescription',
      title: 'Meta Descripción (para SEO)',
      description: 'Esta es la descripción que aparecerá en los resultados de búsqueda de Google. Idealmente entre 150-160 caracteres.',
      type: 'text',
      // 'rows: 3' le da un área de texto un poco más grande para escribir cómodamente.
      options: { 
        rows: 3 
      }, 
      validation: (Rule) => Rule.max(160).warning('Una descripción más larga podría ser cortada por Google.')
    }),
    // ----------------------------------------------------

    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      // Ojo aquí: si tu tipo de portable text se llama 'blockContent', mantenlo así.
      // Si se llama 'array', asegúrate que la configuración sea la correcta.
      type: 'blockContent', 
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})