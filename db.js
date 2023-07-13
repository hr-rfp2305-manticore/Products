//Product List
{
  "product_id": {type: Number, required: true, unique: true},
  "product_name": {type: String, required: true, unique: true},
  "product_cat": {type: String, required: true, unique: true},
}
//Product Item
{
  "product_id": {type: Number, required: true, unique: true},
  "product_name": {type: String, required: true, unique: true},
  "product_slogan": {type: String, required: true, unique: true},
  "product_desc": {type: String, required: true, unique: true},
  "product_feat": {type: String, required: true, unique: true},
  "product_cat": {type: String, required: true, unique: true},
  "product_date": {type: Object, required: true, unique: true},
  "styles": {type: Array, required: true, unique: true}
  "relatedproduct_id": {type: Array, required: false, unique: true},
}

"product_date": {
  "created_at": Date,
  "updated_at": Date,
}

"styles" : [
  {
    "style_id": {type: String, required: true, unique: true},
    "style_name": {type: String, required: true, unique: true},
    "style_price": {type: Number, required: true, unique: true},
    "style_sale": {type: Number, required: false, unique: true},
    "style_default": {type: Boolean, required: true, unique: true},
    "style_photo": {type: Array, required: true, unique: true},
    "style_sku": {type: Object, required: true, unique: true}
  }
]

"relatedproduct_id": [
  {
    "product_id": {type: Number, required: true, unique: true},
    "product_name": {type: String, required: true, unique: true},
    "product_cat": {type: String, required: true, unique: true},
  }
]






//Maybe don't need the bottom collections and nest styles and related products into product item

//Related Product List
{
  "product_id": {type: Number, required: true, unique: true},
  "relatedproduct_id": {type: Array, required: false, unique: true},
  "product_cat": {type: String, required: true, unique: true},
}
//Product Style
{
  "product_id": {type: Number, required: true, unique: true},
  "style_id": {type: String, required: true, unique: true},
  "style_name": {type: String, required: true, unique: true},
  "style_price": {type: Number, required: true, unique: true},
  "style_sale": {type: Number, required: false, unique: true},
  "style_default": {type: Boolean, required: true, unique: true},
  "style_photo": {type: Array, required: true, unique: true},
  "style_sku": {type: Object, required: true, unique: true}
}