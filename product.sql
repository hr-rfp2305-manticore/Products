CREATE TABLE productlist (
  product_id: INT UNSIGNED NOT NULL,
  product_name: VARCHAR NOT NULL,
  product_cat: VARCHAR NOT NULL
)
CREATE TABLE productitem (
  product_id: INT UNSIGNED NOT NULL,
  product_name: VARCHAR NOT NULL,
  product_slogan: TEXT NOT NULL,
  product_desc: TEXT NOT NULL,
  product_cat: VARCHAR NOT NULL,
  product_feature: VARCHAR NOT NULL,
)
CREATE TABLE productstyle (
  product_id: INT UNSIGNED NOT NULL,
  style_id: INT UNSIGNED NOT NULL,
  style_name: VARCHAR NOT NULL,
  style_price: INT UNSIGNED NOT NULL,
  style_sale: INT UNSIGNED NOT NULL,
  style_default: BOOLEAN,
  style_photo: VARBINARY(MAX),
  style_sku: INT UNSIGNED NOT NULL

)
CREATE TABLE relatedProductList (
  product_id: INT UNSIGNED NOT NULL,
  relatedProduct_id: INT UNSIGNED NOT NULL,
  product_cat: VARCHAR NOT NULL
)