CREATE TABLE productlist (
  proudct_id: INT UNSIGNED NOT NULL,
  campus: VARCHAR NOT NULL,
  product_name: VARCHAR NOT NULL,
  product_slogan: TEXT NOT NULL,
  product_desc: TEXT NOT NULL,
  product_cat: VARCHAR NOT NULL,
  product_price: DECIMAL NOT NULL,
  product_created: DEFAULT CURRENT_TIMESTAMP,
  product_updated: DEFAULT CURRENT_TIMESTAMP,
)
CREATE TABLE productinfo (
  proudct_id: INT UNSIGNED NOT NULL,
  product_name: VARCHAR NOT NULL,
  product_slogan: TEXT NOT NULL,
  product_desc: TEXT NOT NULL,
  product_cat: VARCHAR NOT NULL,
  product_price: DECIMAL NOT NULL,
  product_feature: VARCHAR NOT NULL,
)
CREATE TABLE productstyle (
  proudct_id: INT UNSIGNED NOT NULL,
  style_id: INT UNSIGNED NOT NULL,
  style_name: VARCHAR NOT NULL,
  style_price: INT UNSIGNED NOT NULL,
  style_sale: INT UNSIGNED NOT NULL,
  style_default: BOOLEAN,
  style_photo: VARBINARY(MAX),

)
CREATE TABLE cart (
  proudct_id: INT UNSIGNED NOT NULL,
  product_sku: INT UNSIGNED NOT NULL,
  product_count: INT UNSIGNED NOT NULL,
)