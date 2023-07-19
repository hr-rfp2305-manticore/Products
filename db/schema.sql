CREATE TABLE IF NOT EXISTS productitem (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR NOT NULL,
  product_slogan TEXT NOT NULL,
  product_desc TEXT NOT NULL,
  product_cat VARCHAR NOT NULL,
  product_price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS productstyle (
  style_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  style_name VARCHAR NOT NULL,
  style_sale VARCHAR NULL,
  style_price INT NOT NULL,
  style_default VARCHAR NOT NULL,
  FOREIGN KEY (product_id) REFERENCES productitem (product_id)
);

CREATE TABLE IF NOT EXISTS productfeat (
  feat_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  product_feat VARCHAR NOT NULL,
  product_value VARCHAR NOT NULL,
  FOREIGN KEY (product_id) REFERENCES productitem (product_id)
);

CREATE TABLE IF NOT EXISTS related (
  related_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES productitem (product_id)
);

CREATE TABLE IF NOT EXISTS productsku (
  sku_id SERIAL PRIMARY KEY,
  style_id INT NOT NULL,
  product_size VARCHAR(255) NOT NULL,
  product_quantity INT NOT NULL,
  FOREIGN KEY (style_id) REFERENCES productstyle (style_id)
);

CREATE TABLE IF NOT EXISTS photo (
  photo_id SERIAL PRIMARY KEY,
  style_id INT NOT NULL,
  photo_url VARCHAR,
  thumbnail_url VARCHAR,
  FOREIGN KEY(style_id) REFERENCES productstyle(style_id)
)
