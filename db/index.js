const post = require('pg')
import { Pool, Client } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'product',
  password: 'postgres',
  port: 3211,
})

console.log(await pool.query('SELECT NOW()'))

console.log('Initial connection count:', pool.totalCount);

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'product',
  password: 'postgres',
  port: 3211,
})

await client.connect()
try {
  const res = await client.query('SELECT NOW()')
  console.log(res)
} catch(err) {
  console.log("error:", error)
} finally {
  await client.end()
}