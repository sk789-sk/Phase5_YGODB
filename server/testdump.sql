
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Users" (
	id INTEGER NOT NULL, 
	username VARCHAR, 
	email VARCHAR, 
	profile VARCHAR, 
	created_at timestamp, 
	_password_hash VARCHAR, 
	PRIMARY KEY (id), 
	CONSTRAINT "uq_Users_username" UNIQUE (username)
);
INSERT INTO "Users" VALUES(1,'DEFAULT',NULL,NULL,NULL,NULL);
INSERT INTO "Users" VALUES(2,'sk789','skm478@gmail.com','https://images.ygoprodeck.com/images/cards/60482781.jpg',NULL,'$2b$12$58k1Vmopesdaw/eFWzyQ9ewBS8YZMlQpkWt64EuBvJwjky/CowUOm');
INSERT INTO "Users" VALUES(3,'sk789v2',NULL,NULL,'2023-09-11 17:35:12',NULL);

COMMIT;