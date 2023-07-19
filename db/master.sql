CREATE TABLE aggregated_data (
  id INTEGER,
  campus VARCHAR,
  name VARCHAR,
  slogan VARCHAR,
  description TEXT,
  category VARCHAR,
  default_price NUMERIC,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  features JSONB
);

CREATE TABLE aggregate_style (
  product_id INTEGER,
  results JSONB
)



