const { Pool, Client } = require('pg');
const fs = require('fs')
const copyFrom = require('pg-copy-streams').from


const pool = new Pool({
  user: 'andymoc',
  host: 'localhost',
  database: 'product',
  password: 'postgres',
  port: 5432,
});

const productitem = 'productitem'
const productstyle = 'productstyle'

const inputFile = '/Users/andymoc/HR/Manticore/product.csv'

const execute = async (table, table1) => {
  try {
    const client = await pool.connect();

    await client.query('SET CONSTRAINTS ALL DEFERRED;')

    await client.query(`TRUNCATE "${table}", "${table1}" CASCADE`)
    console.log(`Truncated ${table} and ${table1}`)

    await client.query('SET CONSTRAINTS ALL IMMEDIATE;')

    const stream = client.query(copyFrom(`COPY "${table}" FROM STDIN`))
    const fileStream = fs.createReadStream(inputFile)

    fileStream.on('error', (error) => {
      console.log('Error in creating a stream', error)
    })

    stream.on('error', (error) => {
      console.log('Error in creating a read stream', error)
    })

    stream.on('error', () => {
      console.log('Completed loading data into ', table)
      client.release()
    })
    fileStream.pipe(stream);
  }catch(error){
    console.log('Error:', error)
  }
};


const db = async () => {
  const client = await pool.connect();

  try {
    const res = await client.query(`SELECT NOW()`);
    console.log("Pool Connection Granted", res);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    client.release(); // Release the connection back to the pool
  }
};

//invoke above functions
execute(productitem,productstyle);
db()

module.exports = db
