import { Client } from 'faunadb'

export const Fauna = new Client({
  secret: process.env.FAUNADB_KEY
})