from random import randint, choice as rc

from faker import Faker
import requests
from app import app
from models import *

fake = Faker()


f = open("ErrorList.txt",'w')
q = open("ReleaseSets.txt",'w')

#When filling out the card DB we have to match set name to DB it. We can manage that with a dictionary for everytime we upload to the DB we add to the dict. 

set_to_id_map = {}


#add some test data to see if the relationships are working in the DB


def create_Monster_Cards():
    #test 
    #We should add first do mosnters and spell traps seperately since they each have different data back from the APi. irrelevant stuff can be nulled i suppose. 

    #We get back a dictionary as (data: [{}])
    #each card is an object in the list we get from the data key. 
    #Each card object has a key card_sets which is a list that contains objects with each set they are printed in. 
    #Since we want each possible card and printing we get a card get all the card_sets it is a part of and then for each one of those fill out a card object and add to db. 

    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Baby%20Dragon|Time%20Wizard|Dark%20Magician'
    
    response = requests.get(url)
    card_info = response.json()
    outlist = []
    errorlist = []
    setid_to_dbid = {}
    i = 0
    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        i+=1
        name_card = card['name']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]
        for setname in card['card_sets']:
            rarity_card = setname['set_rarity']
            set_code_card = setname['set_code']
            a = Card(
                name = name_card,
                attack = attack_card,
                defense = defense_card,
                level = level_card,
                card_type = card_type_card,
                card_race = card_race_card,
                card_attribute = card_attribute_card,
                card_image = card_image_card,
                rarity = rarity_card,
                releasedSet = randint(1,10),
                set_id = set_code_card
            )
        outlist.append(a)
    return outlist


def get_release_sets():
    #issue is that the Adidas collaboration card does not have a tcg release date

    #I should probably save all this data onto a file in my pc as well in case there are changes to the APi in the future for database seeding

    url = 'https://db.ygoprodeck.com/api/v7/cardsets.php'
    response = requests.get(url)
    sets_info = response.json()
    outlist = []
    error_list = []
    i=0
    for card_set in sets_info:        
        print(i)
        i+=1
        try:
            pack = ReleaseSet(
                name = card_set['set_name'],
                releaseDate = card_set['tcg_date'],
                card_count = card_set['num_of_cards'],    
                set_code = card_set['set_code']       
            )
            q.write(str(pack)+'\n') 
        except:
            error_list.append((i,card_set))
            f.write(str(card_set)+'\n')
            continue
        
        outlist.append(pack)

    print(error_list)
        # [(26, 'Adidas collaboration card'), (731, 'The Lost Art Promotion 2023'), (735, 'The Lost Art Promotion 2023 G')]
    return outlist



if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")


        # User.query.delete()
        ReleaseSet.query.delete()
        Card.query.delete()

        print("Seeding activities...")
        # usertest = User(
        #     username = 'bob',
        #     password = 'bob2',
        #     email = 'haha@gmail.com',
        #     profile = 'path2file'
        # )

        # db.session.add(usertest)

        # cards = create_cards()
        # db.session.add_all(cards)
        
        releaseSets = get_release_sets()
        cards = create_Monster_Cards()

        db.session.add_all(releaseSets)
        db.session.add_all(cards)

        db.session.commit()



        print("Done seeding!")

        f.close()
        q.close()





