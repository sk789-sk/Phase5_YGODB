Project Plan

Problem: I play a trading card game (TCG) and would like ot have a way to keep track of cards that I have and need. I want to have a database of cards that I own and see what cards I would need. I can get the card information from the yugioh api. https://ygoprodeck.com/api-guide/ 

What I want the page to do:

1. A user can sign in and access the database of cards that they have.
2. Can search for a card in the card pool table and add it to their collection. 
3. Can create a deck of cards and save it
4. Compare the cards that they have in own inventory vs the cards that are needed in their deck
5. See a list of cards that are needed

Extra.
6. Fuzzy Search for Cards
7. Add price information for cards needed. TCGPlayer API not available atm can maybe try scraping or use Cardmarket? 
8. Add Banlist Information
9. Alt name for search with additional table. Can be added as user input, alt names would have to be unique.(would get hard to check with alot of names. Tree could be used) 

"card_images":[{"id":56804361,"image_url":"https://images.ygoprodeck.com/images/cards/56804361.jpg","image_url_small":"https://images.ygoprodeck.com/images/cards_small/56804361.jpg","image_url_cropped":"https://images.ygoprodeck.com/images/cards_cropped/56804361.jpg"}]

62kb x 12000 still under 1GB space 

Need to host image, have path to file on pc stored in db? 
scrape price data? use ygopro data section if no tcgplayer key. 


DB schema: 
name
User needs to be able to access their inventory 
A user can have many cards and cards belong to many users. Many to Many and we can use the inventory as a join table 

User (id[pk], username, password[encrypt?], date_created,...(what else does a user profile need))

Inventory (id[pk], user_id,card_id,quantity)

Card (id[pk], Name, Release_Date, Alt_Name(how to represent dict of alt names?) , Rarity, Set_Released_with_konami_id)

A deck is a collection of cards that a user combined. Does not have to be user owned cards. 

Deck Table(id[pk],name, user_id,card_id) where can we check deck legality. For a specific user_id, the deck name has to be different    

Banlist-Card(id[pk], BanListID, cardID, quant available)

Banlist(id[pk],name,start_date,end_date,)


Ban_List has a relation to cards
Each Ban list has a set of cards that are banned/limited/semi. Ban Lists have names and dates that they are in effect. We can see what cards are available in a banlist by checking all cards that are released before than and then compare it to banlist info?. 

Combine with Generic Card Inventory with Banlist-Card Join table.

C: Create, decks, and inventory
R: Read Card and banlist data in DB
U: Update should be on a non-join table item. Can update user profile setting and etc
D: Delete Deck, inventory, account


