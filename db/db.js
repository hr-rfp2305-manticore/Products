const { Pool, Client } = require('pg');
const fs = require('fs')
const copyFrom = require('pg-copy-streams').from
require('dotenv').config();


const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});


const arrFile = ['productitem', 'productstyle', 'productfeat', 'related', 'productsku','photo']
const csvFile = ['product.csv', 'styles.csv', 'features.csv', 'related.csv', 'skus.csv','photos.csv']

const execute = async (tables) => {
  try {
    const client = await pool.connect();

    await client.query('SET CONSTRAINTS ALL DEFERRED;')

    for(let i = 0; i < tables.length; i++){

      const inputFile = `/Users/andymoc/HR/Manticore/${csvFile[i]}`

      await client.query(`TRUNCATE "${tables[i]}" CASCADE`)
      console.log(`Truncated ${tables[i]}`)

      await client.query('SET CONSTRAINTS ALL IMMEDIATE;')

      const stream = client.query(copyFrom(`COPY ${tables[i]} FROM STDIN DELIMITER ',' CSV HEADER`))

      const fileStream = fs.createReadStream(inputFile)

      fileStream.on('error', (error) => {
        console.log('Error in creating a stream', error)
      })

      stream.on('error', (error) => {
        console.log('Error in creating a read stream', tables[i],error)
      })

      stream.on('end', () => {
        console.log('Completed loading data into ', tables[i])
        client.release()
      })

      fileStream.pipe(stream);

    }
    } catch(error){
    console.log('Error:', error)
  }

};


const connection = async () => {
  const client = await pool.connect();

  try {
    const res = await client.query(`SELECT NOW()`);
    console.log("Pool Connection Granted", res.rows[0]);
    return res.rows
  } catch (error) {
    console.log("Error:", error);
  } finally {
    client.release(); // Release the connection back to the pool
  }
};

//invoke above functions
//uncoment out execute function to copy csv file into database
// execute(arrFile);


//invoke db pool connection
connection()



module.exports = pool
