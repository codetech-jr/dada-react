
import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: "0htkddek",
  dataset: "production",
  apiVersion: "2024-07-11",
  useCdn: false,
})
