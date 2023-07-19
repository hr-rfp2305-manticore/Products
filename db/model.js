const pool = require('./db.js')

exports.selectAll = async (product) => {
  try{
   const all = await pool.query('SELECT * FROM aggregated_data LIMIT 1000')
   return all.rows
  } catch(error) {
    console.log('Error selecting all from db:', error)
  }
}

exports.selectId = async (product) => {
  try{
   const id = await pool.query(`SELECT * FROM aggregated_data where id = ${product}`)
   return id.rows[0]
  } catch(error) {
    console.log('Error selecting ID from db:', error)
  }
}

exports.selectStyle = async (product) => {
  try{
  const style = await pool.query(`SELECT * FROM aggregate_style where product_id = ${product}`)
  return style.rows[0]
  } catch(error) {
    console.log('Error selecting style from db: ', error)
  }
}

exports.selectRelated = async (product) => {
  try{
  const related = await pool.query(`SELECT * FROM related where product_id = ${product}`)
  return related.rows[0]
  } catch(error) {
    console.log('Error selected related products from db: ', error)
  }
}
