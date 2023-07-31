INSERT INTO Users (username) VALUES ('sk789')
INSERT INTO Users (username, password) VALUES ('sk2','t1')

INSERT INTO Users (username,password,email,profile) VALUES ('sk789','test','skm478@gmail.com','path')

INSERT INTO Decks (name,user_id) VALUES ('darkmagician',2);
INSERT INTO Decks (name,user_id) VALUES ('BlueEyes',2);
INSERT INTO Decks (name,user_id) VALUES ('RedEyes',1);

INSERT INTO CardsinDecks (deck_id,card_id) VALUES (1,2);
INSERT INTO CardsinDecks (deck_id,card_id) VALUES (1,4);
INSERT INTO CardsinDecks (deck_id,card_id) VALUES (1,6);
INSERT INTO CardsinDecks (deck_id,card_id) VALUES (1,8);
INSERT INTO CardsinDecks (deck_id,card_id) VALUES (1,10);

INSERT INTO CardsinDecks (deck_id,card_id) VALUES (2,11);
INSERT INTO CardsinDecks (deck_id,card_id) VALUES (2,13);
INSERT INTO CardsinDecks (deck_id,card_id) VALUES (2,15);
INSERT INTO CardsinDecks (deck_id,card_id) VALUES (2,17);
INSERT INTO CardsinDecks (deck_id,card_id) VALUES (2,19);

INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,4);
INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,17);
INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,28);
INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,44);
INSERT INTO Inventories (quantity,isFirstEd,user_id,card_id) VALUES (1,TRUE,2,16);


DELETE FROM Cards;
DELETE FROM Inventories;
DELETe FRom CardsinDecks;
DELETE FROM Decks;

