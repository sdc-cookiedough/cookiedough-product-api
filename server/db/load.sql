\COPY products FROM 'product.csv' CSV HEADER DELIMITER ',';
\COPY features FROM 'features.csv' CSV HEADER DELIMITER ',';
\COPY styles FROM 'styles.csv' CSV HEADER DELIMITER ',' NULL as 'null';
\COPY photos FROM '_photos.csv' CSV HEADER DELIMITER ',';
\COPY skus FROM 'skus.csv' CSV HEADER DELIMITER ',';
\COPY related FROM 'related.csv' CSV HEADER DELIMITER ',';


-- CREATE INDEX styles_productId_index ON styles (productId);
-- CREATE INDEX features_product_id_index ON features (product_id);
-- CREATE INDEX photos_styleId_index on photos (styleId);
-- CREATE INDEX related_current_product_id_index on related (current_product_id);

-- CREATE INDEX related_related_product_id_index on related (related_product_id);

-- CREATE INDEX skus_styleId_index on skus (styleId);