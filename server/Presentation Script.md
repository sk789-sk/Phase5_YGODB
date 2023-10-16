Presentation Script

Hello. My name is Shams and I am a graduate of the may 1st SE cohort and want to present my final project. 


Problem Statement:

Growing Up I one game that I always played was the Yugioh - Trading Card Game or TCG for short, and it is a game that I play to this day. If you're not familiar with trading card games, you collect cards and then use these cards to create a deck that you then use to play a game against other people. All TCG that I know of work in this manner. One of the biggest issues alot of us run into is managing out inventory. Your inventory of cards quickly becomes very large and it becomes hard to manage. Theres nothing official for this and theres a couple things that kind of work like this but are missing some things that I think are pretty important. 



Additionally as you create different decks you need to keep track of what cards belong to what decks, what cards you do not need, what cards you need duplicates off and so on. When you trade your cards you have to wonder, is this a card that I think i will need soon and I shouldnt trade it or can i actually trade it. The other day i traded away a second copy of a card, that i did not think i needed but now I need again. 

With my final project I wanted to create an app that can solve this issue for me. It essentially is an inventory management system for ones card collection, and has the ability to reconcile their inventory against decks. 


App DEMO

First I'll show the way that the user can manage their inventory. 

 

A user can add a card to their inventory by inputting the set-code and quantity of the card. Their is a field for Card-name which would allow a user to search for a card by name and then see all the printings in a dropdown. 

When the user attempts to add the card to the collection, the database will verify that this card exists and will add it to the users collection. Since the users collection can grow very quickly the outputted table will only show 20 entries at a time and the user can go through them. Additionally the user can filter their inventory by any combination of the 4 criteria shown on the top. 

We can search by card names, to see if we own any copies of a card, card rarity to see and etc. This allows the user to have better ability to quickly get the information that they need. Users can edit the quantities of cards they own and delete them as well using the edit and delete buttons. 


The Next major thing a user can do is that they can create their own decks. We said that the goal of the app was a way to manage both of these so this is necessary. Here a user can create a deck and search through the decks that they have. 

For Demo lets create a deck ill call this Tengu - Agents. We start with a blank template and we will add cards to the main deck, side deck and extra deck. There are restriction that we cannot have more than 3 copies of a card in a deck. When we try to enter a value to the deck the database verifies that this card addition does not violate this rule before adding it. If it does violate it the card is not added to the database and there is a response sent to the front end, but currently I have it suppressed to just show in the console. 

Lets look at a completeish deck and this is how it looks when filled out. This process 

The next biggest thing that this app can do though it reconcile a users inventory vs the decks that they have. 

When I reconcile a deck what happens is that the users inventory is compared against the users deck. We then get a breakdown of each card in the deck and how many we have, need and where they are used. We can search this reconciliation table for specific cards and it color coded to make it easier to see what is imporant. The Usage breakdown is not important when we are just looking at 1 deck but shows its value when looking at multiple. 

Now we selected every deck and we know this is working the number of cards has increased. 
In the Usage Breakdown we see for each card where and how many of each copy are used. 
The color coding works as follows. Red means you do not have enough copies of this card to complete a single instance of any selected deck.
Yellow means that you have enough to complete at least 1 instance of a selected deck, but not enough for all.
Green means you have enough for all you decks and any extras can be traded or sold/etc. 

If you try to access a deck that does not exist. Then you get this little error page, if you try to access a deck that someone else owns you get an unauthorized error. 

Some of things taht are just usefull here are that you can see all the cards and search foir cards. You can see all the released Sets and ETC.


Tech Stack

The stack we used was react for the front end, we used libraries like react router to manage navigation, Material UI for some generic componenets.
For the Back end we used python for the logic and flask as the web framework. and SQL- alchemy to manage our Database
We used SQlite for the initial database, and currently the one seen is one it. 
We have converted this to a postgres DB that is hosted on render. 


Challenge

The biggest challenges during the project was managing the DB and the amount of information. Theres ~12k cards and 35k printings and we needed to store this in a way to make it so we didnt have redundancies. Additionally instead of working with the whole dataset at once we have to break it down into chunks and then put these chunks together. This was challenging since we didnt have to operate this way during the class labs, but the instructors and online resources were very useful for that. This was a very iterative process and alot of revisions were being made. Even though i had a roadmap built from the start the final bit looks mothing like what it started. 



Reach Out

If you want to reach out to me, you can find me on linkedin, github. I can post a link to these if needed. 




Challenges:

When we added a card to a deck we added it by name, since every card with the same name even if they are printed in different sets has the same effect. 






How the add deck works and why a card in deck is different then a card in set

Finally reconcilliation. 





