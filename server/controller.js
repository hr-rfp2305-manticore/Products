const product = require('../db/model.js')



exports.getProducts = async (req,res) => {
  try{
    const products = await product.selectAll(req.params)
    console.log('Succesful get request for all products',products)
    res.status(200).send(products)
  } catch(error){
    console.log('Error getting products:', error)
  }
}

exports.getProductId = async (req,res) => {
  try {
    const id = await product.selectId(req.params.product_id)
    console.log('Succesful get request for', req.params.product_id)
    res.status(200).send(id)
  }  catch(error){
    console.log('Error getting product ID:', error)
  }
}

exports.getProductStyle = async (req,res) => {
  try {
    const style = await product.selectStyle(req.params.product_id)
    console.log('Succesful get request for', req.params.product_id)
    res.status(200).send(style)
  }  catch(error){
    console.log('Error getting product style:', error)
  }
}

exports.getRelated = async (req,res) => {
  try {
    const related = await product.selectRelated(req.params.product_id)
    console.log('Succesful get request for', req.params.product_id)
    res.status(200).send(related)
  } catch(error){
    console.log('Error getting related products:', error)
  }
}
