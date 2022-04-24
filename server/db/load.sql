\COPY products FROM 'product.csv' CSV HEADER DELIMITER ',';
\COPY features FROM 'features.csv' CSV HEADER DELIMITER ',';
\COPY styles FROM 'styles.csv' CSV HEADER DELIMITER ',' NULL as 'null';
\COPY photos FROM '_photos.csv' CSV HEADER DELIMITER ',';
\COPY skus FROM 'skus.csv' CSV HEADER DELIMITER ',';
\COPY related FROM 'related.csv' CSV HEADER DELIMITER ',';