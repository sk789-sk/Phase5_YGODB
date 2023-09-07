TODO-

Functional

- [x] Implement Pagination for Card Database Page
- [x] Add Rest of Cards to Database
- [x] Move Basic Filtering to the Backend
- [x] Fix seeding of DB so cards match release sets( ordering issue)
- [ ] Fix duplicate rendering due to duplite keys on react 
- [] Create Advanced Filtering Backend
- [x] Create Advanced Filtering UI 
- [] User Profiles are clickable and accessible 
- [x] Adding cards to inventory done by set id w/ verification
- [x] Adding cards to a deck dont by card name w/ verification
- [ ] Build reconciliation table between inventory and decks
- [x] Inventory update and delete need to be updated
- [ ] Sorting and ordering options 
- [ ] inventory pagination
- [ ] Fix Card Count on decks(Currently shows unique cards and does not account for duplicates)
- [ ] 
- [] Do not allow duplicates of card ID in user inventory
- [] sessions for password hashing and authentification/authorization
- [ ] Error Responses should give feedback to user and not just console outputs.
- [ ] Inventory Search Options 
- [ ] Inventory Should Have Pagination 
- [ ] Proper User Auth with encryption and sessions or token
- [ ] Remove trailing whitespace in the inputs
- [ ] Remove case sensitivity on DB search
- [ ] Allow Deck Creation to be private
- [ ] Deck creation must have name
- [ ] Found a seeding issue. Originally it looked like all the end points for different cards did not have any overlap but that is not true. Saw an overlap for Ducker Mobile Cannon, where it shows in both effect monsters and flip effect monsters. Will need to adjust the way seeding works to grab the card and figure out where it belongs as a result. Problem is that we now have extra cards shown, and release sets have duplicates. Can find duplicates by looking at how many cards are supposed to be in a set vs how many cards are printed in a set. Its how we found the issue in the first place. 
 https://db.ygoprodeck.com/api/v7/cardinfo.php?num=5&offset=0 

UI
- [] Move Deck Grids into own component

- [ ] Soft Limit on cards that are added into a deck(can be bypassed since decks arent used for playing actually)
- [ ] Deck Creation Info should be in tabular form on Individual User and Deck Page
- [ ] Home screen should have resources for the game maybe

- [ ] Set information cards Table needs to be match style of other 
- [ ] Add checks on responses from the server to the frontend. Add checks for if the response is ok and only then make changes to state. Some components have them some do not so check through all of them. 


Smaller Fixes
- [] Currently Searching the database before adding a card to inventory needs to search all cards. If we instead have a table with all the release Sets, by id code ex: MRD,DUNE,DABL etc go to that table then see if it has a card code -0001, 0002 etc would be quicker. Instead of 37k rows instead it would be n card sets and m cards in the set. 
