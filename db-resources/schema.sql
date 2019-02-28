



-- -- Table: public."Product"

-- -- DROP TABLE public."Product";

-- CREATE TABLE "product"
-- (
--     "id" SERIAL PRIMARY KEY,
--     "productID" integer NOT NULL,
--     "priceProduct" integer,
--     "onList" integer,
--     "country" text,
--     "originalPrice" integer,
--     "savedCash" integer,
--     "savedPcnt" text
-- )
-- WITH (
--     OIDS = FALSE
-- )
-- TABLESPACE pg_default;

-- ALTER TABLE "Product"
--     OWNER to postgres;

-- CREATE TABLE "competitors"(
--     "id" SERIAL PRIMARY KEY,
--     "numReviews" integer,
--     "deliveryPcnt" integer,
--     "productPcnt" integer,
--     "servicePcnt" integer,
--     "reviewScore" integer,
--     "country" text,
--     "companyName" text,
--     "price" integer,
--     "productID" integer,
--     CONSTRAINT fk_product 
--     FOREIGN KEY (productID) 
--     REFERENCES product(productID)
-- );