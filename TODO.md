TODO-

- [x] Implement Pagination for Card Database Page
- [x] Add Rest of Cards to Database
- [x] Move Basic Filtering to the Backend
- [x] Fix seeding of DB so cards match release sets( ordering issue)
- [ ] Fix duplicate rendering due to duplite keys on react 
- [] Create Advanced Filtering Backend
- [x] Create Advanced Filtering UI 
- [] Do not allow duplicates of card ID in user inventory
- [] sessions for password hashing and authentification/authorization
- [] Currently Searching the database before adding a card to inventory needs to search all cards. If we instead have a table with all the release Sets, by id code ex: MRD,DUNE,DABL etc go to that table then see if it has a card code -0001, 0002 etc would be quicker. Instead of 37k rows instead it would be n card sets and m cards in the set. 
- [] Move Deck Grids into own component
- [] User Profiles are clickable and accessible 
- [x] Adding cards to inventory done by set id w/ verification
- [x] Adding cards to a deck dont by card name w/ verification
- [ ] Soft Limit on cards that are added into a deck(can be bypassed since decks arent used for playing actually)
- [ ] Deck Creation Info should be in tabular form on Individual User and Deck Page
- [ ] Home screen should have resources for the game maybe
- [ ] Inventory Search Options 
- [ ] Set information cards Table needs to be match style of other 
- [ ] Inventory update and delete need to be updated
- [ ] Sorting and ordering options 
- [ ] inventory pagination
- [ ] Inventory search for a card and get the set information to display 
- [ ] Fix Card Count on decks(Currently shows unique cards and does not account for duplicates)
- [ ] Add checks on responses from the server to the frontend. Add checks for if the response is ok and only then make changes to state. Some components have them some do not so check through all of them. 



