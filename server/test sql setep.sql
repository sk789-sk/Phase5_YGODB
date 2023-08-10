INSERT INTO Users (username) VALUES ('sk789')
INSERT INTO Users (username, password) VALUES ('sk2','t1')

INSert INTO Users (username,password,email,profile) VALUES ('DEFAULT','NONE', NULL, NULL)
INSERT INTO Users (username,password,email,profile) VALUES ('sk789','test','skm478@gmail.com','https://images.ygoprodeck.com/images/cards/60482781.jpg')


INSERT INTO Decks (name,user_id) VALUES ('darkmagician',2);
INSERT INTO Decks (name,user_id) VALUES ('BlueEyes',2);
INSERT INTO Decks (name,user_id) VALUES ('RedEyes',1);

INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (3,2,1);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (3,4,2);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (3,6,3);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (3,8,1);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (3,10,2);

INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (4,11,1);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (4,13,3);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (4,15,3);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (4,17,2);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (4,19,1);

INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (5,1352,1);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (5,235,3);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (5,64,3);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (5,34,2);
INSERT INTO CardsinDecks (deck_id,card_id,quantity) VALUES (5,31,1);

INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,4);
INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,17);
INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,28);
INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,44);
INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,16);

INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES(1,TrUE,1,1);

DELETE FROM Cards;
DELETE FROM Users;
DELETE FROM Inventories;
DELETe FRom CardsinDecks;
DELETE FROM Decks;

DELETE FROM Users WHERE id>1;

