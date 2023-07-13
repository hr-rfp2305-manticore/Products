CREATE TABLE productitem (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR NOT NULL,
  product_slogan TEXT NOT NULL,
  product_desc TEXT NOT NULL,
  product_cat VARCHAR NOT NULL,
  product_feature VARCHAR NOT NULL
);

CREATE TABLE productstyle (
  product_id INT NOT NULL,
  style_id INT NOT NULL,
  style_name VARCHAR NOT NULL,
  style_price INT NOT NULL,
  style_sale INT NOT NULL,
  style_default BOOLEAN,
  style_photo BYTEA,
  style_sku INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES productitem (product_id)
);
