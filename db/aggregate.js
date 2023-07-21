const { Pool, Client } = require('pg');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const aggregateProduct = async () => {

  const client = await pool.connect();

  try {
    const res = await client.query(`
    INSERT INTO aggregated_data(id,campus,name,slogan,description,category,default_price,created_at,updated_at,features)
    SELECT
    productitem.product_id AS ID,
    'hr-rfp' AS campus,
    productitem.product_name AS name,
    productitem.product_slogan AS slogan,
    productitem.product_desc AS description,
    productitem.product_cat AS category,
    CASE
      WHEN productstyle.style_sale = 'null' OR productstyle.style_sale IS NULL THEN productstyle.style_price
      ELSE NULLIF(productstyle.style_sale, 'null')::INTEGER
    END AS default_price,
    CURRENT_TIMESTAMP AS created_at,
    CURRENT_TIMESTAMP AS updated_at,
    JSON_AGG(DISTINCT JSONb_BUILD_OBJECT(
      'feature', productfeat.product_value,
      'value', productfeat.product_feat
    )) AS features
  FROM productitem
  JOIN (
    SELECT product_id, product_feat, product_value
    FROM productfeat
    GROUP BY product_id, product_feat, product_value
  ) productfeat ON productitem.product_id = productfeat.product_id
  JOIN productstyle ON productitem.product_id = productstyle.product_id
  GROUP BY productitem.product_id,
        productitem.product_name,
        productitem.product_slogan,
        productitem.product_desc,
        productitem.product_cat,
        productstyle.style_price,
        productstyle.style_sale,
        productitem.created_at,
        productitem.updated_at;
    `);
    console.log("Aggregation complete", res.rows);
  } catch (error) {
    console.log("Error aggregating:", error);
  } finally {
    client.release(); // Release the connection back to the pool
  }
};

const aggregateStyle = async () => {
  const client = await pool.connect();

  try {
    const res = await client.query(`
    WITH aggregated_data AS (
      SELECT
        productstyle.product_id AS product_id,
        jsonb_agg(jsonb_build_object(
          'style_id', productstyle.style_id,
          'name', productstyle.style_name,
          'original_price', productstyle.style_price,
          'sale_price', productstyle.style_sale,
          'default?', CASE
            WHEN style_default = '1' THEN true
            ELSE false
          END,
          'photos', (
            SELECT jsonb_agg(jsonb_build_object(
              'thumbnail_url', photo.thumbnail_url,
              'url', photo.photo_url
            ))
            FROM photo
            WHERE productstyle.style_id = photo.style_id
          ),
          'skus', (
            SELECT jsonb_object_agg(productsku.sku_id::text, jsonb_build_object(
              'quantity', productsku.product_quantity,
              'size', productsku.product_size
            ))
            FROM productsku
            WHERE productstyle.style_id = productsku.style_id
          )
        )) AS results
      FROM productstyle
      GROUP BY productstyle.product_id
    )
    INSERT INTO aggregate_style(product_id, results)
    SELECT productitem.product_id, aggregated_data.results
    FROM productitem
    LEFT JOIN aggregated_data ON productitem.product_id = aggregated_data.product_id
    WHERE NOT EXISTS (
      SELECT 1
      FROM aggregate_style
      WHERE aggregate_style.product_id = productitem.product_id
    );
    `);
    console.log("Aggregation complete", res.rows);
  } catch (error) {
    console.log("Error aggregating:", error);
  } finally {
    client.release(); // Release the connection back to the pool
  }
};

// aggregateProduct();
// aggregateStyle();
