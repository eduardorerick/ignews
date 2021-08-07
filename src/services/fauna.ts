import { Client } from 'faunadb'

export const fauna = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: "db.us.fauna.com",
})